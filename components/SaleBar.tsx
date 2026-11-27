"use client";

import { useState } from "react";
import { SALE_CODE, SALE_PERCENT, useSaleActive } from "@/lib/sale";

// Sticky bar at the bottom of every page during the sale. Tap copies the code.
export default function SaleBar() {
  const active = useSaleActive();
  const [copied, setCopied] = useState(false);
  if (!active) return null;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(SALE_CODE);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked: the code is visible anyway */
    }
  };

  return (
    <>
      <div className="sale-bar-spacer" aria-hidden="true" />
      <button type="button" className="sale-bar" onClick={copy} aria-label={`Copy code ${SALE_CODE}`}>
        <span className="sale-bar-tag">Black Friday</span>
        <span className="sale-bar-text">{SALE_PERCENT}% off everything</span>
        <span className="sale-bar-code">{copied ? "Copied!" : SALE_CODE}</span>
        <span className="sale-bar-end">Ends Mon</span>
      </button>
    </>
  );
}
