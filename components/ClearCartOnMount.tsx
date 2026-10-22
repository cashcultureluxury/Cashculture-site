"use client";

import { useEffect } from "react";
import { clear } from "@/lib/cart";

// Empties the cart after a successful checkout redirect.
export default function ClearCartOnMount() {
  useEffect(() => {
    clear();
  }, []);
  return null;
}
