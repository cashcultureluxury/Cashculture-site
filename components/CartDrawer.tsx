"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "./CartContext";
import { SHOPIFY_STORE_URL } from "@/data/shopify";

const fmt = (n: number) => `$${n.toFixed(2)}`;

export default function CartDrawer() {
  const { items, subtotal, isOpen, confirm, closeCart, remove, setQty } = useCart();
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
    <>
      <div className={`cart-scrim${isOpen ? " open" : ""}`} onClick={closeCart} aria-hidden="true" />
      <aside
        className={`cart-drawer${isOpen ? " open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        aria-hidden={!isOpen}
      >
        <div className="cart-head">
          <h2>Your Cart</h2>
          <button className="cart-close" onClick={closeCart} aria-label="Close cart">&times;</button>
        </div>

        {confirm && items.length > 0 && <p className="cart-confirm">{confirm}</p>}

        <div className="cart-items">
          {items.length === 0 ? (
            <p className="cart-empty">Your cart is empty. Explore the Luxury Collection.</p>
          ) : (
            items.map((item) => (
              <div className="cart-line" key={`${item.id}-${item.size ?? ""}-${item.color ?? ""}`}>
                <Image src={item.image} alt={item.name} width={64} height={80} />
                <div>
                  <p className="cart-line-name">{item.name}</p>
                  {(item.color || item.size) && (
                    <p className="cart-line-meta">
                      {[item.color, item.size && `Size ${item.size}`].filter(Boolean).join(" · ")}
                    </p>
                  )}
                  <p className="cart-line-price">{fmt(item.price)}</p>
                  <button className="cart-remove" onClick={() => remove(item.id, item.size, item.color)}>Remove</button>
                </div>
                <div className="cart-qty">
                  <button onClick={() => setQty(item.id, item.qty - 1, item.size, item.color)} aria-label="Decrease quantity">&minus;</button>
                  <span>{item.qty}</span>
                  <button onClick={() => setQty(item.id, item.qty + 1, item.size, item.color)} aria-label="Increase quantity">+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-foot">
          <div className="cart-subtotal">
            <span className="label">Subtotal</span>
            <span className="amount">{fmt(subtotal)}</span>
          </div>
          <button className="cart-checkout" onClick={checkout} disabled={items.length === 0 || loading}>
            {loading ? "Preparing checkout…" : "Checkout on Shopify"}
          </button>
          {items.length > 0 && (
            <Link className="cart-view-link" href="/cart" onClick={closeCart}>View full cart &rarr;</Link>
          )}
          <p className="cart-note">Use a Family member&rsquo;s code at checkout for 15% off your first order.</p>
        </div>
      </aside>
    </>
  );
}
