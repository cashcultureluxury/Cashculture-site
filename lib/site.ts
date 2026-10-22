// Single source of truth for the site origin + identity used across SEO
// (metadata, canonicals, sitemap, robots, structured data).
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://cashcultureluxury.com"
).replace(/\/$/, "");

export const SITE_NAME = "Cash Culture";

/** Absolute URL for a site-relative path. */
export function abs(path: string): string {
  return new URL(path, SITE_URL).toString();
}
