// Tapstitch (print-on-demand) fulfillment client.
//
// Creates a dropship order on Tapstitch after a Stripe payment succeeds.
// Tapstitch's direct order API is an Enterprise feature, so the exact base URL,
// auth scheme, and payload shape MUST be confirmed against your Tapstitch
// Enterprise API docs. The contract below is a reasonable REST assumption and
// is isolated here so only this file changes once the real spec is known.
//
// Required env (see .env.example):
//   TAPSTITCH_API_URL  e.g. https://api.tapstitch.com/v1
//   TAPSTITCH_API_KEY  Enterprise API key (Bearer token)
//
// When either env var is missing, createTapstitchOrder() no-ops (returns
// { ok: false, skipped: true }) so the rest of checkout keeps working.

import { resolveTapstitchVariant } from "@/data/tapstitch";

export type FulfillmentLine = { productId: string; size?: string; color?: string; quantity: number };

export type FulfillmentAddress = {
  name?: string;
  email?: string;
  phone?: string;
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export type TapstitchResult =
  | { ok: true; orderId?: string }
  | { ok: false; skipped?: true; error?: string; unmapped?: string[] };

type TapstitchOrderItem = { variant_id: string; sku: string; quantity: number };

export async function createTapstitchOrder(params: {
  externalId: string; // our reference, e.g. the Stripe session id
  lines: FulfillmentLine[];
  shipping: FulfillmentAddress;
}): Promise<TapstitchResult> {
  const apiUrl = process.env.TAPSTITCH_API_URL;
  const apiKey = process.env.TAPSTITCH_API_KEY;
  if (!apiUrl || !apiKey) {
    console.warn("[tapstitch] TAPSTITCH_API_URL/TAPSTITCH_API_KEY not set; skipping fulfillment.");
    return { ok: false, skipped: true };
  }

  // Map our cart lines to Tapstitch variants (see data/tapstitch.ts).
  const items: TapstitchOrderItem[] = [];
  const unmapped: string[] = [];
  for (const line of params.lines) {
    const variant = resolveTapstitchVariant(line.productId, { size: line.size, color: line.color });
    if (!variant) {
      unmapped.push(line.size ? `${line.productId} (${line.size})` : line.productId);
      continue;
    }
    items.push({ variant_id: variant.variantId, sku: variant.sku, quantity: line.quantity });
  }

  if (items.length === 0) {
    console.error("[tapstitch] No mappable items; order not created.", { unmapped });
    return { ok: false, error: "no_mappable_items", unmapped };
  }
  if (unmapped.length > 0) {
    console.warn("[tapstitch] Some items have no Tapstitch variant mapping and were skipped.", { unmapped });
  }

  // NOTE: confirm endpoint + body against the Tapstitch Enterprise API docs.
  const body = {
    external_id: params.externalId,
    items,
    shipping_address: {
      name: params.shipping.name,
      email: params.shipping.email,
      phone: params.shipping.phone,
      address1: params.shipping.line1,
      address2: params.shipping.line2,
      city: params.shipping.city,
      state: params.shipping.state,
      zip: params.shipping.postalCode,
      country: params.shipping.country,
    },
  };

  try {
    const res = await fetch(`${apiUrl.replace(/\/$/, "")}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[tapstitch] Order create failed", res.status, detail);
      return { ok: false, error: `tapstitch_${res.status}` };
    }
    const data = (await res.json().catch(() => ({}))) as { id?: string; order_id?: string };
    return { ok: true, orderId: data.id ?? data.order_id };
  } catch (err) {
    console.error("[tapstitch] Order create threw", err);
    return { ok: false, error: "request_failed" };
  }
}
