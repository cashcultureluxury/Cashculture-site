"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import type { EssentialsItem } from "@/data/essentials";

const STARS = "★★★★★";

const DEFAULT_SIZES = ["S", "M", "L", "XL", "2XL"];

export default function EssentialsCard({ id, image, name, price, reviews, badge, sizes = DEFAULT_SIZES, colors }: EssentialsItem) {
  const { add } = useCart();
  const hasSizes = sizes.length > 0;
  const hasColors = !!colors && colors.length > 0;
  const [size, setSize] = useState<string | null>(hasSizes ? null : "");
  const [color, setColor] = useState(hasColors ? colors![0] : null);

  const shownImage = color?.image ?? image;

  const addToCart = () => {
    if (hasSizes && !size) return; // size required so the Shopify variant resolves
    add({ id, name, price, image: shownImage, size: size || undefined, color: color?.name });
  };

  return (
    <div className="product-card ess-card">
      <Link href={`/essentials/${id}`} className="product-img" aria-label={`View ${name}`}>
        <img src={shownImage} alt={color ? `${name} - ${color.name}` : name} loading="lazy" />
        {badge && <span className="product-badge">{badge}</span>}
      </Link>
      <div className="product-info">
        <Link href={`/essentials/${id}`} className="product-name-link"><p className="product-name">{name}</p></Link>
        <p className="product-price">${price.toFixed(2)}</p>
        {hasColors && (
          <div className="ess-colors" role="group" aria-label={`Color for ${name}`}>
            {colors!.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`ess-swatch${c.name === color?.name ? " active" : ""}`}
                style={{ background: c.hex }}
                aria-pressed={c.name === color?.name}
                aria-label={c.name}
                title={c.name}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        )}
        {hasSizes && (
          <div className="ess-sizes" role="group" aria-label={`Size for ${name}`}>
            {sizes.map((s) => (
              <button
                key={s}
                type="button"
                className={`ess-size${s === size ? " active" : ""}`}
                aria-pressed={s === size}
                onClick={() => setSize(s)}
              >
                {s}
              </button>
            ))}
          </div>
        )}
        <button
          type="button"
          className="ess-add"
          onClick={addToCart}
          disabled={hasSizes && !size}
        >
          {hasSizes && !size ? "Select a Size" : "Add to Cart"}
        </button>
        <div className="stars"><span>{STARS}</span><span className="reviews">({reviews})</span></div>
      </div>
    </div>
  );
}
