import Image from "next/image";
import "../styles/family.css";
import type { Metadata } from "next";
import Link from "next/link";
import FamilyForm from "@/components/FamilyForm";
import CodeSection from "@/components/CodeSection";
import ScrollReveal from "@/components/ScrollReveal";
import { FAMILY } from "@/data/family";
import { FAMILY_ROLES, FAMILY_SELECTION, FAMILY_TRAITS } from "@/data/brand";

// Hero photograph. Swap for a dedicated Family shoot image when one exists.
const HERO_IMAGE = "/images/ambassador-nick.webp";

export const metadata: Metadata = {
  title: "The Family",
  description:
    "The Cash Culture Family: entrepreneurs, artists, athletes, coaches, and creators who live the Code. Different people, same mindset. Join the Family.",
  alternates: { canonical: "/family" },
};

// What being part of the Family comes with. Internally this is still the
// ambassador program (codes, commission), so the terms stay concrete.
const PERKS = [
  { title: "Your Family Code", desc: "A personal 15% code for the people you bring in. No expiration." },
  { title: "Earn With Your Code", desc: "Commission on every order placed with your code, tracked and paid out by the team." },
  { title: "First Access", desc: "First look at limited Luxury drops before they're announced." },
  { title: "Pieces To Wear", desc: "Featured members receive pieces to wear, style, and create with." },
  { title: "Real Connections", desc: "Entrepreneurs, artists, and creators building alongside you." },
  { title: "Your Story, Told", desc: "We spotlight what you're building across Cash Culture channels." },
];

const STEPS = [
  "Tell us who you are and what you're building.",
  "We read every application personally.",
  "If it's a fit, we reach out and welcome you in.",
  "Represent the culture. Keep building.",
];

export default function FamilyPage() {
  return (
    <main className="cc-family">
      <ScrollReveal selector=".cc-family .reveal, .cc-family .member, .cc-family .cc-code-row" />

      {/* HERO: split, type left, photograph right */}
      <section className="fam-hero">
        <div className="fam-hero-content">
          <p className="rule-kicker">The Family</p>
          <h1 className="fam-title">Different people.<br />Same mindset.</h1>
          <p className="fam-subtitle">Not paid to wear a shirt. Building something.</p>
          <p className="fam-lede">
            Our Family is entrepreneurs, artists, athletes, coaches, and creators who already live the Cash Culture Code.
            We don&apos;t pick people for their follower count. We pick people who make you think,
            &ldquo;that person is building something.&rdquo; If that&apos;s you, this is your invitation.
          </p>
          <div className="fam-hero-links">
            <a href="#family" className="arrow-link">Meet The Family <span aria-hidden="true">&rarr;</span></a>
            <a href="#apply" className="arrow-link arrow-link-muted">Join The Family <span aria-hidden="true">&rarr;</span></a>
          </div>
        </div>
        <div className="fam-hero-photo">
          <Image src={HERO_IMAGE} alt="A member of the Cash Culture Family" fill sizes="(max-width: 1000px) 100vw, 50vw" preload />
        </div>
      </section>

      {/* ROSTER */}
      <section className="fam-block" id="family">
        <div className="fam-head-row">
          <div>
            <p className="rule-kicker rule-kicker-both reveal">The People</p>
            <h2 className="fam-h2 reveal">Meet The Family</h2>
          </div>
          <div className="fam-head-aside reveal">
            <p className="aside-caps">Real people. Different paths. Same mindset.</p>
            <p>Entrepreneurs, artists, athletes, creators, and more. Each one is building something bigger than themselves.</p>
          </div>
        </div>
        <ul className="roster">
          {FAMILY.map((m) => (
            <li className="member" key={m.name}>
              <div className="member-img"><Image src={m.image} alt={m.name} width={800} height={1000} sizes="(max-width: 1000px) 100vw, 33vw" /></div>
              <div className="member-body">
                <h3 className="member-name">{m.name}</h3>
                {(m.niche || m.location) && (
                  <p className="member-meta">{[m.niche, m.location].filter(Boolean).join(" · ")}</p>
                )}
                <span className="member-rule" aria-hidden="true" />
                {m.building && (
                  <p className="member-building"><span>Building</span>{m.building}</p>
                )}
                {m.quote && <blockquote className="member-quote">&ldquo;{m.quote}&rdquo;</blockquote>}
                {m.value && <p className="member-value">Code value <span>{m.value}</span></p>}
                <div className="member-foot">
                  {(m.instagram || m.tiktok) && (
                    <p className="member-socials">
                      {m.instagram && <a href={m.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>}
                      {m.instagram && m.tiktok && <span aria-hidden="true"> / </span>}
                      {m.tiktok && <a href={m.tiktok} target="_blank" rel="noopener noreferrer">TikTok</a>}
                    </p>
                  )}
                  {m.code && <p className="member-code">Code <span>{m.code}</span></p>}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* THE CODE: what connects them */}
      <CodeSection id="code" />

      {/* PHILOSOPHY */}
      <section className="fam-block" id="philosophy">
        <div className="fam-split">
          <div>
            <p className="rule-kicker reveal">The Philosophy</p>
            <h2 className="fam-h2 reveal">What connects them <em>is the way they live.</em></h2>
            <div className="fam-prose reveal">
              <p>They don&apos;t need the same career. They don&apos;t need the same style. They don&apos;t need the same background.</p>
              <p>
                A Family member might run a company, coach a team, produce records, or be halfway through school with a plan.
                What they share is a standard, the <Link href="/culture#code">Cash Culture Code</Link>, and it shows in how they move.
              </p>
            </div>
            <blockquote className="fam-pull reveal">{FAMILY_SELECTION}</blockquote>
          </div>
          <div className="fam-lists">
            <div className="reveal">
              <p className="fam-list-title">They might be</p>
              <ul className="fam-tags">{FAMILY_ROLES.map((r) => <li key={r}>{r}</li>)}</ul>
            </div>
            <div className="reveal">
              <p className="fam-list-title">What connects them</p>
              <ul className="fam-traits">{FAMILY_TRAITS.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT ARE YOU BUILDING */}
      <section className="fam-building">
        <p className="rule-kicker reveal">Your Turn</p>
        <h2 className="fam-building-title reveal">WHAT ARE YOU<br />BUILDING?</h2>
        <p className="reveal">
          Cash Culture isn&apos;t defined by one career, one city, or one background.
          It&apos;s defined by the people who refuse to stop building.
        </p>
        <a href="#apply" className="btn-gold reveal">Join The Family</a>
      </section>

      {/* BEING PART OF THE FAMILY */}
      <section className="fam-block" id="membership">
        <div className="fam-head">
          <p className="rule-kicker reveal">Being Part Of It</p>
          <h2 className="fam-h2 reveal">What The Family Shares</h2>
        </div>
        <div className="perks">
          {PERKS.map((p) => (
            <div className="perk reveal" key={p.title}>
              <p className="perk-title">{p.title}</p>
              <p className="perk-desc">{p.desc}</p>
            </div>
          ))}
        </div>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li className="step reveal" key={s}>
              <span className="step-num">{String(i + 1).padStart(2, "0")}</span>
              <p>{s}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* APPLY */}
      <section className="fam-block fam-block-alt" id="apply">
        <div className="fam-head">
          <p className="rule-kicker">The Application</p>
          <h2 className="fam-h2">Join The Family</h2>
          <p className="fam-head-sub">Tell us who you are, and most of all, what you&apos;re building.</p>
        </div>
        <div className="apply-wrap">
          <FamilyForm />
        </div>
      </section>
    </main>
  );
}
