// Stripe webhook -> Tapstitch dropship fulfillment.
//
// On `checkout.session.completed`, this verifies the Stripe signature, reads the
// structured cart from session metadata (set in /api/checkout), and creates a
// Tapstitch order with the customer's shipping address.
//
// Setup:
//   1. Add a Stripe webhook endpoint -> {SITE_URL}/api/stripe-webhook
//      subscribed to `checkout.session.completed`.
//   2. Set STRIPE_WEBHOOK_SECRET (whsec_...) and the TAPSTITCH_* env vars.
//   3. Product -> Tapstitch variant mapping lives in data/tapstitch.ts.

import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { createTapstitchOrder, type FulfillmentLine, type FulfillmentAddress } from "@/lib/tapstitch";
import { createWixOrder } from "@/lib/wix";
import { getReceipt, sendOrderReceipt } from "@/lib/order-receipt";

// Stripe signature verification needs the raw body + Node crypto.
export const runtime = "nodejs";

type MetaItem = { id: string; size?: string; color?: string; qty: number };

function parseItems(raw?: string | null): FulfillmentLine[] {
  if (!raw) return [];
  try {
    const arr = JSON.parse(raw) as MetaItem[];
    if (!Array.isArray(arr)) return [];
    return arr
      .filter((i) => i && typeof i.id === "string")
      .map((i) => ({ productId: i.id, size: i.size, color: i.color, quantity: Math.max(1, Math.floor(i.qty || 1)) }));
  } catch {
    return [];
  }
}

function addressFromSession(session: Stripe.Checkout.Session): FulfillmentAddress {
  // `shipping_details` is populated when shipping_address_collection is on.
  const shipping = (session as unknown as { shipping_details?: { name?: string; address?: Stripe.Address } }).shipping_details;
  const addr = shipping?.address ?? session.customer_details?.address ?? undefined;
  return {
    name: shipping?.name ?? session.customer_details?.name ?? undefined,
    email: session.customer_details?.email ?? undefined,
    phone: session.customer_details?.phone ?? undefined,
    line1: addr?.line1 ?? undefined,
    line2: addr?.line2 ?? undefined,
    city: addr?.city ?? undefined,
    state: addr?.state ?? undefined,
    postalCode: addr?.postal_code ?? undefined,
    country: addr?.country ?? undefined,
  };
}

export async function POST(req: Request) {
  const secret = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !webhookSecret) {
    console.warn("[stripe-webhook] STRIPE_SECRET_KEY/STRIPE_WEBHOOK_SECRET not set.");
    return NextResponse.json({ ok: false, message: "Webhook not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return new Response("Missing stripe-signature", { status: 400 });
  }

  const raw = await req.text();

  const StripeLib = (await import("stripe")).default;
  const stripe = new StripeLib(secret);

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, signature, webhookSecret);
  } catch (err) {
    console.error("[stripe-webhook] Signature verification failed", err);
    return new Response("Invalid signature", { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const lines = parseItems(session.metadata?.items);

    if (lines.length === 0) {
      console.warn("[stripe-webhook] No structured items on session; nothing to fulfill.", session.id);
    } else {
      const shipping = addressFromSession(session);

      // Fulfillment routing: prefer the Wix bridge when it's configured
      // (Wix -> Tapstitch connector), otherwise fall back to Tapstitch's
      // direct Enterprise API. Either path no-ops cleanly when unconfigured.
      if (process.env.WIX_API_KEY && process.env.WIX_SITE_ID) {
        const result = await createWixOrder({
          externalId: session.id,
          lines,
          shipping,
          money: {
            currency: (session.currency ?? "usd").toUpperCase(),
            subtotal: (session.amount_subtotal ?? 0) / 100,
            shipping: (session.total_details?.amount_shipping ?? 0) / 100,
            total: (session.amount_total ?? 0) / 100,
          },
        });
        if (!result.ok && !result.skipped) {
          // Log for retry/manual handling. Still 200 so Stripe doesn't hammer
          // retries on a downstream issue we'll resolve out of band.
          console.error("[stripe-webhook] Wix fulfillment failed", { session: session.id, result });
        }
      } else {
        const result = await createTapstitchOrder({ externalId: session.id, lines, shipping });
        if (!result.ok && !result.skipped) {
          console.error("[stripe-webhook] Tapstitch fulfillment failed", { session: session.id, result });
        }
      }
    }

    // Email the customer a branded receipt. Best-effort: a delivery failure must
    // never fail the webhook (Stripe would retry and we'd risk double sends).
    try {
      const receipt = await getReceipt(session.id);
      if (receipt) await sendOrderReceipt(receipt);
    } catch (err) {
      console.error("[stripe-webhook] receipt email failed", session.id, err);
    }
  }

  return NextResponse.json({ received: true });
}
