"use client";

import Image from "next/image";

const STARS = "★★★★★";

type Color = { hex: string; title: string; border?: boolean };

type HomeProps = {
  variant: "home";
  image: string;
  name: string;
  price: string; // display string, e.g. "$30.00" or "Sold Out"
  reviews: string;
  badge?: string;
  soldOut?: boolean;
  href: string; // essentials link out to Wix
};

type LuxuryProps = {
  variant: "luxury";
  id: string;
  image: string;
  name: string;
  price: number; // numeric USD for the cart
  reviews: string;
  badge?: string;
  badgeLimited?: boolean;
  colors?: Color[];
};

type Props = HomeProps | LuxuryProps;

export default function ProductCard(props: Props) {
  if (props.variant === "home") {
    const { image, name, price, reviews, badge, soldOut, href } = props;
    const external = /^https?:\/\//.test(href);
    return (
      <a className="product-card" href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        <div className="product-img">
          <Image src={image} alt={name} width={600} height={800} sizes="(max-width: 1000px) 50vw, 25vw" />
          {badge && <span className="product-badge">{badge}</span>}
          {soldOut ? (
            <div className="out-of-stock"><span>Out of Stock</span></div>
          ) : (
            <span className="product-add" aria-hidden="true">+</span>
          )}
        </div>
        <p className="product-name">{name}</p>
        <p className="product-price" style={soldOut ? { color: "var(--muted)" } : undefined}>{price}</p>
        <div className="stars"><span className="star">{STARS}</span> <span className="reviews">({reviews})</span></div>
      </a>
    );
  }

  const { image, name, price, reviews, badge, badgeLimited, colors } = props;
  return (
    <div className="product-card">
      <div className="product-img">
        <Image src={image} alt={name} width={600} height={800} sizes="(max-width: 1000px) 50vw, 25vw" />
        <div className="product-overlay">
          <a className="overlay-btn" href="https://www.instagram.com/cashcultureluxury" target="_blank" rel="noopener noreferrer">DM to Order</a>
        </div>
      </div>
      <div className="product-info">
        <span className={`product-badge${badgeLimited ? " limited" : ""}`}>{badge}</span>
        <p className="product-name">{name}</p>
        <p className="product-price">${price.toFixed(2)}</p>
        {colors && colors.length > 0 && (
          <div className="product-colors">
            {colors.map((c) => (
              <div
                key={c.title}
                className="color-dot"
                style={{ background: c.hex, ...(c.border ? { borderColor: "rgba(0,0,0,0.15)" } : {}) }}
                title={c.title}
              />
            ))}
          </div>
        )}
        <div className="stars"><span>{STARS}</span><span className="reviews">({reviews})</span></div>
      </div>
    </div>
  );
}
