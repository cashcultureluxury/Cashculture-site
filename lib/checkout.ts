// Client-side checkout hand-off. Shopify is only the payment step: we send the
// site cart to /api/shopify-cart, which turns it into a Shopify cart permalink
// that opens checkout directly. Shoppers never land on the Shopify storefront.

export type CheckoutItem = { id: string; size?: string; color?: string; qty?: number };

export const CHECKOUT_ERROR = "Checkout is unavailable for this item right now. DM us @cashcultureluxury and we'll help.";

/** Redirects to Shopify checkout. Resolves false (no redirect) if checkout can't be built. */
export async function goToCheckout(items: CheckoutItem[]): Promise<boolean> {
  try {
    const res = await fetch("/api/shopify-cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const data = (await res.json().catch(() => ({}))) as { url?: string };
    if (!res.ok || !data.url) return false;
    window.location.href = data.url;
    return true;
  } catch {
    return false;
  }
}
