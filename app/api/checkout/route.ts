import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getProduct, type ProductConfig } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

type IncomingItem = { id: string; size?: string; color?: string; qty: number };

// Absolute base URL for Stripe redirect/image URLs. Prefer the origin the
// request actually came from so checkout returns to the same domain the
// customer is on (custom domain, *.vercel.app preview, or local dev). Fall
// back to the configured SITE_URL (which defaults to the production domain),
// never a hard-coded localhost — that previously sent live buyers to
// http://localhost:3000 after paying when NEXT_PUBLIC_SITE_URL was unset.
function resolveBaseUrl(req: Request): string {
  const origin = req.headers.get("origin");
  if (origin) return origin;
  const host = req.headers.get("host");
  if (host) {
    const proto = /^(localhost|127\.|0\.0\.0\.0|\[::1\])/.test(host) ? "http" : "https";
    return `${proto}://${host}`;
  }
  return SITE_URL;
}

export async function POST(req: Request) {
  const baseUrl = resolveBaseUrl(req);
  let body: { items?: IncomingItem[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  const items = Array.isArray(body.items) ? body.items : [];
  if (items.length === 0) {
    return NextResponse.json({ ok: false, message: "Cart is empty" }, { status: 400 });
  }

  // Resolve prices server side from the catalog. Never trust client prices.
  const resolved: { id: string; product: ProductConfig; qty: number; size?: string; color?: string }[] = [];
  for (const i of items) {
    const product = getProduct(i.id);
    if (!product) continue;
    const qty = Math.max(1, Math.min(20, Math.floor(i.qty || 1)));
    resolved.push({ id: i.id, product, qty, size: i.size, color: i.color });
  }

  if (resolved.length === 0) {
    return NextResponse.json({ ok: false, message: "No valid items in cart" }, { status: 400 });
  }

  const secret = process.env.STRIPE_SECRET_KEY;

  // Primary path: a real Stripe Checkout Session.
  if (secret) {
    try {
      const StripeLib = (await import("stripe")).default;
      const stripe = new StripeLib(secret);

      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = resolved.map(
        ({ product, qty, size, color }) => {
          // Prefer a real Stripe Price when the product is linked to one, so the
          // sale attributes to that Stripe product. A linked price is fixed, so
          // size/color can't ride along in the line name — captured in metadata.
          const linkedPrice = product.stripePriceEnv ? process.env[product.stripePriceEnv] : undefined;
          if (linkedPrice) {
            return { price: linkedPrice, quantity: qty };
          }
          // Otherwise build an ad-hoc price from the catalog.
          const variant = [color, size && `Size ${size}`].filter(Boolean).join(", ");
          return {
            quantity: qty,
            price_data: {
              currency: "usd",
              unit_amount: Math.round(product.price * 100),
              product_data: {
                name: variant ? `${product.name} (${variant})` : product.name,
                images: product.image ? [`${baseUrl}${product.image}`] : undefined,
              },
            },
          };
        }
      );

      // Preserve variant selections for fulfillment (linked prices drop them
      // from the line name).
      const variantSummary = resolved
        .filter((r) => r.size || r.color)
        .map((r) => `${r.product.name} (${[r.color, r.size].filter(Boolean).join(" ")}) x${r.qty}`)
        .join("; ");

      // Structured cart for the fulfillment webhook (Stripe -> Tapstitch).
      // Stripe metadata values cap at 500 chars; only attach if it fits.
      const itemsJson = JSON.stringify(
        resolved.map((r) => ({ id: r.id, size: r.size, color: r.color, qty: r.qty }))
      );
      const metadata: Record<string, string> = {};
      if (variantSummary) metadata.variants = variantSummary;
      if (itemsJson.length <= 500) metadata.items = itemsJson;

      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: lineItems,
        allow_promotion_codes: true,
        // Attach a Stripe Customer (keyed to the email collected at checkout) so
        // the order shows up in the buyer's account history (see lib/stripe-orders).
        customer_creation: "always",
        shipping_address_collection: { allowed_countries: ["US", "CA", "GB"] },
        metadata: Object.keys(metadata).length ? metadata : undefined,
        success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/luxury`,
      });
      if (session.url) return NextResponse.json({ ok: true, url: session.url });
      return NextResponse.json({ ok: false, message: "Could not start checkout" }, { status: 502 });
    } catch (err) {
      console.error("[checkout] Stripe error", err);
      return NextResponse.json({ ok: false, message: "Checkout error. Please try again." }, { status: 502 });
    }
  }

  // Fallback: a per product Stripe Payment Link, used until live keys land.
  // Only works cleanly for a single line item.
  if (resolved.length === 1) {
    const link = resolved[0].product.paymentLinkEnv ? process.env[resolved[0].product.paymentLinkEnv] : undefined;
    if (link) return NextResponse.json({ ok: true, url: link });
  }

  return NextResponse.json(
    {
      ok: false,
      message: "Checkout is being connected. Add items and we will email you, or use code CULTURE15 on the Essentials store.",
    },
    { status: 503 }
  );
}
