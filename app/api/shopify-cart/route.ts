// Builds a Shopify cart permalink from the site cart, so a multi-item site cart
// checks out on Shopify with all items pre-loaded.
//
// For each cart line we look up the product's Shopify handle (data/shopify.ts),
// fetch the product's public JSON (`/products/<handle>.js`, no auth needed),
// match the chosen size/color to a Shopify variant, and collect its numeric
// variant id. The result is a permalink:
//   https://<store>/cart/<variantId>:<qty>,<variantId>:<qty>
// which drops the customer on Shopify checkout with the whole cart.

import { NextResponse } from "next/server";
import { SHOPIFY_DOMAIN, SHOPIFY_HANDLES, SHOPIFY_STORE_URL } from "@/data/shopify";

export const runtime = "nodejs";

type CartItem = { id: string; size?: string; color?: string; qty?: number };
type ShopifyVariant = { id: number; option1?: string | null; option2?: string | null; option3?: string | null };

const norm = (s?: string | null) => (s ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

async function resolveVariantId(handle: string, size?: string, color?: string): Promise<number | null> {
  try {
    const res = await fetch(`https://${SHOPIFY_DOMAIN}/products/${handle}.js`, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("[shopify-cart] product fetch failed", handle, res.status);
      return null;
    }
    const data = (await res.json()) as { variants?: ShopifyVariant[] };
    const variants = data.variants ?? [];
    if (variants.length === 0) return null;

    const opts = (v: ShopifyVariant) => [v.option1, v.option2, v.option3].map((o) => norm(o));
    let vs = variants;
    if (size) {
      const ns = norm(size);
      const bySize = vs.filter((v) => opts(v).includes(ns));
      if (bySize.length) vs = bySize;
    }
    if (color && vs.length > 1) {
      const nc = norm(color);
      const byColor = vs.filter((v) => opts(v).some((o) => o && (o.includes(nc) || nc.includes(o))));
      if (byColor.length) vs = byColor;
    }
    return vs[0]?.id ?? variants[0].id;
  } catch (err) {
    console.error("[shopify-cart] resolve threw", handle, err);
    return null;
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { items?: CartItem[] };
  const items = Array.isArray(body.items) ? body.items : [];

  const resolved = await Promise.all(
    items.map(async (it) => {
      const handle = SHOPIFY_HANDLES[it.id];
      if (!handle) return null;
      const variantId = await resolveVariantId(handle, it.size, it.color);
      if (!variantId) return null;
      return `${variantId}:${Math.max(1, Math.floor(it.qty || 1))}`;
    })
  );

  const parts = resolved.filter((p): p is string => Boolean(p));
  if (parts.length === 0) {
    // Nothing resolvable — send them to the store rather than a broken checkout.
    return NextResponse.json({ url: SHOPIFY_STORE_URL });
  }
  return NextResponse.json({ url: `https://${SHOPIFY_DOMAIN}/cart/${parts.join(",")}` });
}
