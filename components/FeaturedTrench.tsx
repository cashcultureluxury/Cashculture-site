"use client";

import { useState } from "react";
import { SHOPIFY_STORE_URL } from "@/data/shopify";

// One image per colorway. Add the matching files to public/images/.
const COLORS = [
  { name: "Grey", hex: "#9a9a9a", image: "/images/trench-grey.webp" },
  { name: "Camel", hex: "#c19a6b", image: "/images/trench-camel.webp" },
  { name: "Black", hex: "#1c1c1c", image: "/images/trench-black.webp" },
];
const SIZES = ["S", "M", "L", "XL", "XXL"];

const DETAILS = [
  "Premium wool-blend outer shell",
  "Quilted interior lining for warmth",
  "Red accent stitching throughout",
  "Embroidered Luxury Cash Culture patch",
  "Available in Grey, Camel, and Black",
  "Limited production run",
];

export default function FeaturedTrench() {
  const [color, setColor] = useState(COLORS[0].name);
  const active = COLORS.find((c) => c.name === color) ?? COLORS[0];
  const [size, setSize] = useState("M");
  const [ordering, setOrdering] = useState(false);

  // Order Now -> resolve the chosen color/size to its Shopify variant and jump
  // straight to Shopify checkout (customer pays + enters shipping; you fulfill
  // and ship by hand). Falls back to the store home if the product isn't set up.
  async function orderNow() {
    setOrdering(true);
    try {
      const res = await fetch("/api/shopify-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [{ id: "cc-trench", size, color, qty: 1 }] }),
      });
      const data = (await res.json().catch(() => ({}))) as { url?: string };
      window.location.href = data.url || SHOPIFY_STORE_URL;
    } catch {
      window.location.href = SHOPIFY_STORE_URL;
    }
  }

  return (
    <div className="featured">
      <div className="featured-imgs">
        <img src={active.image} alt={`CC Luxury Trench Coat, ${active.name}`} className="main-img" />
        <div className="thumb-strip">
          {COLORS.map((c) => (
            <img
              key={c.name}
              src={c.image}
              className={`thumb${c.name === color ? " active" : ""}`}
              onClick={() => setColor(c.name)}
              alt={`Trench coat, ${c.name}`}
            />
          ))}
        </div>
      </div>
      <div className="featured-content">
        <p className="feat-tag">Cash Culture Luxury, Limited Collection</p>
        <h2 className="feat-title">CC LUXURY<br />TRENCH COAT</h2>
        <p className="feat-price">$249.00</p>
        <p className="feat-desc">A statement piece built for those who move with purpose. Premium wool-blend construction with a quilted interior lining, red accent stitching, and an embroidered Cash Culture Luxury patch. Every detail tells the story.</p>
        <div className="feat-details">
          {DETAILS.map((d) => (
            <div className="feat-detail" key={d}>{d}</div>
          ))}
        </div>
        <div className="size-row">
          <p className="size-label">Color: <span className="color-name">{active.name}</span></p>
          <div className="color-swatches">
            {COLORS.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`color-swatch${c.name === color ? " active" : ""}`}
                style={{ background: c.hex }}
                onClick={() => setColor(c.name)}
                aria-label={c.name}
                aria-pressed={c.name === color}
                title={c.name}
              />
            ))}
          </div>
        </div>
        <div className="size-row">
          <p className="size-label">Select Size</p>
          <div className="sizes">
            {SIZES.map((s) => (
              <button key={s} className={`size-btn${s === size ? " active" : ""}`} onClick={() => setSize(s)} type="button">{s}</button>
            ))}
          </div>
        </div>
        <div className="btn-row">
          <button className="btn-gold" type="button" onClick={orderNow} disabled={ordering}>
            {ordering ? "Loading…" : "Order Now"}
          </button>
          <a className="btn-outline" href="https://www.instagram.com/cashcultureluxury" target="_blank" rel="noopener noreferrer">Questions? DM Us</a>
        </div>
      </div>
    </div>
  );
}
