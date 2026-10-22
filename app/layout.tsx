import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SITE_NAME, abs } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Cash Culture | For The Ones Who Build",
    template: "%s | Cash Culture",
  },
  description:
    "Cash Culture is the culture of people who build. Luxury and Essentials clothing for entrepreneurs, artists, athletes, creators, and anyone becoming something.",
  applicationName: SITE_NAME,
  keywords: [
    "Cash Culture",
    "Cash Culture clothing",
    "luxury streetwear",
    "tapestry hoodies",
    "silk beanies",
    "trench coat",
    "graphic tees",
    "premium essentials",
    "streetwear brand",
    "lifestyle brand",
    "Never Count Me Out",
    "Modern Hustler",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    title: "Cash Culture | For The Ones Who Build",
    description: "The culture of people who build. Cash Culture Luxury and Essentials.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: "Cash Culture" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cash Culture | For The Ones Who Build",
    description: "The culture of people who build. Cash Culture Luxury and Essentials.",
    images: ["/images/og.jpg"],
  },
};

// Sitewide structured data: who we are + the website itself.
const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: abs("/icon.png"),
  description:
    "Cash Culture is a fashion and lifestyle brand for people who build: entrepreneurs, artists, athletes, creators, and professionals.",
  slogan: "For The Ones Who Build.",
};

const SITE_JSONLD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

// Self-hosted via next/font: no render-blocking request to Google, no layout
// shift. Exposed as CSS variables used by the design tokens in globals.css.
const serif = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Montserrat({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <JsonLd data={[ORG_JSONLD, SITE_JSONLD]} />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
