"use client";

import { CartProvider } from "./CartContext";
import Nav from "./Nav";
import Footer from "./Footer";
import PromoPopup from "./PromoPopup";
import CartDrawer from "./CartDrawer";
import ScrollProgress from "./ScrollProgress";
import SaleBar from "./SaleBar";
import { useSaleActive } from "@/lib/sale";

// Wraps every page with the shared cart-aware chrome. Client component so the
// cart context spans the nav badge, product buttons, and drawer.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  // During the sale the 15% signup popup would compete with the 25% code, so it rests.
  const sale = useSaleActive();
  return (
    <CartProvider>
      <ScrollProgress />
      <Nav />
      {children}
      <Footer />
      {!sale && <PromoPopup />}
      <SaleBar />
      <CartDrawer />
    </CartProvider>
  );
}
