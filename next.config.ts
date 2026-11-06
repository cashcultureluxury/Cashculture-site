import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores the stray lockfile in the home
  // directory and always treats this project folder as the root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // Newer Essentials photos load straight from the store's Shopify image CDN.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com", pathname: "/s/files/1/0753/5103/1877/**" }],
  },
  async redirects() {
    return [
      // The ambassador program is now the Cash Culture Family. Keep old links
      // (bios, emails, the promo popup in cached pages) working.
      { source: "/ambassadors", destination: "/family", permanent: true },
      { source: "/stories", destination: "/family", permanent: true },
      // Site accounts were retired; Shopify only handles payment and orders.
      { source: "/account", destination: "/", permanent: false },
      { source: "/checkout/success", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
