import Image from "next/image";
import "./styles/home.css";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import HomeShopAll from "@/components/HomeShopAll";
import { ESSENTIALS } from "@/data/essentials";
import { FAMILY } from "@/data/family";
import { CLOSING } from "@/data/brand";

// Home is shop-first (the Essentials / Denim Tears pattern): hero,
// new arrivals, luxury, the full catalog, then the brand story and community.

// Newest drops first; badged "New" items from the live catalog.
const NEW_ARRIVALS = ESSENTIALS.filter((p) => p.badge === "New").slice(0, 8);

const LUXURY_PIECES = [
  { name: "Luxury Trench Coat", price: "$250.00", href: "/luxury/trench-coat", src: "/images/trench-camel.webp", note: "Grey · Camel · Black" },
  { name: "CC Silk Beanie", price: "$30.00", href: "/luxury/silk-beanie", src: "/images/beanie-black-yellow.webp", note: "4 colorways" },
  { name: "Tapestry Hoodie", price: "Sold Out", href: "/luxury#tapestry", src: "/images/tapestry-1.webp", note: "Notify me", soldOut: true },
  { name: "SZA Sweat Suit", price: "Sold Out", href: "/luxury#sweatsuit", src: "/images/sweatsuit-1.webp", note: "Notify me", soldOut: true },
];

// Real people in the pieces.
const COMMUNITY = [
  { src: "/images/community-10.webp", alt: "Friends in matching Cash Culture sets" },
  { src: "/images/community-8.webp", alt: "A family in Cash Culture hoodies" },
  { src: "/images/community-2.webp", alt: "Out for the night in a Cash Culture tee" },
  { src: "/images/community-15.webp", alt: "City nights in Cash Culture" },
  { src: "/images/community-9.webp", alt: "The team in Cash Culture" },
  { src: "/images/community-11.webp", alt: "Big Ben tapestry hoodie at the show" },
  { src: "/images/community-1.webp", alt: "The youngest member of the culture" },
  { src: "/images/community-16.webp", alt: "Cash Culture tee in the alley light" },
  { src: "/images/community-6.webp", alt: "Tapestry hoodie by the car" },
  { src: "/images/community-12.webp", alt: "Tapestry hoodie mirror selfie" },
  { src: "/images/community-5.webp", alt: "Cash Culture bear hoodie, back print" },
  { src: "/images/community-3.webp", alt: "Cash Culture hoodie mirror selfie" },
];

