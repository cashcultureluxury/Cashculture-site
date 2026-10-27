"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";
import { SHOPIFY_ACCOUNT_URL } from "@/data/shopify";

// Primary navigation: shop first, then the world behind the clothes. Kept short
// on purpose; everything else lives in the footer.
const LINKS = [
  { label: "Luxury", href: "/luxury" },
  { label: "Essentials", href: "/essentials" },
  { label: "The Culture", href: "/culture" },
  { label: "Family", href: "/family" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const { count, openCart } = useCart();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isSolid = solid || !onHome || menuOpen;

  // A link is active on its own route and any route nested under it.
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className={`cc-nav${isSolid ? " solid" : ""}`}>
      <Link href="/" className="nav-logo" aria-label="Cash Culture home">
        <img src="/images/home-img-1.webp" alt="Cash Culture" width={60} height={52} />
      </Link>

      <ul className={`nav-links${menuOpen ? " open" : ""}`}>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={isActive(l.href) ? "active" : undefined}
              aria-current={isActive(l.href) ? "page" : undefined}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-icons">
        {/* Search icon removed until site search exists; add it back with a working search. */}
        {/* Accounts and order history live on Shopify, where checkout happens. */}
        <a href={SHOPIFY_ACCOUNT_URL} aria-label="Account">
          <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        </a>
        <button className="cart-wrap" aria-label={`Cart, ${count} items`} type="button" onClick={openCart}>
          <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><line x1="3" y1="6" x2="21" y2="6" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
          <span className="cart-badge">{count}</span>
        </button>
        <button
          className="nav-burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
