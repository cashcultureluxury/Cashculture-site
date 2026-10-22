"use client";

import { useState } from "react";
import type { Promotion } from "@/data/promotions";

function PromoCode({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — the code stays visible for manual copy.
    }
  }

  return (
    <button type="button" className="promo-tile-code" onClick={copy} aria-label={`Copy code ${code}`}>
      <span className="promo-tile-code-value">{code}</span>
      <span className="promo-tile-code-action">{copied ? "Copied!" : "Copy"}</span>
    </button>
  );
}

export default function ExclusivePromos({
  promotions,
  locked,
}: {
  promotions: Promotion[];
  locked: boolean;
}) {
  if (promotions.length === 0) return null;

  return (
    <ul className="promo-grid">
      {promotions.map((promo) => (
        <li key={promo.code} className={`promo-tile${promo.highlight ? " highlight" : ""}`}>
          <h3 className="promo-tile-title">{promo.title}</h3>
          <p className="promo-tile-desc">{promo.description}</p>
          {locked ? (
            <span className="promo-tile-code locked" aria-hidden="true">
              <span className="promo-tile-code-value">•••••••</span>
              <span className="promo-tile-code-action">Locked</span>
            </span>
          ) : (
            <PromoCode code={promo.code} />
          )}
        </li>
      ))}
    </ul>
  );
}