export default function Home() {
  return (
    <main className="cc-home">
      <ScrollReveal selector=".cc-home .reveal, .cc-home .new-arrivals .product-card, .cc-home .lux-tile, .cc-home .family-card, .cc-home .home-gallery-item" />

      {/* HERO */}
      <section className="hero">
        <div className="hero-grain" />
        <div className="hero-content">
          <p className="hero-eyebrow">Cash Culture</p>
          <h1 className="hero-title">FOR THE ONES<br />WHO BUILD.</h1>
          <p className="hero-subtitle">Luxury and Essentials for people building something real.</p>
          <div className="hero-btns">
            <a className="btn-gold" href="#new">Shop New Arrivals</a>
            <Link className="btn-outline" href="/luxury">Shop Luxury</Link>
          </div>
        </div>
        <div className="hero-img-wrap">
          <Image src="/images/home-img-2.webp" alt="A builder in the Cash Culture tapestry hoodie" width={440} height={660} sizes="380px" preload />
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section className="section new-arrivals" id="new">
        <div className="section-header">
          <div>
            <p className="rule-kicker">Just Dropped</p>
            <h2 className="section-title">New <span>arrivals.</span></h2>
          </div>
          <Link className="view-all" href="/essentials">View All &#x2192;</Link>
        </div>
        <div className="products-grid products-grid-4">
          {NEW_ARRIVALS.map((p) => (
            <ProductCard
              key={p.id}
              variant="home"
              href={`/essentials/${p.id}`}
              image={p.image}
              name={p.name}
              price={`$${p.price.toFixed(2)}`}
              badge={p.badge}
              colorCount={p.colors?.length}
            />
          ))}
        </div>
      </section>

      {/* LUXURY */}
      <section className="section luxury-row" id="luxury">
        <div className="section-header">
          <div>
            <p className="rule-kicker">Luxury</p>
            <h2 className="section-title">For the room you <span>worked to get into.</span></h2>
            <p className="section-sub">Trench coats, woven tapestry, silk. Made in small runs, with intent.</p>
          </div>
          <Link className="view-all" href="/luxury">Shop Luxury &#x2192;</Link>
        </div>
        <div className="lux-grid">
          {LUXURY_PIECES.map((p) => (
            <Link className="lux-tile" href={p.href} key={p.name}>
              <div className="lux-tile-img">
                <Image src={p.src} alt={p.name} width={792} height={1056} sizes="(max-width: 1000px) 50vw, 25vw" />
                {p.soldOut && <span className="product-badge">Sold Out</span>}
              </div>
              <p className="product-name">{p.name}</p>
              <p className="product-price" style={p.soldOut ? { color: "var(--muted)" } : undefined}>{p.price}</p>
              <p className="product-colorcount">{p.note}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* SHOP ALL: tabbed catalog */}
      <section className="section shop-all" id="shop">
        <div className="section-header">
          <div>
            <p className="rule-kicker">Essentials</p>
            <h2 className="section-title">Everyday culture. <span>Worn daily.</span></h2>
            <p className="section-sub">Hoodies, tees, long sleeves, shorts and sets. Made to order, shipped worldwide.</p>
          </div>
        </div>
        <HomeShopAll />
      </section>

      {/* NEVER COUNT ME OUT: campaign band */}
      <section className="campaign">
        <div className="campaign-bg" style={{ backgroundImage: "url('/images/luxury-img-16.webp')" }} />
        <div className="campaign-content">
          <p className="rule-kicker reveal">The Campaign</p>
          <h2 className="campaign-title reveal">NEVER COUNT<br />ME OUT.</h2>
          <p className="campaign-body reveal">
            Told he wasn&apos;t good enough, our founder trained harder and dropped 30+ on his old team in a championship.
            That mentality became bigger than basketball. It belongs to everyone who&apos;s been doubted, overlooked, or forced to start over.
          </p>
          <div className="campaign-btns reveal">
            <Link href="/about" className="btn-gold">Read The Origin</Link>
            <Link href="/culture" className="btn-outline">Enter The Culture</Link>
          </div>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="section community">
        <div className="section-header">
          <div>
            <p className="rule-kicker">The Community</p>
            <h2 className="section-title">Worn by <span>the culture.</span></h2>
            <p className="section-sub">Tag @cashcultureluxury to be featured.</p>
          </div>
          <a className="view-all" href="https://www.instagram.com/cashcultureluxury" target="_blank" rel="noopener noreferrer">Follow On Instagram &#x2192;</a>
        </div>
        <div className="home-gallery">
          {COMMUNITY.map((c) => (
            <div className="home-gallery-item" key={c.src}><Image src={c.src} alt={c.alt} width={900} height={1200} sizes="(max-width: 1000px) 33vw, 16vw" /></div>
          ))}
        </div>
      </section>

      {/* THE FAMILY */}
      <section className="section family">
        <div className="section-header">
          <div>
            <p className="rule-kicker">The Family</p>
            <h2 className="section-title">Different people. <span>Same mindset.</span></h2>
          </div>
          <Link className="view-all" href="/family">Meet The Family &#x2192;</Link>
        </div>
        <div className="family-grid">
          {FAMILY.map((m) => (
            <Link className="family-card" href="/family#family" key={m.name}>
              <div className="family-img"><Image src={m.image} alt={m.name} width={600} height={800} sizes="(max-width: 1000px) 50vw, 20vw" /></div>
              <p className="family-name">{m.name}</p>
              {m.niche && <p className="family-niche">{m.niche}</p>}
            </Link>
          ))}
        </div>
      </section>

      {/* CLOSING STATEMENT */}
      <section className="closing">
        <p className="closing-mark reveal">Cash Culture</p>
        <h2 className="closing-title reveal">FOR THE ONES WHO BUILD.</h2>
        <ul className="closing-lines reveal">
          {CLOSING.map((l) => <li key={l}>{l}</li>)}
        </ul>
        <Link href="/culture" className="arrow-link reveal">Read The Code &#x2192;</Link>
      </section>
    </main>
  );
}
