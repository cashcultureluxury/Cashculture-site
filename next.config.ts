import type { NextConfig } from "next";
import path from "node:path";
import { SHOPIFY_ACCOUNT_URL } from "./data/shopify";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores the stray lockfile in the home
  // directory and always treats this project folder as the root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      // The ambassador program is now the Cash Culture Family. Keep old links
      // (bios, emails, the promo popup in cached pages) working.
      { source: "/ambassadors", destination: "/family", permanent: true },
      // Checkout and customer accounts moved to Shopify; send old links there.
      { source: "/account", destination: SHOPIFY_ACCOUNT_URL, permanent: false },
      { source: "/checkout/success", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
