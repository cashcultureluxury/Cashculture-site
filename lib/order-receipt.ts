// Order receipts: read a paid Checkout Session from Stripe and (a) email the
// customer a branded HTML receipt via Resend, and (b) feed the on-screen
// receipt on /checkout/success. Mirrors lib/account-email.ts: when keys are
// absent we degrade gracefully and report `configured: false` instead of throwing.

import type Stripe from "stripe";

export type ReceiptLine = { description: string; quantity: number; amount: number };

export type ReceiptAddress = {
  line1?: string;
  line2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
};

export type Receipt = {
  id: string;
  orderNumber: string;
  email?: string;
  name?: string;
  date: number; // epoch ms
  currency: string; // ISO, uppercased
  amountSubtotal: number; // major units
  shippingAmount: number; // major units
  amountTotal: number; // major units
  lines: ReceiptLine[];
  address?: ReceiptAddress;
};

const SUPPORT_EMAIL = "cashculturebrand@gmail.com";

// Branded sender. Until a domain is verified in Resend, fall back to the shared
// test sender (same as lib/account-email.ts) so receipts still deliver in dev.
const RECEIPT_FROM = process.env.ORDER_EMAIL_FROM || "Cash Culture <onboarding@resend.dev>";

/** cs_live_a1b2c3d4e5 -> CC-C3D4E5 : short, stable, human-quotable order id. */
function orderNumberFrom(sessionId: string): string {
  const tail = sessionId.replace(/^cs_(test|live)_/, "").slice(-6).toUpperCase();
  return `CC-${tail}`;
}

export function formatMoney(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(amount);
  } catch {
    return `$${amount.toFixed(2)}`;
  }
}

/**
 * Retrieve a paid Checkout Session as a normalized Receipt. Returns null when
 * Stripe isn't configured, the id is missing, or the session isn't paid yet.
 */
export async function getReceipt(sessionId: string | undefined | null): Promise<Receipt | null> {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret || !sessionId) return null;

  try {
    const StripeLib = (await import("stripe")).default;
    const stripe = new StripeLib(secret);

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    // Only build a receipt for a completed/paid order.
    if (session.payment_status !== "paid" && session.status !== "complete") {
      return null;
    }

    const lines: ReceiptLine[] = (session.line_items?.data ?? []).map((li) => ({
      description: li.description ?? "Item",
      quantity: li.quantity ?? 1,
      amount: (li.amount_total ?? 0) / 100,
    }));

    const shipping = (session as unknown as {
      shipping_details?: { name?: string; address?: Stripe.Address };
    }).shipping_details;
    const addr = shipping?.address ?? session.customer_details?.address ?? undefined;

    return {
      id: session.id,
      orderNumber: orderNumberFrom(session.id),
      email: session.customer_details?.email ?? undefined,
      name: shipping?.name ?? session.customer_details?.name ?? undefined,
      date: (session.created ?? Math.floor(Date.now() / 1000)) * 1000,
      currency: (session.currency ?? "usd").toUpperCase(),
      amountSubtotal: (session.amount_subtotal ?? 0) / 100,
      shippingAmount: (session.total_details?.amount_shipping ?? 0) / 100,
      amountTotal: (session.amount_total ?? 0) / 100,
      lines,
      address: addr
        ? {
            line1: addr.line1 ?? undefined,
            line2: addr.line2 ?? undefined,
            city: addr.city ?? undefined,
            state: addr.state ?? undefined,
            postalCode: addr.postal_code ?? undefined,
            country: addr.country ?? undefined,
          }
        : undefined,
    };
  } catch (err) {
    console.error("[receipt] Stripe session retrieve failed", err);
    return null;
  }
}

function addressLines(r: Receipt): string[] {
  if (!r.address) return [];
  const a = r.address;
  return [
    r.name,
    a.line1,
    a.line2,
    [a.city, a.state, a.postalCode].filter(Boolean).join(", "),
    a.country,
  ].filter((s): s is string => Boolean(s && s.trim()));
}

function renderReceiptText(r: Receipt): string {
  const items = r.lines.map(
    (l) => `  ${l.quantity} x ${l.description} — ${formatMoney(l.amount, r.currency)}`
  );
  const addr = addressLines(r);
  return [
    "Thank you for shopping the culture.",
    "",
    `Order ${r.orderNumber}`,
    new Date(r.date).toLocaleDateString("en-US", { dateStyle: "long" }),
    "",
    "Items",
    ...items,
    "",
    `Subtotal: ${formatMoney(r.amountSubtotal, r.currency)}`,
    `Shipping: ${r.shippingAmount > 0 ? formatMoney(r.shippingAmount, r.currency) : "Free"}`,
    `Total: ${formatMoney(r.amountTotal, r.currency)}`,
    ...(addr.length ? ["", "Shipping to", ...addr] : []),
    "",
    `Questions about your order? Reach us at ${SUPPORT_EMAIL}.`,
    "Cash Culture, LLC.",
  ].join("\n");
}

