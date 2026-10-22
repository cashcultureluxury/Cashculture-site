import "../styles/story.css";
import type { Metadata } from "next";
import Link from "next/link";
import CodeSection from "@/components/CodeSection";
import { CORE_IDEA, HUSTLER_IS, HUSTLER_IS_NOT, HUSTLER_PATHS, HUSTLER_ROOMS, HUSTLER_TRAITS, MANTRA } from "@/data/brand";

export const metadata: Metadata = {
  title: "The Culture",
  description:
    "The Cash Culture philosophy: the Modern Hustler, the eleven values of the Cash Culture Code, and Never Count Me Out. The culture of people who build.",
  alternates: { canonical: "/culture" },
};

const STORY_TYPES = [
  { label: "The Entrepreneur", title: "Failed First", desc: "Lost the first one. Learned from it. Built the next one better." },
  { label: "The Artist", title: "Overlooked", desc: "Passed over, left off the lineup, told to wait. Kept creating anyway." },
  { label: "The Athlete", title: "Not Recruited", desc: "No offers, no spotlight. Put the work in where nobody was watching." },
  { label: "The Student", title: "Building Early", desc: "Classes by day, a company by night. Didn't wait for permission." },
  { label: "The Parent", title: "Building For Family", desc: "Running a business and a household. Doing both, every day." },
  { label: "The Creator", title: "Starting From Zero", desc: "No followers, no budget, no connections. Just a camera and a plan." },
];

const STORY_MAILTO =
  "mailto:cashculturebrand@gmail.com?subject=Never%20Count%20Me%20Out%20%E2%80%94%20My%20Story";

export default function CulturePage() {
  return (
    <main className="cc-story">
      {/* HERO */}
      <section className="story-hero">
        <div className="story-hero-bg" style={{ backgroundImage: "url('/images/home-img-3.webp')" }} />
        <div className="story-hero-content">
          <p className="rule-kicker">The Culture</p>
          <h1 className="story-title">THE CULTURE<br />OF BUILDING.</h1>
          <p className="story-subtitle">Success is bigger than money.</p>
          <p className="story-lede">{CORE_IDEA} The clothing is the uniform. The Code is the standard. The people are what make it real.</p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="block" id="philosophy">
        <div className="split">
          <div>
            <p className="rule-kicker">Our Philosophy</p>
            <h2 className="block-title">Money can be a result of the work. <em>It isn&apos;t the identity.</em></h2>
            <div className="prose">
              <p>
                Cash Culture celebrates the journey of becoming. It represents people who have been doubted, rejected, underestimated,
                or forced to start over, and kept building anyway.
              </p>
              <p>
                The goal was never just to <strong>look</strong>{" "}successful. It&apos;s to become someone capable of creating something that matters.
                The common denominator isn&apos;t income. It&apos;s mindset.
              </p>
            </div>
          </div>
          <ul className="mantra" aria-label="The Cash Culture mantra">
            {MANTRA.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
      </section>

      {/* MODERN HUSTLER */}
      <section className="block block-alt" id="modern-hustler">
        <div className="split">
          <div>
            <p className="rule-kicker">The Modern Hustler</p>
            <h2 className="block-title">Different paths. <em>Same drive.</em></h2>
            <div className="prose">
              <p>
                Cash Culture isn&apos;t about the stereotypical image of a hustler. No fake wealth, no flexing, no glorifying the wrong things.
                The Modern Hustler can be successful without disrespecting anyone, and doesn&apos;t pretend to have made it.
              </p>
              <p>
                What matters isn&apos;t what they do. <strong>It&apos;s how they move.</strong>
              </p>
            </div>
            <ul className="trait-line" aria-label="The Modern Hustler is">
              {HUSTLER_TRAITS.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>
          <ol className="path-list" aria-label="The Modern Hustler can be">
            {HUSTLER_PATHS.map((p, i) => (
              <li key={p}><span>{String(i + 1).padStart(2, "0")}</span>{p}</li>
            ))}
          </ol>
        </div>

        <div className="rooms">
          <div className="rooms-head">
            <p className="list-title">One person. Every room.</p>
            <p className="rooms-lede">The same person should be able to walk into all of these, and belong in each one. That versatility is part of Cash Culture.</p>
          </div>
          <ul className="rooms-grid">
            {HUSTLER_ROOMS.map((r) => (
              <li key={r.room}>
                <p className="room-name">{r.room}</p>
                <p className="room-wear">{r.wear}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="split split-lists">
          <div className="list-group">
            <p className="list-title">What they care about</p>
            <ul className="tag-list">
              {HUSTLER_IS.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>
          <div className="list-group">
            <p className="list-title">What the culture leaves out</p>
            <ul className="tag-list muted">
              {HUSTLER_IS_NOT.map((h) => <li key={h}>{h}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* THE CODE: eleven values, one standard */}
      <CodeSection id="code" />

      {/* NEVER COUNT ME OUT */}
      <section className="block block-alt" id="never-count-me-out">
        <div className="block-head">
          <p className="rule-kicker">The Campaign</p>
          <p className="pull">NEVER COUNT<br /><span>ME OUT.</span></p>
          <div className="prose">
            <p>
              It started as one person&apos;s answer to being told he wasn&apos;t good enough. It became a mindset for anyone who&apos;s been doubted.
              Carrying the spirit of <strong>A Hustler&apos;s Talk</strong>, honest conversations about struggles, wins, failures, and lessons,
              Never Count Me Out tells the stories of people who kept building.
            </p>
          </div>
        </div>
        <div className="cards">
          {STORY_TYPES.map((s) => (
            <div className="card" key={s.label}>
              <p className="card-label">{s.label}</p>
              <p className="card-title">{s.title}</p>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="callout">
          <p className="callout-title">Different Stories. Same Mindset.</p>
          <p>
            Been doubted, overlooked, or had to start over? We want to hear how you kept going.{" "}
            <a href={STORY_MAILTO} style={{ color: "var(--gold)" }}>Tell us your story &#x2192;</a>
          </p>
        </div>
      </section>

      {/* COMMUNITY */}
      <section className="block" id="community">
        <div className="block-head">
          <p className="rule-kicker">Community</p>
          <h2 className="block-title">You don&apos;t have to build alone.</h2>
          <div className="prose">
            <p>
              The goal isn&apos;t for you to say, &ldquo;I bought a Cash Culture shirt.&rdquo; It&apos;s for you to say,
              &ldquo;<strong>I&apos;m part of Cash Culture.</strong>&rdquo; Entrepreneurs, artists, athletes, creators, and professionals,
              connecting, collaborating, and pushing each other forward.
            </p>
          </div>
        </div>
      </section>
      <div className="image-band">
        <img src="/images/community-10.webp" alt="Friends in Cash Culture" loading="lazy" />
        <img src="/images/community-8.webp" alt="A family in Cash Culture" loading="lazy" />
        <img src="/images/community-7.webp" alt="Cash Culture on the waterfront" loading="lazy" />
        <img src="/images/community-9.webp" alt="The team in Cash Culture" loading="lazy" />
      </div>

      {/* CTA */}
      <section className="cta">
        <p className="rule-kicker">Join The Culture</p>
        <h2 className="cta-title">FOR THE ONES<br />WHO BUILD.</h2>
        <p>Meet the people who carry the Code, or join the list for first word on drops, stories, and events.</p>
        <div className="cta-btns">
          <Link href="/family" className="btn-gold">Meet The Family</Link>
          <Link href="#contact" className="btn-outline">Join The List</Link>
        </div>
      </section>
    </main>
  );
}
