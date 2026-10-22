// Wix fulfillment bridge.
//
// Creates a PAID order in a Wix Stores site after a Stripe payment succeeds, so
// that Wix's (free) Tapstitch connector fulfills it. This is the workaround for
// Tapstitch's direct order API being Enterprise-gated: Wix's order API key is
// self-serve, and Wix forwards the order to Tapstitch for us.
//
// Flow:  customer pays on our site (Stripe) -> /api/stripe-webhook -> createWixOrder()
//        -> Wix Stores order (PAID) -> Wix's Tapstitch app -> production/shipping.
//
// Required env (see .env.example):
//   WIX_API_KEY   Wix API key (https://manage.wix.com -> Settings -> API Keys)
//   WIX_SITE_ID   the target Wix site id (the store with the Tapstitch app)
// Optional:
//   WIX_ACCOUNT_ID    sent as wix-account-id when present (some keys require it)
//   WIX_STORES_APP_ID overrides the default Wix Stores app id
//
// When WIX_API_KEY or WIX_SITE_ID is missing, createWixOrder() no-ops (returns
// { ok: false, skipped: true }) so the rest of checkout keeps working.
//
// NOTE: the exact Create Order endpoint/body is documented at
// https://dev.wix.com/docs/rest/business-solutions/e-commerce/orders/create-order
// The contract below is grounded in those docs but is isolated here so that, if
// Wix tweaks a field name, only this file changes. Mirrors lib/tapstitch.ts.

import { getProduct } from "@/lib/products";
import { resolveWixCatalogRef } from "@/data/wix";
import type { FulfillmentLine, FulfillmentAddress } from "@/lib/tapstitch";

// Default Wix Stores app id — required value of catalogReference.appId when the
// line item is a Wix Stores catalog product.
const DEFAULT_WIX_STORES_APP_ID = "215238eb-22a5-4c36-9e7b-e7c08025e04e";
const WIX_ORDERS_URL = "https://www.wixapis.com/ecom/v1/orders";
const WIX_GET_PRODUCT_URL = "https://www.wixapis.com/stores-reader/v1/products";

