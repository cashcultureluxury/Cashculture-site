"use client";

import { useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { ESSENTIALS, ESSENTIALS_CATEGORIES, type EssentialsCategory } from "@/data/essentials";

// Home "Shop All" grid: category tabs over the live Essentials catalog, with a
// Show More step so the page stays tidy but every product is one click away.
const PAGE = 12;
type Tab = "All" | EssentialsCategory;
const TABS: Tab[] = ["All", ...ESSENTIALS_CATEGORIES.filter((c) => ESSENTIALS.some((p) => p.category === c))];

export default function HomeShopAll() {
  const [tab, setTab] = useState<Tab>("All");
  const [shown, setShown] = useState(PAGE);

  const items = tab === "All" ? ESSENTIALS : ESSENTIALS.filter((p) => p.category === tab);
  const visible = items.slice(0, shown);

  return (
    <>
      <div className="shop-tabs" role="tablist" aria-label="Filter by category">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={`shop-tab${tab === t ? " active" : ""}`}
            onClick={() => { setTab(t); setShown(PAGE); }}
          >
            {t}
            <span className="shop-tab-count">{t === "All" ? ESSENTIALS.length : ESSENTIALS.filter((p) => p.category === t).length}</span>
          </button>
        ))}
      </div>
      <div className="products-grid products-grid-4" role="tabpanel">
        {visible.map((p) => (
          <ProductCard
            key={p.id}
            variant="home"
            href={`/essentials/${p.id}`}
            image={p.image}
            name={p.name}
            price={`$${p.price.toFixed(2)}`}
            badge={p.badge}
            colorCount={p.colors?.length}
          />
        ))}
      </div>
      <div className="shop-more">
        <p className="shop-more-count">Showing {visible.length} of {items.length}</p>
        {visible.length < items.length ? (
          <button type="button" className="btn-outline" onClick={() => setShown((n) => n + PAGE)}>Show More</button>
        ) : (
          <Link className="btn-outline" href="/essentials">View The Full Collection</Link>
        )}
      </div>
    </>
  );
}
