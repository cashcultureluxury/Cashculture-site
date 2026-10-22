import type { Metadata } from "next";

// The cart page is a client component, so its metadata lives here. Carts are
// per-visitor and shouldn't be indexed.
export const metadata: Metadata = {
  title: "Your Cart",
  robots: { index: false, follow: true },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}
