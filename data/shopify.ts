// Storefront product id -> Shopify product handle.
//
// Option A fulfillment: the site keeps its own design pages/images, but each
// product's "Buy" button links straight to that product's page on the Shopify
// store, where checkout + print-on-demand fulfillment happen. Generated from the
// Shopify catalog export (owner-confirmed name mapping); regenerate when the
// Shopify catalog changes.
//
// Store: ysaa0n-ay.myshopify.com

export const SHOPIFY_DOMAIN = "ysaa0n-ay.myshopify.com";

/** The Shopify storefront home — fallback for products not individually mapped. */
export const SHOPIFY_STORE_URL = `https://${SHOPIFY_DOMAIN}`;

/** Shopify customer account: sign-in and order history for Shopify orders. */
export const SHOPIFY_ACCOUNT_URL = `${SHOPIFY_STORE_URL}/account`;

export const SHOPIFY_HANDLES: Record<string, string> = {
  // Hoodies
  "ess-hoodie-teddy": "heavyweight-pure-cotton-handcrafted-monkey-wash-drop-shoulder-oversized-hoodie-25", // -> Money Bear Hoodie
  "ess-hoodie-feelgood": "vintage-wash-frayed-fleece-hoodie-360-gsm-38", // -> Feel Good Hoodie
  "ess-hoodie-silentlove": "vintage-wash-frayed-fleece-hoodie-360-gsm-36", // -> Silent Bear Hoodie
  "ess-hoodie-pinkstars": "vintage-washed-frayed-fleece-hoodie", // -> Stay Focused Hoodie
  "ess-hoodie-rednolimit": "vintage-washed-frayed-fleece-hoodie-7", // -> No Limits Hoodie
  "ess-hoodie-bluelane": "create-your-own-line-hoodie", // -> Your Own Lane Hoodie
  "ess-hoodie-butterfly": "vintage-wash-frayed-fleece-hoodie-360-gsm-19", // -> SZA Hoodie
  "ess-hoodie-artwar195": "heavyweight-pure-cotton-handcrafted-monkey-wash-drop-shoulder-oversized-hoodie-12", // -> $1.95 Cash Hoodie
  // Tees
  "ess-tee-energy": "essential-cotton-t-shirt-24", // -> LDR Cash Tee
  "ess-tee-ambition": "ambition-tee", // -> Ambition Tee
  "ess-tee-true": "oversize-snow-washed-t-shirt-19", // -> Truce Tee
  "ess-tee-romance": "oversize-snow-washed-t-shirt", // -> Romance Tee
  "ess-tee-moneyangle": "oversize-one-piece-pattern-cut-boxy-tee-300-gsm-6", // -> Money Angle Tee
  "ess-tee-artwar195cash": "acid-wash-oversize-t-shirt-250-gsm-9", // -> $1.95 Cash Tee
  "ess-tee-artwar195": "acid-wash-oversize-t-shirt-250-gsm", // -> Art War Tee
  "ess-tee-powerofmoney": "acid-wash-oversize-t-shirt-250-gsm-7", // -> Power Angle Tee
  "ess-tee-hustlerangle": "acid-wash-oversize-t-shirt-250-gsm-8", // -> Hustler Angle Tee
  "ess-tee-nolimits": "essential-cotton-t-shirt-66", // -> No Limits Tee
  "ess-tee-teddy": "solid-color-raglan-sleeve-crop-top", // -> Cash Culture Bear Tee
  "ess-tee-shortsleeve": "essential-cotton-t-shirt-69", // -> Cash Culture Tee
  "ess-tee-soccerjersey": "oversized-mesh-v-neck-soccer-jersey-28", // -> Cash Soccer Jersey
  "ess-tee-sza": "square-patch-monkey-washed-drop-shoulder-t-shirt-250-gsm", // -> SZA Big Boy Tee
  "ess-tee-worldwide": "essential-cotton-t-shirt-68", // -> Black Worldwide Tee
  // Long sleeve / bottoms / tanks
  "ess-ls-hope": "streetwear-unisex-solid-color-fleece-pullover", // -> Hope Long Sleeve
  "ess-shorts-samuraiblack": "streetwear-unisex-heavyweight-earth-tone-loose-fit-fog-100-cotton-shorts-55", // -> Black Samurai Shorts
  "ess-shorts-samuraiwhite": "streetwear-unisex-heavyweight-earth-tone-loose-fit-fog-100-cotton-shorts-48", // -> White Samurai Shorts
  "ess-shorts-luxshort": "snow-washed-raw-edge-drawstring-shorts", // -> Cash Short Shorts
  "ess-shorts-luxury": "sun-fade-raw-edge-cotton-shorts", // -> Luxury Shorts
  "ess-joggers-silentlove": "jogger-sweatpants", // -> Silent Bear Joggers
  "ess-bottoms-szapants": "effortless-athleisure-pure-cotton-handcrafted-monkey-wash-loose-fit-sweatpants", // -> SZA Sweatpants
  "ess-tank-silentlove": "french-terry-boxy-tank-top-12", // -> Silent Tank Top
  "ess-tank-samuraihoodie": "samurai-no-sleeves", // -> Samurai No Sleeves

  // ---- Luxury (self-shipped, NOT Tapstitch) ----
  // Live Shopify product, fulfilled by hand (not connected to Tapstitch). The
  // "Order Now" button on the trench block resolves the chosen Color/Size to a
  // variant of this product and sends the customer to Shopify checkout.
  "cc-trench": "cash-culture-trench-coate", // -> Cash Culture Trench Coat (manual fulfillment)
};

/** Absolute URL of a product's Shopify page, or null if it isn't mapped yet. */
export function shopifyUrl(productId: string): string | null {
  const handle = SHOPIFY_HANDLES[productId];
  return handle ? `https://${SHOPIFY_DOMAIN}/products/${handle}` : null;
}
