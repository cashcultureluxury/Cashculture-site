"use client";

import { CartProvider } from "./CartContext";
import Nav from "./Nav";
import Footer from "./Footer";
import PromoPopup from "./PromoPopup";
import CartDrawer from "./CartDrawer";
import ScrollProgress from "./ScrollProgress";

// Wraps every page with the shared cart-aware chrome. Client component so the
// cart context spans the nav badge, product buttons, and drawer.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ScrollProgress />
      <Nav />
      {children}
      <Footer />
      <PromoPopup />
      <CartDrawer />
    </CartProvider>
  );
}
