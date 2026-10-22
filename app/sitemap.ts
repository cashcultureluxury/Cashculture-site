import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { ESSENTIALS } from "@/data/essentials";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/luxury", priority: 0.9, freq: "weekly" },
    { path: "/essentials", priority: 0.9, freq: "weekly" },
    { path: "/culture", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/luxury/silk-beanie", priority: 0.7, freq: "monthly" },
    { path: "/family", priority: 0.7, freq: "monthly" },
    { path: "/privacy", priority: 0.3, freq: "yearly" },
    { path: "/terms", priority: 0.3, freq: "yearly" },
  ];

  // One entry per Essentials product order page.
  const productRoutes = ESSENTIALS.map((p) => ({
    path: `/essentials/${p.id}`,
    priority: 0.8,
    freq: "weekly" as const,
  }));

  return [...staticRoutes, ...productRoutes].map(({ path, priority, freq }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  }));
}