function renderReceiptHtml(r: Receipt): string {
  const ink = "#0f1115";
  const gold = "#c8a24a";
  const muted = "#8a8f98";
  const line = "#2a2f3a";

  const rows = r.lines
    .map(
      (l) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid ${line};color:#f4f4f5;font-size:15px;">
          ${escapeHtml(l.description)}
          <span style="color:${muted};">&nbsp;×&nbsp;${l.quantity}</span>
        </td>
        <td align="right" style="padding:10px 0;border-bottom:1px solid ${line};color:#f4f4f5;font-size:15px;white-space:nowrap;">
          ${formatMoney(l.amount, r.currency)}
        </td>
      </tr>`
    )
    .join("");

  const addr = addressLines(r);
  const addrBlock = addr.length
    ? `<p style="margin:0 0 4px;color:${muted};font-size:12px;letter-spacing:.12em;text-transform:uppercase;">Shipping to</p>
       <p style="margin:0;color:#f4f4f5;font-size:14px;line-height:1.6;">${addr.map(escapeHtml).join("<br/>")}</p>`
    : "";

  return `<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#0a0b0d;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#0a0b0d;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${ink};border:1px solid ${line};border-radius:16px;overflow:hidden;">
        <tr><td style="padding:32px 32px 8px;text-align:center;">
          <div style="font-family:Arial,Helvetica,sans-serif;font-weight:700;letter-spacing:.18em;text-transform:uppercase;font-size:16px;color:#fff;">
            CASH <span style="color:${gold};">•</span> CULTURE
          </div>
        </td></tr>
        <tr><td style="padding:8px 32px 0;text-align:center;">
          <p style="margin:0;color:${gold};font-size:12px;letter-spacing:.16em;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif;">Order Confirmed</p>
          <h1 style="margin:8px 0 4px;color:#fff;font-size:24px;font-family:Arial,Helvetica,sans-serif;">Thank you for shopping the culture</h1>
          <p style="margin:0;color:${muted};font-size:14px;font-family:Arial,Helvetica,sans-serif;">
            Order ${r.orderNumber} &nbsp;·&nbsp; ${new Date(r.date).toLocaleDateString("en-US", { dateStyle: "long" })}
          </p>
        </td></tr>
        <tr><td style="padding:24px 32px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;">
            ${rows}
            <tr>
              <td style="padding:14px 0 2px;color:${muted};font-size:14px;">Subtotal</td>
              <td align="right" style="padding:14px 0 2px;color:${muted};font-size:14px;">${formatMoney(r.amountSubtotal, r.currency)}</td>
            </tr>
            <tr>
              <td style="padding:2px 0;color:${muted};font-size:14px;">Shipping</td>
              <td align="right" style="padding:2px 0;color:${muted};font-size:14px;">${r.shippingAmount > 0 ? formatMoney(r.shippingAmount, r.currency) : "Free"}</td>
            </tr>
            <tr>
              <td style="padding:8px 0 0;color:#fff;font-size:18px;font-weight:700;">Total</td>
              <td align="right" style="padding:8px 0 0;color:${gold};font-size:18px;font-weight:700;">${formatMoney(r.amountTotal, r.currency)}</td>
            </tr>
          </table>
        </td></tr>
        ${addrBlock ? `<tr><td style="padding:0 32px 24px;font-family:Arial,Helvetica,sans-serif;">${addrBlock}</td></tr>` : ""}
        <tr><td style="padding:20px 32px 32px;border-top:1px solid ${line};text-align:center;font-family:Arial,Helvetica,sans-serif;">
          <p style="margin:0 0 6px;color:${muted};font-size:13px;">Questions about your order?</p>
          <p style="margin:0;color:#f4f4f5;font-size:13px;">
            <a href="mailto:${SUPPORT_EMAIL}" style="color:${gold};text-decoration:none;">${SUPPORT_EMAIL}</a>
            &nbsp;·&nbsp; (667) 504-1440
          </p>
          <p style="margin:16px 0 0;color:${muted};font-size:11px;">© ${new Date().getFullYear()} Cash Culture, LLC. All Rights Reserved.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Email the customer their branded receipt. Best-effort; never throws. */
export async function sendOrderReceipt(r: Receipt): Promise<{ ok: boolean; configured: boolean }> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("[receipt] RESEND_API_KEY not set; receipt not delivered.");
    return { ok: false, configured: false };
  }
  if (!r.email) {
    console.warn("[receipt] No customer email on session; receipt not sent.", r.id);
    return { ok: false, configured: true };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: RECEIPT_FROM,
        to: [r.email],
        subject: `Your Cash Culture receipt — Order ${r.orderNumber}`,
        html: renderReceiptHtml(r),
        text: renderReceiptText(r),
      }),
    });
    if (res.ok) return { ok: true, configured: true };
    const detail = await res.text().catch(() => "");
    console.error(`[receipt] Resend failed (${res.status}): ${detail}`);
    return { ok: false, configured: true };
  } catch (err) {
    console.error("[receipt] send error", err);
    return { ok: false, configured: true };
  }
}
