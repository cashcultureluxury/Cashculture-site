"use client";

import Image from "next/image";
import { useState } from "react";
import WaitlistForm from "./WaitlistForm";

const IMAGES = [
  "/images/tapestry-1.webp",
  "/images/tapestry-3.webp",
  "/images/tapestry-4.webp",
  "/images/tapestry-5.webp",
];

const DETAILS = [
  "Full woven tapestry construction, not a print",
  "Oversized luxury fit",
  "Limited designer run, extremely rare",
  "Cash Culture branded hardware",
];

// Tapestry hoodie is sold out: image gallery plus a restock waitlist.
// Layout mirrors the trench block (image on the right via row-reverse).
export default function FeaturedTapestry() {
  const [main, setMain] = useState(IMAGES[0]);

  return (
    <div className="featured" style={{ direction: "rtl" }}>
      <div className="featured-imgs" style={{ direction: "ltr" }}>
        <Image src={main} alt="CC Big Ben Tapestry Hoodie" className="main-img" width={800} height={1000} sizes="(max-width: 1000px) 100vw, 50vw" />
        <div className="thumb-strip">
          {IMAGES.map((src) => (
            <Image
              key={src}
              width={60}
              height={80}
              src={src}
              className={`thumb${src === main ? " active" : ""}`}
              onClick={() => setMain(src)}
              alt="Tapestry hoodie view"
            />
          ))}
        </div>
      </div>
      <div className="featured-content" style={{ direction: "ltr" }}>
        <p className="feat-tag">Cash Culture Designer, Sold Out, Restock Coming</p>
        <h2 className="feat-title">BIG BEN<br />TAPESTRY HOODIE</h2>
        <p className="feat-price" style={{ color: "var(--muted)" }}>Sold Out, Notify Me</p>
        <p className="feat-desc">The Big Ben Tapestry Hoodie is a woven masterpiece. Each hoodie features a full tapestry construction, not a print, but woven fabric, depicting the iconic Big Ben in a rich, intricate pattern. This is Cash Culture&apos;s most exclusive piece to date.</p>
        <div className="feat-details">
          {DETAILS.map((d) => (
            <div className="feat-detail" key={d}>{d}</div>
          ))}
        </div>
        <div className="size-row">
          <p className="size-label">Join Restock Waitlist</p>
          <WaitlistForm source="tapestry-waitlist" />
        </div>
      </div>
    </div>
  );
}
