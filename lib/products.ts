import products from "@/data/products.json";
import { ESSENTIALS } from "@/data/essentials";

export type ProductConfig = {
  name: string;
  price: number;
  image: string;
  paymentLinkEnv?: string;
  // Name of the env var holding a real Stripe Price ID (price_...). When set
  // (and the env var is populated), checkout references that price directly so
  // sales attribute to the linked Stripe product instead of an ad-hoc price.
  stripePriceEnv?: string;
};

// The Essentials catalog lives in data/essentials.ts (its own source of truth
// for the storefront). Merge it in so checkout can resolve those ids too.
const essentialsCatalog: Record<string, ProductConfig> = Object.fromEntries(
  ESSENTIALS.map((e) => [
    e.id,
    {
      name: e.name,
      price: e.price,
      image: e.image,
      paymentLinkEnv: "STRIPE_PAYMENT_LINK_ESSENTIALS",
    },
  ])
);

const catalog: Record<string, ProductConfig> = {
  ...(products as Record<string, ProductConfig>),
  ...essentialsCatalog,
};

export function getProduct(id: string): ProductConfig | undefined {
  return catalog[id];
}

export function allProducts(): Record<string, ProductConfig> {
  return catalog;
}
