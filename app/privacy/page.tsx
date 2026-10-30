import "../styles/legal.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Cash Culture, LLC collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <main className="cc-page">
      <p className="eyebrow">Cash Culture, LLC</p>
      <h1>Privacy Policy</h1>
      <p className="updated">Last updated: October 2026</p>

      <p className="lead">This policy explains what information we collect when you visit cashcultureluxury.com, why we collect it, and the choices you have.</p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Contact details you give us: name, email, phone, and shipping address when you subscribe, apply to join the Cash Culture Family (our ambassador program), or place an order.</li>
        <li>Order details processed securely through our store platform, Shopify. We never see or store your full card number.</li>
        <li>Basic usage data such as pages viewed, collected to keep the site fast and secure.</li>
      </ul>

      <h2>How We Use It</h2>
      <ul>
        <li>To fulfill orders, send receipts, and provide customer support.</li>
        <li>To send marketing emails through Beehiiv when you opt in. You can unsubscribe at any time using the link in any email.</li>
        <li>To review Family (ambassador) applications and manage the program.</li>
      </ul>

      <h2>Sharing</h2>
      <p>We share information only with the service providers that run the store, including Shopify for checkout and payments, Beehiiv for email, and Airtable for application records. We do not sell your personal information.</p>

      <h2>Your Choices</h2>
      <p>You can ask us to access, correct, or delete your information, or opt out of marketing, by emailing <a href="mailto:cashculturebrand@gmail.com">cashculturebrand@gmail.com</a>.</p>

      <h2>Contact</h2>
      <p>Cash Culture, LLC. Email <a href="mailto:cashculturebrand@gmail.com">cashculturebrand@gmail.com</a> or call (667) 504-1440, Mon to Fri, 11am to 6pm EST.</p>
    </main>
  );
}
