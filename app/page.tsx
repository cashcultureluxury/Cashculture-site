import Image from "next/image";
import "./styles/home.css";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ScrollReveal from "@/components/ScrollReveal";
import CodeSection from "@/components/CodeSection";
import { ESSENTIALS } from "@/data/essentials";
import { FAMILY } from "@/data/family";
import { CLOSING, COMMUNITY_PILLARS, HUSTLER_ROLES, LUXURY_QUALITIES, MANTRA } from "@/data/brand";

// Featured products on the home grid, pulled from the live Essentials catalog
// so the homepage always mirrors real, in-stock products. Badged items
// (Best Seller / New) surface first.
const BEST_SELLERS = [...ESSENTIALS]
  .sort((a, b) => Number(Boolean(b.badge)) - Number(Boolean(a.badge)))
  .slice(0, 8)
  .map((p) => ({
    id: p.id,
    image: p.image,
    name: p.name,
    price: `$${p.price.toFixed(2)}`,
    reviews: p.reviews,
    badge: p.badge,
  }));

// Real people in the pieces. Kept to everyday moments, not staged flexing.
const COMMUNITY = [
  { src: "/images/community-10.webp", alt: "Friends in matching Cash Culture sets" },
  { src: "/images/community-8.webp", alt: "A family in Cash Culture hoodies" },
  { src: "/images/community-2.webp", alt: "Out for the night in a Cash Culture tee" },
  { src: "/images/community-15.webp", alt: "City nights in Cash Culture" },
  { src: "/images/community-9.webp", alt: "The team in Cash Culture" },
];

