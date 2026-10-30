import Image from "next/image";
import "../styles/luxury.css";
import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import FeaturedTrench from "@/components/FeaturedTrench";
import FeaturedTapestry from "@/components/FeaturedTapestry";
import FeaturedSweatsuit from "@/components/FeaturedSweatsuit";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "Luxury Collection",
  description: "The Cash Culture Luxury Collection: wool-blend trench coats, the Big Ben tapestry hoodie, and limited silk beanies. Premium materials, small runs.",
  alternates: { canonical: "/luxury" },
};

const BEANIES = [
  { id: "beanie-black-yellow", image: "/images/beanie-black-yellow.webp", name: "CC Beanie, Black and Yellow", price: 30, badge: "In Stock", colors: [{ hex: "#1a1a1a", title: "Black" }, { hex: "#eab308", title: "Yellow" }] },
  { id: "beanie-white-red", image: "/images/home-img-6.webp", name: "CC Beanie, White and Red", price: 30, badge: "In Stock", colors: [{ hex: "#f5f5f5", title: "White", border: true }, { hex: "#8b0000", title: "Red" }] },
  { id: "beanie-black-purple", image: "/images/luxury-img-14.webp", name: "CC Beanie, Black and Purple", price: 30, badge: "In Stock", colors: [{ hex: "#1a1a1a", title: "Black" }, { hex: "#4b0082", title: "Purple" }] },
  { id: "beanie-black-green", image: "/images/beanie-black-green.webp", name: "CC Beanie, Black and Green", price: 30, badge: "Limited", badgeLimited: true, colors: [{ hex: "#1a1a1a", title: "Black" }, { hex: "#39ff14", title: "Neon Green" }] },
] as const;

const PILLARS = [
  { icon: "◆", title: "Premium Materials", desc: "Every Luxury piece uses the finest fabrics: wool blends, woven tapestry, premium silk." },
  { icon: "◆", title: "Limited Production", desc: "Small runs only. Once it is gone, it is gone. Own something truly exclusive." },
  { icon: "◆", title: "Worldwide Shipping", desc: "We ship globally from Baltimore. Orders processed Mon to Fri, 11am to 6pm EST." },
];

export default function LuxuryPage() {
  return (
    <main className="cc-lux">
      <ScrollReveal selector=".cc-lux .product-card, .cc-lux .pillar, .cc-lux .featured" />

      {/* HERO */}
      <section className="lux-hero">
        <div className="lux-hero-grain" />
        <div className="lux-hero-deco">LX</div>
        <div className="lux-hero-content">
          <p className="lux-tag">Premium Collection</p>
          <h1 className="lux-title">LUXURY<br />LINE</h1>
          <p className="lux-subtitle">Elevated Culture. Built to Last.</p>
          <p className="lux-desc">Every piece in the Cash Culture Luxury Collection is crafted with premium materials and limited to small production runs. From silk beanies to tapestry hoodies to hand-finished trench coats. For the dinner, the event, the room you worked to get into.</p>
        </div>
      </section>

      <nav className="lux-jump" aria-label="Luxury collection sections">
        <a href="#trench">Trench Coats</a>
        <a href="#tapestry">Tapestry Hoodie</a>
        <a href="#sweatsuit">SZA Sweat Suit</a>
        <a href="#beanies">Silk Beanies</a>
      </nav>

      <div className="gold-divider" />

      <div className="ad-banner">
        <Image src="/images/luxury-img-2.webp" alt="Cash Culture Luxury trench coats" width={1024} height={1536} sizes="100vw" />
      </div>

      <div className="gold-divider" />

      {/* TRENCH */}
      <section className="section" id="trench">
        <div className="section-header">
          <p className="section-label">01 / Outerwear</p>
          <h2 className="section-title">LUXURY TRENCH COATS</h2>
          <p className="section-sub">Refined style. Timeless warmth. Limited pieces. <Link href="/luxury/trench-coat" className="lux-back">Read the story &#x2192;</Link></p>
        </div>
      </section>
      <FeaturedTrench />

      <div className="gold-divider" />

      {/* TAPESTRY */}
      <section className="section" id="tapestry">
        <div className="section-header">
          <p className="section-label">02 / Tops</p>
          <h2 className="section-title">BIG BEN TAPESTRY HOODIE</h2>
          <p className="section-sub">Woven art. Street luxury. One of a kind.</p>
        </div>
      </section>
      <FeaturedTapestry />

      <div className="gold-divider" />

      {/* SZA SWEAT SUIT */}
      <section className="section" id="sweatsuit">
        <div className="section-header">
          <p className="section-label">03 / Sets</p>
          <h2 className="section-title">SZA SWEAT SUIT</h2>
          <p className="section-sub">Matching set. Designer patches. Limited drop.</p>
        </div>
      </section>
      <FeaturedSweatsuit />

      <div className="gold-divider" />

      {/* BEANIES */}
      <section className="section" id="beanies">
        <div className="section-header">
          <p className="section-label">04 / Accessories</p>
          <h2 className="section-title">CC SILK BEANIES</h2>
          <p className="section-sub">5 colorways. All limited. All culture.</p>
        </div>
        <div className="products-grid">
          {BEANIES.map((b) => (
            <ProductCard key={b.id} variant="luxury" {...b} colors={[...b.colors]} />
          ))}

          {/* Bundle (display promo) */}
          <div className="product-card bundle-card">
            <div className="bundle-art">
              <div className="bundle-art-inner">
                <div className="bundle-big">ANY<br />2 FOR</div>
                <div className="bundle-price">$55</div>
                <div className="bundle-note">Mix and Match All Colors</div>
              </div>
            </div>
            <div className="product-info">
              <span className="product-badge">Bundle Deal</span>
              <p className="product-name">CC Beanie Bundle, Pick Any 2</p>
              <p className="product-price">$55.00 <span style={{ fontSize: "0.7rem", color: "var(--muted)", fontWeight: 400 }}>save $5</span></p>
            </div>
          </div>
        </div>
        <div className="beanie-cta">
          <a className="btn-gold" href="/luxury/silk-beanie">Customize Your Silk Beanie →</a>
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
