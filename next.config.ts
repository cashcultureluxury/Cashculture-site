import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores the stray lockfile in the home
  // directory and always treats this project folder as the root.
  turbopack: {
    root: path.resolve(__dirname),
  },
  // The ambassador program is now the Cash Culture Family. Keep old links
  // (bios, emails, the promo popup in cached pages) working.
  async redirects() {
    return [{ source: "/ambassadors", destination: "/family", permanent: true }];
  },
};

export default nextConfig;
