// Reads a customer's purchase history live from Stripe — no local database.
//
// Checkout (see /api/checkout) sets `customer_creation: "always"`, so every
// paid order is attached to a Stripe Customer carrying the buyer's email. Here
// we look up every Customer for an email (guest checkouts can mint more than
// one) and aggregate their completed Checkout Sessions into a flat order list.

import type Stripe from "stripe";

export type OrderLine = { description: string; quantity: number; amount: number };

export type Order = {
  id: string;
  date: number; // epoch ms
  amountTotal: number; // major units (USD dollars)
  currency: string;
  paid: boolean;
  status: string; // human-readable
  lines: OrderLine[];
};

export type OrderHistory =
  | { configured: false }
  | { configured: true; ok: boolean; orders: Order[] };

const MAX_CUSTOMERS = 10;
const SESSIONS_PER_CUSTOMER = 50;

function statusLabel(session: Stripe.Checkout.Session): { paid: boolean; status: string } {
  if (session.payment_status === "paid") return { paid: true, status: "Paid" };
  if (session.payment_status === "no_payment_required") return { paid: true, status: "Confirmed" };
  return { paid: false, status: "Pending" };
}

export async function getOrdersForEmail(email: string): Promise<OrderHistory> {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) return { configured: false };

  try {
    const StripeLib = (await import("stripe")).default;
    const stripe = new StripeLib(secret);

    const customers = await stripe.customers.list({ email, limit: MAX_CUSTOMERS });
    const orders: Order[] = [];

    for (const customer of customers.data) {
      const sessions = await stripe.checkout.sessions.list({
        customer: customer.id,
        limit: SESSIONS_PER_CUSTOMER,
      });

      for (const session of sessions.data) {
        const { paid, status } = statusLabel(session);
        // Only surface orders the customer actually completed.
        if (session.status !== "complete" && !paid) continue;

        const items = await stripe.checkout.sessions.listLineItems(session.id, { limit: 50 });
        const lines: OrderLine[] = items.data.map((li) => ({
          description: li.description ?? "Item",
          quantity: li.quantity ?? 1,
          amount: (li.amount_total ?? 0) / 100,
        }));

        orders.push({
          id: session.id,
          date: (session.created ?? 0) * 1000,
          amountTotal: (session.amount_total ?? 0) / 100,
          currency: (session.currency ?? "usd").toUpperCase(),
          paid,
          status,
          lines,
        });
      }
    }

    orders.sort((a, b) => b.date - a.date);
    return { configured: true, ok: true, orders };
  } catch (err) {
    console.error("[account] Stripe order lookup failed", err);
    return { configured: true, ok: false, orders: [] };
  }
}
