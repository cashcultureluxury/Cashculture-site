import "../styles/legal.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that govern your use of the Cash Culture website and store.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <main className="cc-page">
      <p className="eyebrow">Cash Culture, LLC</p>
      <h1>Terms of Service</h1>
      <p className="updated">Last updated: June 2026</p>

      <p className="lead">By using cashcultureluxury.com and placing an order, you agree to these terms.</p>

      <h2>Products and Pricing</h2>
      <p>Luxury pieces are limited runs and may sell out without notice. Prices are listed in US dollars and may change. Everyday Essentials are sold through our partner store at cashculturebrand.com under its own terms.</p>

      <h2>Orders and Payment</h2>
      <p>Payment is processed securely by Stripe. Placing an order is an offer to buy, which we may accept or decline. Family (ambassador) and promotional codes apply as described at checkout, one use per customer, and cannot be combined with other offers.</p>

      <h2>Shipping and Returns</h2>
      <p>We ship from Baltimore and process orders Mon to Fri, 11am to 6pm EST. For returns or exchanges, contact us within 14 days of delivery at <a href="mailto:cashculturebrand@gmail.com">cashculturebrand@gmail.com</a>.</p>

      <h2>Cash Culture Family (Ambassador Program)</h2>
      <p>Acceptance into the Cash Culture Family, our ambassador program, is at our discretion. Family codes and any commissions are governed by the terms shared on acceptance.</p>

      <h2>Intellectual Property</h2>
      <p>All logos, designs, and content are the property of Cash Culture, LLC and may not be used without permission.</p>

      <h2>Contact</h2>
      <p>Questions about these terms? Email <a href="mailto:cashculturebrand@gmail.com">cashculturebrand@gmail.com</a> or call (667) 504-1440.</p>
    </main>
  );
}