const norm = (s?: string) => (s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

/**
 * Look up a Wix Stores managed-variant's `variantId` from the live catalog.
 *
 * Wix requires `catalogReference.options.variantId` (not option choices) for
 * products with managed variants — sending choices yields a 404 "variant not
 * found". The Wix CSV export doesn't include variant ids, so we resolve them at
 * order time against the live store (the server can reach Wix; our build env
 * cannot). Match by SKU first (exact), then by Size/Color choices.
 */
async function fetchWixVariantId(
  productId: string,
  want: { size?: string; color?: string; sku?: string },
  headers: Record<string, string>,
): Promise<string | undefined> {
  try {
    const res = await fetch(`${WIX_GET_PRODUCT_URL}/${productId}`, { headers });
    if (!res.ok) {
      console.error("[wix] get product failed", productId, res.status, (await res.text().catch(() => "")).slice(0, 300));
      return undefined;
    }
    const data = (await res.json().catch(() => ({}))) as {
      product?: { manageVariants?: boolean; variants?: Array<Record<string, unknown>> };
    };
    const variants = data.product?.variants ?? [];
    console.log(`[wix] product ${productId}: manageVariants=${data.product?.manageVariants} variants=${variants.length}`);
    if (variants.length === 0) return undefined;

    const skuOf = (v: Record<string, unknown>): string | undefined => {
      const det = v.variant as { sku?: string } | undefined;
      return det?.sku ?? (v.sku as string | undefined);
    };
    const idOf = (v: Record<string, unknown>): string | undefined =>
      (v.id as string | undefined) ?? (v.variantId as string | undefined);
    const choicesOf = (v: Record<string, unknown>): string[] =>
      Object.values((v.choices as Record<string, unknown>) ?? {}).map((x) => norm(String(x)));

    // 1) exact SKU match
    let match = want.sku ? variants.find((v) => skuOf(v) === want.sku) : undefined;
    // 2) fall back to Size/Color choice match
    if (!match) {
      const ws = norm(want.size);
      const wc = norm(want.color);
      match = variants.find((v) => {
        const vals = choicesOf(v);
        const sizeOk = !ws || vals.includes(ws);
        const colorOk = !wc || vals.some((x) => x.includes(wc) || wc.includes(x));
        return sizeOk && colorOk;
      });
    }
    if (!match) {
      console.error(`[wix] no variant match for ${productId} size=${want.size} color=${want.color} sku=${want.sku}`);
      return undefined;
    }
    return idOf(match);
  } catch (err) {
    console.error("[wix] fetchWixVariantId threw", productId, err);
    return undefined;
  }
}

export type WixOrderMoney = {
  currency: string; // ISO 4217, e.g. "USD"
  subtotal: number; // major units
  shipping: number; // major units
  total: number; // major units
};

export type WixResult =
  | { ok: true; orderId?: string }
  | { ok: false; skipped?: true; error?: string; unmapped?: string[] };

/** Wix money values are strings in major units: 29.9 -> "29.90". */
function money(amount: number, currency: string) {
  return { amount: (amount || 0).toFixed(2), currency };
}

// Wix expects `subdivision` in ISO 3166-2 form (e.g. "US-MD"), but Stripe gives
// a bare state/province code ("MD"). Combine them when both are present.
function isoSubdivision(country?: string, state?: string): string | undefined {
  if (!state) return undefined;
  if (!country || state.includes("-")) return state; // already qualified
  return `${country.toUpperCase()}-${state.toUpperCase()}`;
}

function recipientAddress(shipping: FulfillmentAddress) {
  return {
    addressLine1: shipping.line1,
    addressLine2: shipping.line2,
    city: shipping.city,
    subdivision: isoSubdivision(shipping.country, shipping.state),
    postalCode: shipping.postalCode,
    country: shipping.country,
  };
}

function contactDetails(shipping: FulfillmentAddress) {
  const [firstName, ...rest] = (shipping.name ?? "").trim().split(/\s+/);
  return {
    firstName: firstName || undefined,
    lastName: rest.length ? rest.join(" ") : undefined,
    phone: shipping.phone,
  };
}

export async function createWixOrder(params: {
  externalId: string; // our reference, e.g. the Stripe session id
  lines: FulfillmentLine[];
  shipping: FulfillmentAddress;
  money: WixOrderMoney;
}): Promise<WixResult> {
  const apiKey = process.env.WIX_API_KEY;
  const siteId = process.env.WIX_SITE_ID;
  if (!apiKey || !siteId) {
    console.warn("[wix] WIX_API_KEY/WIX_SITE_ID not set; skipping Wix fulfillment.");
    return { ok: false, skipped: true };
  }

  const appId = process.env.WIX_STORES_APP_ID || DEFAULT_WIX_STORES_APP_ID;
  const currency = params.money.currency || "USD";

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: apiKey,
    "wix-site-id": siteId,
  };
  if (process.env.WIX_ACCOUNT_ID) headers["wix-account-id"] = process.env.WIX_ACCOUNT_ID;

  // Map our cart lines to Wix Stores catalog items (see data/wix.ts).
  const lineItems: unknown[] = [];
  const unmapped: string[] = [];
  for (const line of params.lines) {
    const ref = resolveWixCatalogRef(line.productId, { size: line.size, color: line.color });
    const product = getProduct(line.productId);
    if (!ref || !product) {
      unmapped.push(line.size ? `${line.productId} (${line.size})` : line.productId);
      continue;
    }

    // Wix needs the variantId for managed-variant products. Resolve it from the
    // live catalog; fall back to option choices if the lookup fails.
    const variantId = await fetchWixVariantId(
      ref.productId,
      { size: ref.size, color: ref.color, sku: ref.sku },
      headers,
    );
    const options = variantId
      ? { variantId }
      : ref.options && Object.keys(ref.options).length
        ? { options: ref.options }
        : undefined;

    const variant = [line.color, line.size && `Size ${line.size}`].filter(Boolean).join(", ");
    lineItems.push({
      catalogReference: {
        appId,
        catalogItemId: ref.productId,
        ...(options ? { options } : {}),
      },
      quantity: line.quantity,
      itemType: { preset: "PHYSICAL" },
      productName: { original: variant ? `${product.name} (${variant})` : product.name },
      // Unit price, resolved from our own catalog (the same source checkout uses).
      price: money(product.price, currency),
    });
  }

  if (lineItems.length === 0) {
    console.error("[wix] No mappable items; order not created.", { unmapped });
    return { ok: false, error: "no_mappable_items", unmapped };
  }
  if (unmapped.length > 0) {
    console.warn("[wix] Some items have no Wix catalog mapping and were skipped.", { unmapped });
  }

  const body = {
    order: {
      lineItems,
      currency,
      // Mark the order paid (payment already captured by Stripe) so Wix's
      // Tapstitch connector treats it as ready to fulfill.
      paymentStatus: "PAID",
      // Order placed by us on the customer's behalf, not via Wix's own checkout.
      channelInfo: { type: "BACKOFFICE_MERCHANT", externalOrderId: params.externalId },
      buyerInfo: { email: params.shipping.email },
      priceSummary: {
        subtotal: money(params.money.subtotal, currency),
        shipping: money(params.money.shipping, currency),
        total: money(params.money.total, currency),
      },
      recipientInfo: {
        contactDetails: contactDetails(params.shipping),
        address: recipientAddress(params.shipping),
      },
      billingInfo: { contactDetails: contactDetails(params.shipping) },
    },
  };

  try {
    const res = await fetch(WIX_ORDERS_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[wix] Order create failed", res.status, detail);
      return { ok: false, error: `wix_${res.status}` };
    }
    const data = (await res.json().catch(() => ({}))) as { order?: { id?: string }; id?: string };
    return { ok: true, orderId: data.order?.id ?? data.id };
  } catch (err) {
    console.error("[wix] Order create threw", err);
    return { ok: false, error: "request_failed" };
  }
}
