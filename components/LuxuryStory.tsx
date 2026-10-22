import Image from "next/image";
import Link from "next/link";
import type { LuxuryStory as Story } from "@/data/brand";

// The Luxury story layout: Campaign -> Story -> Design -> Materials -> Details,
// then the page's own buy block (passed as children) closes it out.
export default function LuxuryStory({ story, children }: { story: Story; children: React.ReactNode }) {
  return (
    <>
      {/* CAMPAIGN */}
      <section className="ls-campaign">
        <div className="ls-campaign-text">
          <p className="section-label">
            <Link href="/luxury" className="lux-back">Luxury</Link> / {story.label}
          </p>
          <h1 className="ls-campaign-title">{story.campaign.title}</h1>
          <p className="ls-campaign-name">{story.name}</p>
          {story.campaign.line && <p className="ls-campaign-line">{story.campaign.line}</p>}
          <a className="btn-gold" href="#buy">Shop The Piece</a>
        </div>
        <div className="ls-campaign-img">
          <Image src={story.campaign.image} alt={`${story.name} campaign`} fill sizes="(max-width: 1000px) 100vw, 50vw" preload />
        </div>
      </section>

      <div className="gold-divider" />

      {/* STORY */}
      <section className="ls-block" id="story">
        <p className="rule-kicker">The Story</p>
        <div className="ls-prose ls-prose-lead">
          {story.story.map((p) => <p key={p}>{p}</p>)}
        </div>
      </section>

      {/* DESIGN */}
      <section className="ls-block ls-split ls-alt" id="design">
        {story.design.image && (
          <div className="ls-img">
            <Image src={story.design.image} alt={`${story.name} design`} fill sizes="(max-width: 1000px) 100vw, 45vw" />
          </div>
        )}
        <div>
          <p className="rule-kicker">The Design</p>
          <div className="ls-prose"><p>{story.design.body}</p></div>
        </div>
      </section>

      {/* MATERIALS */}
      <section className="ls-block ls-split ls-split-rev" id="materials">
        <div>
          <p className="rule-kicker">The Materials</p>
          <ul className="ls-list">
            {story.materials.items.map((m) => <li key={m}>{m}</li>)}
          </ul>
        </div>
        {story.materials.image && (
          <div className="ls-img">
            <Image src={story.materials.image} alt={`${story.name} materials`} fill sizes="(max-width: 1000px) 100vw, 45vw" />
          </div>
        )}
      </section>

      {/* DETAILS */}
      <section className="ls-block ls-alt" id="details">
        <p className="rule-kicker">The Details</p>
        <ul className="ls-details">
          {story.details.map((d) => <li key={d}>{d}</li>)}
        </ul>
      </section>

      <div className="gold-divider" />

      {/* BUY */}
      <section className="section" id="buy">
        <div className="section-header">
          <p className="section-label">Own It</p>
          <h2 className="section-title">{story.name.toUpperCase()}</h2>
        </div>
      </section>
      {children}

      <div className="gold-divider" />
    </>
  );
}
