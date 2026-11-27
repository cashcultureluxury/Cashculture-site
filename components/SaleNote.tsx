"use client";

import { SALE_CODE, SALE_PERCENT, useSaleActive } from "@/lib/sale";

// Cart footnote: the sale code while it runs, otherwise the usual Family-code note.
export default function SaleNote() {
  const active = useSaleActive();
  return active ? (
    <p className="cart-note cart-note-sale">
      Black Friday: use code <strong>{SALE_CODE}</strong> at checkout for {SALE_PERCENT}% off everything.
    </p>
  ) : (
    <p className="cart-note">Use a Family member&rsquo;s code at checkout for 15% off your first order.</p>
  );
}
