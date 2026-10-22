import "../styles/story.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Why Cash Culture exists, where it came from, and what it's becoming. Built through adversity, driven by purpose, made for the ones who build.",
  alternates: { canonical: "/about" },
};

// The three layers of the brand. The founder starts it; the culture carries it.
const LAYERS = [
  {
    label: "The Founder",
    title: "Where It Started",
    desc: "One person's story: basketball, family, music, photography, business, failure, and getting back up. The origin, not the whole brand.",
  },
  {
    label: "The Culture",
    title: "What It Stands For",
    desc: "The philosophy and the people. The Cash Culture Code, the Modern Hustler, and everyone building something with their life.",
  },
  {
    label: "The Product",
    title: "What You Wear",
    desc: "Cash Culture Luxury and Cash Culture Essentials. The physical expression of the culture. The uniform.",
  },
];

const BECOMING = ["Fashion", "Music", "Entrepreneurship", "Sports", "Creators", "Community", "Events", "Media"];

export default function AboutPage() {
  return (
    <main className="cc-story">
      {/* HERO */}
      <section className="story-hero">
        <div className="story-hero-bg" style={{ backgroundImage: "url('/images/luxury-img-16.webp')" }} />
        <div className="story-hero-content">
          <p className="rule-kicker">About Cash Culture</p>
          <h1 className="story-title">BUILT THROUGH<br />ADVERSITY.</h1>
          <p className="story-subtitle">Driven by purpose. Built to last.</p>
          <p className="story-lede">
            Cash Culture exists for people who are actively building something: themselves, their families, their futures.
            It started with one story. It&apos;s growing into a culture.
          </p>
        </div>
      </section>

      {/* ORIGIN */}
      <section className="block" id="origin">
        <div className="split">
          <div>
            <p className="rule-kicker">The Origin</p>
            <h2 className="block-title">It started on a basketball court, <em>and with a mother&apos;s sacrifice.</em></h2>
            <div className="prose">
              <p>
                Our founder, Michael Austin, grew up shaped by two things: his mother, who sacrificed financially to keep him in training,
                and basketball, where mentors taught him discipline, competition, responsibility, and how to handle adversity.
              </p>
              <p>
                Then came the moment every builder knows. Not enough playing time. Told he wasn&apos;t good enough.
                He used it. He trained harder, joined a rival team, and met his old one in a championship.
                He scored more than 30 points, and told his former coach one thing:
              </p>
            </div>
          </div>
          <div>
            <p className="pull">&ldquo;NEVER COUNT<br /><span>ME OUT.&rdquo;</span></p>
            <div className="prose">
              <p>
                COVID took his senior season and the opportunities that came with it. He kept going: college basketball,
                then entrepreneurship, music, photography, content, marketing, and fashion.
              </p>
              <p>
                The lesson was never basketball itself. It was what basketball taught: <strong>discipline, dedication, taking criticism,
                getting back up, and working when nobody believes in you.</strong>{" "}That mentality became Cash Culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* LAYERS */}
      <section className="block block-alt" id="bigger-than-the-founder">
        <div className="block-head">
          <p className="rule-kicker">Bigger Than One Person</p>
          <h2 className="block-title">The founder starts the movement. <em>The community gives it life.</em></h2>
          <div className="prose">
            <p>
              Cash Culture isn&apos;t about one person. It&apos;s built so that anyone who lives the Code can look at it and say,
              &ldquo;this is for people like me.&rdquo;
            </p>
          </div>
        </div>
        <div className="cards">
          {LAYERS.map((l) => (
            <div className="card" key={l.label}>
              <p className="card-label">{l.label}</p>
              <p className="card-title">{l.title}</p>
              <p>{l.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BECOMING */}
      <section className="block" id="becoming">
        <div className="split">
          <div>
            <p className="rule-kicker">What It&apos;s Becoming</p>
            <h2 className="block-title">The clothing is the entry point. <em>The culture is the destination.</em></h2>
            <div className="prose">
              <p>
                Cash Culture is growing into a world of its own, a home for people who want to look better, move better, think better,
                work harder, treat people better, and build more.
              </p>
            </div>
          </div>
          <div className="list-group">
            <p className="list-title">The world we&apos;re building</p>
            <ul className="tag-list">
              {BECOMING.map((b) => <li key={b}>{b}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <p className="rule-kicker">Your Turn</p>
        <h2 className="cta-title">WHAT ARE<br />YOU BUILDING?</h2>
        <p>Read the Code we live by, or find the piece that fits the life you&apos;re building.</p>
        <div className="cta-btns">
          <Link href="/culture" className="btn-gold">Read The Code</Link>
          <Link href="/luxury" className="btn-outline">Shop Luxury</Link>
          <Link href="/essentials" className="btn-outline">Shop Essentials</Link>
        </div>
      </section>
    </main>
  );
}
