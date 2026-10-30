import "../styles/story.css";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LUXURY_STORIES, STORY_MAILTO } from "@/data/brand";
import { FAMILY } from "@/data/family";

export const metadata: Metadata = {
  title: "Stories",
  description:
    "Cash Culture Stories: the story behind each Luxury piece, the Family members building something real, and Never Count Me Out.",
  alternates: { canonical: "/stories" },
};

// Family members with their own words, shown as story cards.
const FAMILY_STORIES = FAMILY.filter((m) => m.quote).slice(0, 3);

const excerpt = (s: string, max = 180) => (s.length > max ? `${s.slice(0, s.lastIndexOf(" ", max))}…` : s);

export default function StoriesPage() {
  return (
    <main className="cc-story">
      {/* HERO */}
      <section className="story-hero">
        <div className="story-hero-bg" style={{ backgroundImage: "url('/images/community-13.webp')" }} />
        <div className="story-hero-content">
          <p className="rule-kicker">Stories</p>
          <h1 className="story-title">THE STORIES<br />BEHIND IT.</h1>
          <p className="story-subtitle">The pieces, the people, the work.</p>
          <p className="story-lede">
            Every piece has a reason it exists. Every person in the Family has a reason they keep building. This is where we tell both.
          </p>
        </div>
      </section>

      {/* PRODUCT STORIES */}
      <section className="block" id="luxury">
        <div className="block-head">
          <p className="rule-kicker">The Pieces</p>
          <h2 className="block-title">Luxury, <em>from the inside.</em></h2>
        </div>
        <div className="story-grid">
          {LUXURY_STORIES.map((s) => (
            <Link className="story-card" href={`/luxury/${s.slug}`} key={s.slug}>
              <div className="story-card-img">
                <Image src={s.campaign.image} alt={s.name} fill sizes="(max-width: 1000px) 100vw, 33vw" />
              </div>
              <p className="card-label">{s.label}</p>
              <p className="card-title">{s.name}</p>
              <p>{s.campaign.line}</p>
              <span className="story-card-more">Read the story &#x2192;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAMILY STORIES */}
      <section className="block block-alt" id="family">
        <div className="block-head">
          <p className="rule-kicker">The Family</p>
          <h2 className="block-title">Different paths. <em>Same standard.</em></h2>
        </div>
        <div className="story-grid">
          {FAMILY_STORIES.map((m) => (
            <Link className="story-card" href="/family#family" key={m.name}>
              <div className="story-card-img">
                <Image src={m.image} alt={m.name} fill sizes="(max-width: 1000px) 100vw, 33vw" />
              </div>
              {m.niche && <p className="card-label">{m.niche}</p>}
              <p className="card-title">{m.name}</p>
              <p>&ldquo;{excerpt(m.quote!)}&rdquo;</p>
              <span className="story-card-more">Meet the Family &#x2192;</span>
            </Link>
          ))}
        </div>
      </section>

      {/* NEVER COUNT ME OUT */}
      <section className="cta" id="never-count-me-out">
        <p className="rule-kicker">Never Count Me Out</p>
        <h2 className="cta-title">Your story belongs here.</h2>
        <p>Been doubted, overlooked, or had to start over? Tell us how you kept building.</p>
        <div className="cta-btns">
          <a className="btn-gold" href={STORY_MAILTO}>Tell Us Your Story</a>
          <Link className="btn-outline" href="/culture#never-count-me-out">About The Campaign</Link>
        </div>
      </section>
    </main>
  );
}
