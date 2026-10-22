"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import {
  addItem as storeAdd,
  removeItem as storeRemove,
  setQty as storeSetQty,
  getItems,
  CART_EVENT,
  type CartItem,
} from "@/lib/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  confirm: string | null;
  openCart: () => void;
  closeCart: () => void;
  add: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  remove: (id: string, size?: string, color?: string) => void;
  setQty: (id: string, qty: number, size?: string, color?: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [confirm, setConfirm] = useState<string | null>(null);

  const sync = useCallback(() => setItems(getItems()), []);

  useEffect(() => {
    sync();
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener("storage", sync); // sync across tabs
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [sync]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const add: CartContextValue["add"] = useCallback((item) => {
    storeAdd(item);
    setConfirm(`${item.name} added to your cart`);
    setIsOpen(true);
  }, []);

  const remove: CartContextValue["remove"] = useCallback((id, size, color) => storeRemove(id, size, color), []);
  const setQty: CartContextValue["setQty"] = useCallback((id, qty, size, color) => storeSetQty(id, qty, size, color), []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const value: CartContextValue = {
    items,
    count,
    subtotal,
    isOpen,
    confirm,
    openCart,
    closeCart,
    add,
    remove,
    setQty,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
