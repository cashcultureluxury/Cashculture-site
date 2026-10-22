"use client";

import Image from "next/image";
import { useState } from "react";
import WaitlistForm from "./WaitlistForm";

type Media =
  | { type: "image"; src: string }
  | { type: "video"; src: string; poster: string };

// Real worn photo first, then the lookbook video, then the design references.
const MEDIA: Media[] = [
  { type: "image", src: "/images/sweatsuit-1.webp" },
  { type: "video", src: "/images/sweatsuit-video.mp4", poster: "/images/sweatsuit-video-poster.webp" },
  { type: "image", src: "/images/sweatsuit-2.webp" },
  { type: "image", src: "/images/sweatsuit-3.webp" },
];

const DETAILS = [
  "Cropped boxy-fit zip hoodie with matching sweatpants",
  "SZA photo patches with raw-edge stitching",
  "Rhinestone CULTURE detailing down the leg",
  "Limited designer run, extremely rare",
];

// SZA Sweat Suit is sold out: media gallery (photos + lookbook clip) plus a
// restock waitlist. Mirrors the tapestry block.
export default function FeaturedSweatsuit() {
  const [idx, setIdx] = useState(0);
  const current = MEDIA[idx];

  return (
    <div className="featured">
      <div className="featured-imgs">
        {current.type === "video" ? (
          <video
            key={current.src}
            className="main-img main-video"
            src={current.src}
            poster={current.poster}
            controls
            playsInline
            preload="metadata"
          />
        ) : (
          <Image src={current.src} alt="CC SZA Sweat Suit" className="main-img" width={800} height={1000} sizes="(max-width: 1000px) 100vw, 50vw" />
        )}
        <div className="thumb-strip">
          {MEDIA.map((m, i) => (
            <span className="thumb-wrap" key={i}>
              <Image
                width={60}
                height={80}
                src={m.type === "video" ? m.poster : m.src}
                className={`thumb${i === idx ? " active" : ""}`}
                onClick={() => setIdx(i)}
                alt={m.type === "video" ? "SZA sweat suit lookbook clip" : "SZA sweat suit view"}
              />
              {m.type === "video" && <span className="thumb-play" aria-hidden="true">▶</span>}
            </span>
          ))}
        </div>
      </div>
      <div className="featured-content">
        <p className="feat-tag">Cash Culture Designer, Sold Out, Restock Coming</p>
        <h2 className="feat-title">SZA<br />SWEAT SUIT</h2>
        <p className="feat-price" style={{ color: "var(--muted)" }}>Sold Out, Notify Me</p>
        <p className="feat-desc">The SZA Sweat Suit is a Cash Culture statement set: a cropped boxy-fit zip hoodie and matching sweatpants covered in SZA photo patches, raw-edge stitching, and rhinestone CULTURE detailing. A limited designer drop, built for those who run the culture.</p>
        <div className="feat-details">
          {DETAILS.map((d) => (
            <div className="feat-detail" key={d}>{d}</div>
          ))}
        </div>
        <div className="size-row">
          <p className="size-label">Join Restock Waitlist</p>
          <WaitlistForm source="sweatsuit-waitlist" />
        </div>
      </div>
    </div>
  );
}
