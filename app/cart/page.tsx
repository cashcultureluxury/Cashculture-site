"use client";

import "../styles/luxury.css";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartContext";
import { SHOPIFY_STORE_URL } from "@/data/shopify";

const fmt = (n: number) => `$${n.toFixed(2)}`;

export default function CartPage() {
  const { items, subtotal, remove, setQty } = useCart();
  const [loading, setLoading] = useState(false);

  async function checkout() {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch("/api/shopify-cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json().catch(() => ({}));
      window.location.href = data.url || SHOPIFY_STORE_URL;
    } catch {
      window.location.href = SHOPIFY_STORE_URL;
    }
  }

  return (
    <main className="cc-lux">
      <section className="section" id="cart">
        <div className="section-header">
          <p className="section-label">Cash Culture</p>
          <h2 className="section-title">YOUR CART</h2>
          <p className="section-sub">Review your order, then check out and pay securely.</p>
        </div>

        {items.length === 0 ? (
          <div className="cart-page-empty">
            <p>Your cart is empty.</p>
            <div className="cart-page-empty-links">
              <Link className="btn-gold" href="/essentials">Shop Essentials</Link>
              <Link className="btn-outline" href="/luxury">Shop Luxury</Link>
            </div>
          </div>
        ) : (
          <div className="cart-page-grid">
            <div className="cart-page-lines">
              {items.map((item) => (
                <div className="cart-page-line" key={`${item.id}-${item.size ?? ""}-${item.color ?? ""}`}>
                  <img src={item.image} alt={item.name} width={96} height={120} />
                  <div className="cart-page-line-info">
                    <p className="cart-line-name">{item.name}</p>
                    {(item.color || item.size) && (
                      <p className="cart-line-meta">
                        {[item.color, item.size && `Size ${item.size}`].filter(Boolean).join(" · ")}
                      </p>
                    )}
                    <p className="cart-line-price">{fmt(item.price)}</p>
                    <button className="cart-remove" onClick={() => remove(item.id, item.size, item.color)}>Remove</button>
                  </div>
                  <div className="cart-page-line-right">
                    <div className="cart-qty">
                      <button onClick={() => setQty(item.id, item.qty - 1, item.size, item.color)} aria-label="Decrease quantity">&minus;</button>
                      <span>{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.qty + 1, item.size, item.color)} aria-label="Increase quantity">+</button>
                    </div>
                    <p className="cart-page-line-total">{fmt(item.price * item.qty)}</p>
                  </div>
                </div>
              ))}
            </div>

            <aside className="cart-page-summary">
              <h3>Order Summary</h3>
              <div className="cart-subtotal">
                <span className="label">Subtotal</span>
                <span className="amount">{fmt(subtotal)}</span>
              </div>
              <p className="cart-page-ship">Shipping &amp; taxes calculated at checkout.</p>
              <button className="cart-checkout" onClick={checkout} disabled={loading}>
                {loading ? "Preparing checkout…" : "Checkout on Shopify"}
              </button>
              <Link className="cart-page-continue" href="/essentials">Continue shopping</Link>
              <p className="cart-note">Use a Family member&rsquo;s code at checkout for 15% off your first order.</p>
            </aside>
          </div>
        )}
      </section>

      <div className="gold-divider" />
    </main>
  );
}
