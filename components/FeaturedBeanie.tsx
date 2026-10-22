"use client";

import { useState } from "react";

// Base beanie colors. `border` softens light swatches against the dark UI.
const BASES: { name: string; hex: string; border?: boolean }[] = [
  { name: "Black", hex: "#1a1a1a" },
  { name: "White", hex: "#f5f5f5", border: true },
];

// Accent / embroidery colorways.
const ACCENTS = [
  { name: "Purple", hex: "#6b21a8" },
  { name: "Yellow", hex: "#eab308" },
  { name: "Red", hex: "#b91c1c" },
  { name: "Green", hex: "#15803d" },
] as const;


const DETAILS = [
  "Smooth silk-lined interior",
  "Embroidered Cash Culture mark in your accent color",
  "White or Black base beanie",
  "Purple, Yellow, Red, or Green accents",
  "One size, snug ribbed fit",
  "Limited production run",
];

// Expected upload path, e.g. /images/beanie-white-purple.webp.
// Until those land, fall back to an existing shot for the chosen base so
// the page never shows a broken image.
const slug = (s: string) => s.toLowerCase();
const variantImage = (base: string, accent: string) =>
  `/images/beanie-${slug(base)}-${slug(accent)}.webp`;
const fallbackImage = (base: string) =>
  base === "White" ? "/images/beanie-life-8.webp" : "/images/beanie-black-green.webp";

// Real product photos per colorway. First entry is the hero shot; the rest
// are alternate angles shown as thumbnails. Combos without photos fall back
// to the conventional path (and onError fallback) below.
const VARIANT_PHOTOS: Record<string, string[]> = {
  "Black|Green": [
    "/images/beanie-black-green.webp",
    "/images/beanie-life-2.webp",
    "/images/beanie-life-4.webp",
    "/images/beanie-life-7.webp",
  ],
  "Black|Yellow": ["/images/beanie-black-yellow.webp"],
  "Black|Purple": ["/images/beanie-black-purple.webp"],
  "Black|Red": [
    "/images/beanie-black-red.webp",
    "/images/beanie-life-6.webp",
  ],
  "White|Green": [
    "/images/beanie-white-green-pool.webp",
    "/images/beanie-life-8.webp",
    "/images/beanie-life-4.webp",
  ],
  "White|Purple": [
    "/images/beanie-white-purple-pool.webp",
  ],
};
const galleryFor = (base: string, accent: string) =>
  VARIANT_PHOTOS[`${base}|${accent}`] ?? [variantImage(base, accent)];

export default function FeaturedBeanie() {
  const [base, setBase] = useState<string>(BASES[0].name);
  const [accent, setAccent] = useState<string>("Green");
  const [imgIdx, setImgIdx] = useState(0);

  const gallery = galleryFor(base, accent);
  const idx = Math.min(imgIdx, gallery.length - 1);
  const img = gallery[idx];
  const colorLabel = `${base} / ${accent}`;

  // Reset to the hero shot whenever the colorway changes.
  const pickBase = (name: string) => { setBase(name); setImgIdx(0); };
  const pickAccent = (name: string) => { setAccent(name); setImgIdx(0); };

  const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    const fb = fallbackImage(base);
    if (el.src.indexOf(fb) === -1) el.src = fb;
  };

  return (
    <div className="featured">
      <div className="featured-imgs">
        <img
          key={img}
          src={img}
          alt={`CC Silk Beanie, ${colorLabel}`}
          className="main-img"
          onError={onImgError}
        />
        {gallery.length > 1 && (
          <div className="thumb-strip">
            {gallery.map((g, i) => (
              <img
                key={g}
                src={g}
                className={`thumb${i === idx ? " active" : ""}`}
                onClick={() => setImgIdx(i)}
                alt={`CC Silk Beanie, ${colorLabel}, view ${i + 1}`}
                onError={onImgError}
              />
            ))}
          </div>
        )}
      </div>
      <div className="featured-content">
        <p className="feat-tag">Cash Culture Luxury, Limited Collection</p>
        <h2 className="feat-title">CC SILK<br />BEANIE</h2>
        <p className="feat-price">$30.00</p>
        <p className="feat-desc">Silk-lined warmth with an embroidered Cash Culture mark. Choose a White or Black base, then make it yours with a Purple, Yellow, Red, or Green accent. Small runs only.</p>
        <div className="feat-details">
          {DETAILS.map((d) => (
            <div className="feat-detail" key={d}>{d}</div>
          ))}
        </div>
        <div className="size-row">
          <p className="size-label">Base: <span className="color-name">{base}</span></p>
          <div className="color-swatches">
            {BASES.map((b) => (
              <button
                key={b.name}
                type="button"
                className={`color-swatch${b.name === base ? " active" : ""}`}
                style={{ background: b.hex, ...(b.border ? { borderColor: "rgba(0,0,0,0.25)" } : {}) }}
                onClick={() => pickBase(b.name)}
                aria-label={`${b.name} base`}
                aria-pressed={b.name === base}
                title={b.name}
              />
            ))}
          </div>
        </div>
        <div className="size-row">
          <p className="size-label">Accent: <span className="color-name">{accent}</span></p>
          <div className="color-swatches">
            {ACCENTS.map((a) => (
              <button
                key={a.name}
                type="button"
                className={`color-swatch${a.name === accent ? " active" : ""}`}
                style={{ background: a.hex }}
                onClick={() => pickAccent(a.name)}
                aria-label={`${a.name} accent`}
                aria-pressed={a.name === accent}
                title={a.name}
              />
            ))}
          </div>
        </div>
        <div className="btn-row">
          <a className="btn-gold" href="https://www.instagram.com/cashcultureluxury" target="_blank" rel="noopener noreferrer">DM to Order</a>
          <button className="btn-outline" type="button">Save to Wishlist</button>
        </div>
      </div>
    </div>
  );
}