export default function Home() {
  return (
    <main className="cc-home">
      <ScrollReveal selector=".cc-home .reveal, .cc-home .product-card, .cc-home .cc-code-row, .cc-home .family-card, .cc-home .home-gallery-item" />

      {/* HERO: campaign first, two clear ways into the product */}
      <section className="hero">
        <div className="hero-grain" />
        <div className="hero-content">
          <p className="hero-eyebrow">Cash Culture</p>
          <h1 className="hero-title">FOR THE ONES<br />WHO BUILD.</h1>
          <p className="hero-subtitle">Luxury and Essentials for people building something real.</p>
          <div className="hero-btns">
            <Link className="btn-gold" href="/luxury">Shop Luxury</Link>
            <Link className="btn-outline" href="/essentials">Shop Essentials</Link>
          </div>
        </div>
        <div className="hero-img-wrap">
          <Image src="/images/home-img-2.webp" alt="A builder in the Cash Culture tapestry hoodie" width={440} height={660} sizes="380px" preload />
        </div>
      </section>

      {/* BRAND PHILOSOPHY */}
      <section className="philosophy">
        <div className="philosophy-head">
          <p className="rule-kicker reveal">The Philosophy</p>
          <h2 className="philosophy-title reveal">The culture of<br /><span>people who build.</span></h2>
          <p className="philosophy-body reveal">
            It isn&apos;t about income. It&apos;s about mindset. Cash Culture is for the person who says,
            &ldquo;I have something I want to build, and I&apos;m willing to put the work in.&rdquo;
          </p>
          <Link href="/culture" className="arrow-link reveal">Enter The Culture &#x2192;</Link>
        </div>
        <ul className="philosophy-lines">
          {MANTRA.map((m) => <li className="reveal" key={m}>{m}</li>)}
        </ul>
      </section>

      {/* THE MODERN HUSTLER: different paths, same mindset */}
      <section className="hustler">
        <div className="hustler-img reveal">
          <Image src="/images/community-7.webp" alt="The Modern Hustler: composed, confident, in Cash Culture" width={900} height={1200} sizes="(max-width: 1000px) 100vw, 50vw" />
        </div>
        <div className="hustler-text">
          <p className="rule-kicker reveal">The Modern Hustler</p>
          <h2 className="hustler-title reveal">Different paths.<br /><span>Same mindset.</span></h2>
          <p className="hustler-body reveal">
            Not the stereotype. No fake wealth, no flexing for validation. The Modern Hustler is building something real,
            and is the same person in the boardroom, the studio, and the gym.
          </p>
          <ul className="hustler-roles reveal" aria-label="Different paths">
            {HUSTLER_ROLES.map((r) => <li key={r}>{r}</li>)}
          </ul>
          <Link href="/culture#modern-hustler" className="arrow-link reveal">Read The Philosophy &#x2192;</Link>
        </div>
      </section>

      {/* LUXURY: the elevated line, introduced on its own */}
      <section className="luxury" id="luxury">
        <div className="luxury-img reveal">
          <Image src="/images/trench-camel.webp" alt="The Cash Culture camel trench coat" width={792} height={880} sizes="(max-width: 1000px) 100vw, 50vw" />
        </div>
        <div className="luxury-text">
          <p className="rule-kicker reveal">Luxury</p>
          <h2 className="luxury-title reveal">For the room you<br /><span>worked to get into.</span></h2>
          <ul className="luxury-qualities reveal" aria-label="Luxury is">
            {LUXURY_QUALITIES.map((q) => <li key={q}>{q}</li>)}
          </ul>
          <p className="luxury-body reveal">
            Trench coats, woven tapestry, silk. Made in small runs, with intent. Pieces you keep.
          </p>
          <ul className="luxury-pieces reveal">
            <li><Link href="/luxury/trench-coat">Trench Coats</Link></li>
            <li><Link href="/luxury#tapestry">Tapestry Hoodie</Link></li>
            <li><Link href="/luxury#beanies">Silk Beanies</Link></li>
          </ul>
          <Link className="btn-gold reveal" href="/luxury">Shop Luxury</Link>
        </div>
      </section>

      {/* ESSENTIALS: everyday culture, the live catalog */}
      <section className="section essentials" id="essentials">
        <div className="section-header">
          <div>
            <p className="rule-kicker">Essentials</p>
            <h2 className="section-title">Everyday culture. <span>Worn daily.</span></h2>
            <p className="section-sub">For class, the studio, the gym, the late nights. Hoodies, tees, shorts.</p>
          </div>
          <Link className="view-all" href="/essentials">Shop Essentials &#x2192;</Link>
        </div>
        <div className="products-grid">
          {BEST_SELLERS.map((p) => (
            <ProductCard key={p.id} variant="home" href={`/essentials/${p.id}`} {...p} />
          ))}
        </div>
      </section>

      {/* THE CODE: eleven values, one standard */}
      <CodeSection id="code" link={{ href: "/culture", label: "Read The Philosophy" }} />

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
            <Link href="/culture#never-count-me-out" className="btn-outline">The Mentality</Link>
          </div>
        </div>
      </section>

      {/* THE FAMILY */}
      <section className="section family">
        <div className="section-header">
          <div>
            <p className="rule-kicker">The Family</p>
            <h2 className="section-title">Different people. <span>Same mindset.</span></h2>
            <p className="section-sub">Different careers. Different backgrounds. Same standard.</p>
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

      {/* COMMUNITY */}
      <section className="section community">
        <div className="section-header">
          <div>
            <p className="rule-kicker">The Community</p>
            <h2 className="section-title">More than <span>a shirt.</span></h2>
            <p className="section-sub">The clothing is the entry point. The culture is the destination.</p>
          </div>
        </div>
        <ul className="community-pillars">
          {COMMUNITY_PILLARS.map((c) => <li key={c}>{c}</li>)}
        </ul>
        <div className="home-gallery">
          {COMMUNITY.map((c) => (
            <div className="home-gallery-item" key={c.src}><Image src={c.src} alt={c.alt} width={900} height={1200} sizes="(max-width: 1000px) 50vw, 25vw" /></div>
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
        <p className="closing-sign reveal">Not just a clothing brand. <span>A culture.</span></p>
      </section>
    </main>
  );
}
