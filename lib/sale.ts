"use client";

import { useSyncExternalStore } from "react";

// Black Friday promo. The code itself lives in Shopify; this only advertises it.
// Everything sale-related on the site turns itself off at ENDS_AT.
export const SALE_CODE = "BLACKFRIDAY26";
export const SALE_PERCENT = 25;
// Mon Nov 30 2026, 11:59:59 PM Eastern (EST = UTC-5).
export const SALE_ENDS_AT = Date.parse("2026-12-01T04:59:59Z");

function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 60_000);
  return () => window.clearInterval(id);
}

/** True while the sale runs. False during server render, so nothing flashes after it ends. */
export function useSaleActive(): boolean {
  return useSyncExternalStore(subscribe, () => Date.now() < SALE_ENDS_AT, () => false);
}
