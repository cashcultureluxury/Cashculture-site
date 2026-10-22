import Image from "next/image";
import "../styles/luxury.css";
import "../styles/essentials.css";
import type { Metadata } from "next";
import EssentialsCard from "@/components/EssentialsCard";
import ScrollReveal from "@/components/ScrollReveal";
import JsonLd from "@/components/JsonLd";
import { ESSENTIALS, ESSENTIALS_CATEGORIES, type EssentialsCategory } from "@/data/essentials";
import { abs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Essentials Collection",
  description: "Cash Culture Essentials: everyday hoodies, tees, long sleeves, shorts, and tanks. Premium blanks, bold graphics, made to order and shipped worldwide.",
  alternates: { canonical: "/essentials" },
};

const SECTION_META: Record<EssentialsCategory, { kind: string; sub: string }> = {
  Hoodies: { kind: "Tops", sub: "Heavyweight fleece. Statement graphics. Everyday warmth." },
  Tees: { kind: "Tops", sub: "Premium cotton. Clean prints. The daily uniform." },
  "Long Sleeves": { kind: "Tops", sub: "Long sleeves and crewnecks. Layer up." },
  Shorts: { kind: "Bottoms", sub: "Made to move. Comfort that carries the culture." },
  Bottoms: { kind: "Bottoms", sub: "Joggers and pants. All-day comfort." },
  Tanks: { kind: "Tops", sub: "Sleeveless. Summer-ready fits." },
};

const PILLARS = [
  { icon: "◆", title: "Premium Blanks", desc: "Heavyweight cotton and soft fleece. Everyday pieces built to last wash after wash." },
  { icon: "◆", title: "Made To Order", desc: "Printed and stitched when you order, so every piece is fresh. No overstock, no waste." },
  { icon: "◆", title: "Worldwide Shipping", desc: "Fulfilled and shipped globally. Most orders ship within a few business days." },
];

export default function EssentialsPage() {
  // Only render categories that actually have products.
  const sections = ESSENTIALS_CATEGORIES
    .map((cat) => ({ cat, items: ESSENTIALS.filter((p) => p.category === cat) }))
    .filter((s) => s.items.length > 0);

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Cash Culture Essentials",
    itemListElement: ESSENTIALS.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.name,
      url: abs(`/essentials/${p.id}`),
    })),
  };

  return (
    <main className="cc-lux cc-ess">
      <JsonLd data={itemListJsonLd} />
      <ScrollReveal selector=".cc-ess .ess-card, .cc-ess .pillar" />

      {/* HERO */}
      <section className="lux-hero">
        <div className="lux-hero-grain" />
        <div className="lux-hero-deco">ES</div>
        <div className="lux-hero-content">
          <p className="lux-tag">Everyday Collection</p>
          <h1 className="lux-title">ESSENTIALS<br />LINE</h1>
          <p className="lux-subtitle">Everyday Culture. Worn Daily.</p>
          <p className="lux-desc">The pieces you reach for every day. Premium hoodies, tees, long sleeves, and bottoms with the Cash Culture mark, made to order and shipped worldwide. Bold graphics, honest prices, no compromise on quality.</p>
        </div>
      </section>

      <nav className="lux-jump" aria-label="Essentials collection sections">
        {sections.map((s) => (
          <a key={s.cat} href={`#${s.cat.toLowerCase().replace(/\s+/g, "-")}`}>{s.cat}</a>
        ))}
      </nav>

      <div className="gold-divider" />

      {sections.map((s, i) => (
        <div key={s.cat}>
          <section className="section" id={s.cat.toLowerCase().replace(/\s+/g, "-")}>
            <div className="section-header">
              <p className="section-label">{String(i + 1).padStart(2, "0")} / {SECTION_META[s.cat].kind}</p>
              <h2 className="section-title">{s.cat.toUpperCase()}</h2>
              <p className="section-sub">{SECTION_META[s.cat].sub}</p>
            </div>
            <div className="products-grid">
              {s.items.map((p) => <EssentialsCard key={p.id} {...p} />)}
            </div>
          </section>
          <div className="gold-divider" />
        </div>
      ))}

      {/* LIFESTYLE BANNER */}
      <section className="ess-banner">
        <div className="ess-banner-item">
          <Image src="/images/ess-banner-hustle.webp" alt="Cash Culture Hustle — the culture under the lights" width={1170} height={772} sizes="(max-width: 1000px) 100vw, 66vw" />
          <div className="ess-banner-cap">
            <p className="ess-banner-tag">Cash Culture</p>
            <h2 className="ess-banner-title">Worn In The Wild</h2>
          </div>
        </div>
        <div className="ess-banner-item tall">
          <Image src="/images/community-13.webp" alt="The crew in Cash Culture tapestry hoodies" width={900} height={1200} sizes="(max-width: 1000px) 100vw, 33vw" />
        </div>
      </section>

      <div className="gold-divider" />

      {/* PILLARS */}
      <div className="pillars">
        {PILLARS.map((p) => (
          <div className="pillar" key={p.title}>
            <div className="pillar-icon">{p.icon}</div>
            <p className="pillar-title">{p.title}</p>
            <p className="pillar-desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
