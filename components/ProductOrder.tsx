"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { shopifyUrl } from "@/data/shopify";
import type { EssentialsItem } from "@/data/essentials";

const DEFAULT_SIZES = ["S", "M", "L", "XL", "2XL"];

// Full product / order page body for an Essentials item. Reuses the .cc-lux
// .featured layout. Lets the customer pick a colorway (swaps the image) and
// size, choose a quantity, add to cart, or buy now (straight to Shopify).
export default function ProductOrder({ product }: { product: EssentialsItem }) {
  const { id, name, price, image, category, sizes = DEFAULT_SIZES, colors, gallery } = product;

  const { add } = useCart();
  // "Buy Now" jumps straight to this product on Shopify; "Add to Cart" collects
  // items on-site and checks the whole cart out on Shopify (see /api/shopify-cart).
  const buyUrl = shopifyUrl(id);

  const hasSizes = sizes.length > 0;
  const hasColors = !!colors && colors.length > 0;
  const [size, setSize] = useState<string | null>(hasSizes ? null : "");
  const [color, setColor] = useState(hasColors ? colors![0] : null);
  const [qty, setQty] = useState(1);
  const needsSize = hasSizes && !size;

  // The cart line always uses the selected color's front image.
  const shownImage = color?.image ?? image;
  // The currently displayed (large) image — driven by color selection and the
  // thumbnail gallery (front + back / alt views).
  const [view, setView] = useState(shownImage);
  const galleryImgs = Array.from(
    new Set([image, ...(colors?.map((c) => c.image) ?? []), ...(gallery ?? [])])
  );
  const pickColor = (c: NonNullable<typeof color>) => {
    setColor(c);
    setView(c.image);
  };

  const addToCart = () => {
    if (needsSize) return;
    add({ id, name, price, image: shownImage, size: size || undefined, color: color?.name, qty });
  };

  return (
    <div className="featured">
      <div className="featured-imgs">
        <Image src={view} alt={color ? `${name} - ${color.name}` : name} className="main-img" width={800} height={1000} sizes="(max-width: 1000px) 100vw, 50vw" />
        {galleryImgs.length > 1 && (
          <div className="thumb-strip">
            {galleryImgs.map((img) => (
              <Image
                key={img}
                width={60}
                height={80}
                src={img}
                className={`thumb${img === view ? " active" : ""}`}
                onClick={() => setView(img)}
                alt={name}
              />
            ))}
          </div>
        )}
      </div>
      <div className="featured-content">
        <p className="feat-tag">Cash Culture Essentials</p>
        <h2 className="feat-title">{name}</h2>
        <p className="feat-price">${price.toFixed(2)}</p>
        <p className="feat-desc">Premium Cash Culture {category.toLowerCase()}, made to order and shipped worldwide. Bold graphics, honest prices, no compromise on quality.</p>

        {hasColors && (
          <div className="size-row">
            <p className="size-label">Color: <span className="color-name">{color?.name}</span></p>
            <div className="color-swatches">
              {colors!.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  className={`color-swatch${c.name === color?.name ? " active" : ""}`}
                  style={{ background: c.hex }}
                  onClick={() => pickColor(c)}
                  aria-label={c.name}
                  aria-pressed={c.name === color?.name}
                  title={c.name}
                />
              ))}
            </div>
          </div>
        )}

        {hasSizes && (
          <div className="size-row">
            <p className="size-label">Select Size {needsSize && <span className="size-hint">— required</span>}</p>
            <div className="sizes">
              {sizes.map((s) => (
                <button key={s} className={`size-btn${s === size ? " active" : ""}`} onClick={() => setSize(s)} type="button">{s}</button>
              ))}
            </div>
          </div>
        )}

        <div className="size-row">
          <p className="size-label">Quantity</p>
          <div className="cart-qty order-qty">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity" type="button">&minus;</button>
            <span>{qty}</span>
            <button onClick={() => setQty((q) => Math.min(20, q + 1))} aria-label="Increase quantity" type="button">+</button>
          </div>
        </div>

        <div className="btn-row">
          <button className="btn-gold" type="button" onClick={addToCart} disabled={needsSize}>
            {needsSize ? "Select a Size" : "Add to Cart"}
          </button>
          <a
            className="btn-outline"
            href={buyUrl ?? "/essentials"}
            {...(buyUrl ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {buyUrl ? "Buy Now" : "Coming Soon"}
          </a>
        </div>
        <p className="cart-note" style={{ marginTop: 10 }}>Secure checkout on Shopify. Final size/color confirmed at checkout.</p>

        <Link href="/essentials" className="lux-back" style={{ marginTop: 22, display: "inline-block" }}>&larr; Back to Essentials</Link>
      </div>
    </div>
  );
}
