// Cash Culture cart store.
// Persists to localStorage under "cc_cart" and broadcasts "cc:cart-changed"
// so the nav badge and drawer stay in sync. Plain module (no framework) plus
// a thin React hook in useCart() for components.

export type CartItem = {
  id: string;
  name: string;
  price: number; // unit price in USD dollars
  size?: string;
  color?: string;
  qty: number;
  image: string;
};

const KEY = "cc_cart";
const EVENT = "cc:cart-changed";

const isBrowser = () => typeof window !== "undefined";

function rawCart(): string | null {
  if (!isBrowser()) return null;
  try {
    return window.localStorage.getItem(KEY);
  } catch {
    return null;
  }
}

export function parseItems(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function read(): CartItem[] {
  return parseItems(rawCart());
}

// For React's useSyncExternalStore: the raw stored string is a stable snapshot
// (same value until the cart changes), and subscribe fires on our own change
// event plus "storage" so other tabs stay in sync.
export const getCartSnapshot = rawCart;
export const getServerCartSnapshot = (): string | null => null;

export function subscribeCart(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function write(items: CartItem[]): void {
  if (!isBrowser()) return;
  window.localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVENT));
}

// A line is identified by product id + size + color, so the same trench in two
// sizes (or two colors) stays as separate lines.
const lineKey = (id: string, size?: string, color?: string) =>
  `${id}::${size ?? ""}::${color ?? ""}`;

export function getItems(): CartItem[] {
  return read();
}

export function getCount(): number {
  return read().reduce((n, i) => n + i.qty, 0);
}

export function getSubtotal(): number {
  return read().reduce((sum, i) => sum + i.price * i.qty, 0);
}

export function addItem(item: Omit<CartItem, "qty"> & { qty?: number }): void {
  const items = read();
  const qty = item.qty ?? 1;
  const key = lineKey(item.id, item.size, item.color);
  const existing = items.find((i) => lineKey(i.id, i.size, i.color) === key);
  const next = existing
    ? items.map((i) =>
        lineKey(i.id, i.size, i.color) === key ? { ...i, qty: i.qty + qty } : i
      )
    : [...items, { ...item, qty }];
  write(next);
}

export function removeItem(id: string, size?: string, color?: string): void {
  write(read().filter((i) => lineKey(i.id, i.size, i.color) !== lineKey(id, size, color)));
}

export function setQty(id: string, qty: number, size?: string, color?: string): void {
  if (qty <= 0) return removeItem(id, size, color);
  write(
    read().map((i) =>
      lineKey(i.id, i.size, i.color) === lineKey(id, size, color) ? { ...i, qty } : i
    )
  );
}

export function clear(): void {
  write([]);
}

export const CART_EVENT = EVENT;
