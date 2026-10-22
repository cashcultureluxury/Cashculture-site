import "../styles/legal.css";
import "../styles/account.css";
import type { Metadata } from "next";
import Link from "next/link";
import { getSessionEmail, accountsConfigured } from "@/lib/auth";
import { getOrdersForEmail, type Order } from "@/lib/stripe-orders";
import { PROMOTIONS } from "@/data/promotions";
import AccountLogin from "@/components/AccountLogin";
import ExclusivePromos from "@/components/ExclusivePromos";
import LogoutButton from "@/components/LogoutButton";

export const metadata: Metadata = {
  title: "My Account",
  description: "Sign in to view your Cash Culture order history.",
  robots: { index: false },
};

// Account state is per-request (cookies + live Stripe data).
export const dynamic = "force-dynamic";

function fmtDate(ms: number): string {
  return new Date(ms).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

function fmtMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

function OrderCard({ order }: { order: Order }) {
  return (
    <li className="order-card">
      <div className="order-head">
        <span className="order-date">{fmtDate(order.date)}</span>
        <span className={`order-status${order.paid ? " paid" : ""}`}>{order.status}</span>
      </div>
      <ul className="order-lines">
        {order.lines.map((line, i) => (
          <li key={i}>
            <span className="line-desc">
              {line.description}
              {line.quantity > 1 ? ` ×${line.quantity}` : ""}
            </span>
            <span className="line-amount">{fmtMoney(line.amount, order.currency)}</span>
          </li>
        ))}
      </ul>
      <div className="order-total">
        <span>Total</span>
        <span>{fmtMoney(order.amountTotal, order.currency)}</span>
      </div>
    </li>
  );
}

export default async function AccountPage() {
  const email = await getSessionEmail();

  if (!email) {
    return (
      <main className="cc-page account-page">
        <p className="eyebrow">Cash Culture Luxury</p>
        <h1>My Account</h1>
        {accountsConfigured() ? (
          <>
            <p className="lead">
              Sign in to unlock exclusive member promotions and track your orders. No password — just
              your email.
            </p>
            <AccountLogin />
            <h2 className="account-section-title">Exclusive Access</h2>
            <p className="account-promo-intro">Sign in to reveal these members-only codes.</p>
            <ExclusivePromos promotions={PROMOTIONS} locked />
          </>
        ) : (
          <p className="lead">
            Accounts are being connected and will be live shortly. In the meantime, reach us at{" "}
            <a href="mailto:cashculturebrand@gmail.com">cashculturebrand@gmail.com</a>.
          </p>
        )}
      </main>
    );
  }

  const history = await getOrdersForEmail(email);

  return (
    <main className="cc-page account-page">
      <div className="account-topline">
        <div>
          <p className="eyebrow">Cash Culture Luxury</p>
          <h1>My Account</h1>
          <p className="account-email">Signed in as {email}</p>
        </div>
        <LogoutButton />
      </div>

      <h2 className="account-section-title">Exclusive Access</h2>
      <p className="account-promo-intro">
        Members-only codes — tap to copy, then use at checkout.
      </p>
      <ExclusivePromos promotions={PROMOTIONS} locked={false} />

      <h2 className="account-section-title">Order History</h2>

      {!history.configured ? (
        <p className="lead">Order history will appear here once our store is fully connected.</p>
      ) : !history.ok ? (
        <p className="lead">
          We couldn&rsquo;t load your orders just now. Please refresh, or contact{" "}
          <a href="mailto:cashculturebrand@gmail.com">cashculturebrand@gmail.com</a>.
        </p>
      ) : history.orders.length === 0 ? (
        <div className="account-empty">
          <p>No orders yet — your purchases will show up here.</p>
          <Link className="btn-gold" href="/luxury">
            Shop the collection
          </Link>
        </div>
      ) : (
        <ul className="order-list">
          {history.orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </ul>
      )}
    </main>
  );
}
