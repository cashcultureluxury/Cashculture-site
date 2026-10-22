import Image from "next/image";
import "../../styles/luxury.css";
import type { Metadata } from "next";
import Link from "next/link";
import FeaturedBeanie from "@/components/FeaturedBeanie";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = {
  title: "CC Silk Beanie",
  description: "The Cash Culture silk-lined beanie. White or Black base with a Purple, Yellow, Red, or Green embroidered accent. Limited production.",
  alternates: { canonical: "/luxury/silk-beanie" },
};

export default function SilkBeaniePage() {
  return (
    <main className="cc-lux">
      <ScrollReveal selector=".cc-lux .featured" />

      <section className="section" id="silk-beanie">
        <div className="section-header">
          <p className="section-label">
            <Link href="/luxury#beanies" className="lux-back">Luxury</Link> / Silk Beanie
          </p>
          <h2 className="section-title">CC SILK BEANIE</h2>
          <p className="section-sub">Pick your base. Pick your accent. Make it yours.</p>
        </div>
      </section>

      <FeaturedBeanie />

      <div className="gold-divider" />

      <section className="section" id="beanie-lifestyle">
        <div className="section-header">
          <p className="section-label">Worn By The Culture</p>
          <h2 className="section-title">ON THE STREETS</h2>
          <p className="section-sub">The CC dice beanie out in the wild, glowing under the lights.</p>
        </div>
        <div className="beanie-gallery">
          {[
            { src: "/images/beanie-life-1.webp", label: "Black & Green" },
            { src: "/images/beanie-life-2.webp", label: "Black & Green" },
            { src: "/images/beanie-life-7.webp", label: "Black & Green" },
            { src: "/images/beanie-black-red.webp", label: "Black & Red" },
            { src: "/images/beanie-life-6.webp", label: "Black & Red" },
            { src: "/images/beanie-life-3.webp", label: "Black & Yellow" },
            { src: "/images/beanie-life-4.webp", label: "Black & Green / White & Green" },
            { src: "/images/beanie-life-8.webp", label: "White & Green" },
            { src: "/images/beanie-white-green-pool.webp", label: "White & Green" },
            { src: "/images/beanie-white-purple-pool.webp", label: "White & Purple" },
          ].map((g) => (
            <div className="beanie-gallery-item" key={g.src}>
              <Image src={g.src} alt={`CC dice beanie, ${g.label}`} width={800} height={1000} sizes="(max-width: 1000px) 50vw, 20vw" />
              <span className="beanie-gallery-tag">{g.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="gold-divider" />
    </main>
  );
}
