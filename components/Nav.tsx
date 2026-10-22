"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "./CartContext";

// Primary navigation: shop first, then the world behind the clothes. Kept short
// on purpose; everything else lives in the footer. Shop opens to its lines.
const SHOP = [
  { label: "Luxury", href: "/luxury" },
  { label: "Essentials", href: "/essentials" },
];

const LINKS = [
  { label: "The Culture", href: "/culture" },
  { label: "Family", href: "/family" },
  { label: "Stories", href: "/stories" },
  { label: "About", href: "/about" },
];

export default function Nav() {
  const { count, openCart } = useCart();
  const [solid, setSolid] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
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
  const shopActive = SHOP.some((l) => isActive(l.href));

  const closeMenus = () => {
    setMenuOpen(false);
    setShopOpen(false);
  };

  return (
    <nav className={`cc-nav${isSolid ? " solid" : ""}`}>
      <Link href="/" className="nav-logo" aria-label="Cash Culture home">
        <Image src="/images/home-img-1.webp" alt="Cash Culture" width={39} height={52} preload />
      </Link>

      <ul className={`nav-links${menuOpen ? " open" : ""}`}>
        <li
          className={`nav-shop${shopOpen ? " open" : ""}`}
          onMouseEnter={() => setShopOpen(true)}
          onMouseLeave={() => setShopOpen(false)}
        >
          <button
            type="button"
            className={`nav-shop-toggle${shopActive ? " active" : ""}`}
            aria-expanded={shopOpen}
            aria-controls="nav-shop-menu"
            onClick={() => setShopOpen((o) => !o)}
          >
            Shop
          </button>
          <ul className="nav-shop-menu" id="nav-shop-menu">
            {SHOP.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={isActive(l.href) ? "active" : undefined}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  onClick={closeMenus}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </li>
        {LINKS.map((l) => (
          <li key={l.href}>
            <Link
              href={l.href}
              className={isActive(l.href) ? "active" : undefined}
              aria-current={isActive(l.href) ? "page" : undefined}
              onClick={closeMenus}
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="nav-icons">
        {/* Search icon removed until site search exists; add it back with a working search. */}
        <Link href="/account" aria-label="Account">
          <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
        </Link>
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
