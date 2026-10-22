import "../../styles/legal.css";
import type { Metadata } from "next";
import Link from "next/link";
import ClearCartOnMount from "@/components/ClearCartOnMount";
import { getReceipt, formatMoney, type Receipt } from "@/lib/order-receipt";

export const metadata: Metadata = {
  title: "Order Confirmed",
  robots: { index: false },
};

// Next 16: searchParams is async. The id arrives via Checkout's success_url
// template (/checkout/success?session_id={CHECKOUT_SESSION_ID}).
type Props = { searchParams: Promise<{ session_id?: string }> };

export default async function CheckoutSuccess({ searchParams }: Props) {
  const { session_id } = await searchParams;
  const receipt = await getReceipt(session_id);

  return (
    <main className="cc-page" style={{ textAlign: "center" }}>
      <ClearCartOnMount />
      <div className="success-mark">✦</div>
      <p className="eyebrow">Cash Culture Luxury</p>
      <h1>Order Confirmed</h1>
      <p className="lead">
        Thank you for shopping the culture. A receipt is on its way to your email, and your pieces
        are being prepared for shipment.
      </p>

      {receipt && <ReceiptCard receipt={receipt} />}

      <p>
        Questions about your order? Reach us at{" "}
        <a href="mailto:cashculturebrand@gmail.com">cashculturebrand@gmail.com</a> or (667) 504-1440,
        Mon to Fri, 11am to 6pm EST.
      </p>
      <Link className="btn-gold" href="/luxury">
        Keep Shopping
      </Link>
    </main>
  );
}

function ReceiptCard({ receipt }: { receipt: Receipt }) {
  const gold = "#c8a24a";
  const border = "#e7e9ee";
  const muted = "#6b7280";

  const addr = receipt.address;
  const addrLines = addr
    ? [
        receipt.name,
        addr.line1,
        addr.line2,
        [addr.city, addr.state, addr.postalCode].filter(Boolean).join(", "),
        addr.country,
      ].filter((s): s is string => Boolean(s && s.trim()))
    : [];

  return (
    <div
      style={{
        maxWidth: 480,
        margin: "0 auto 32px",
        textAlign: "left",
        border: `1px solid ${border}`,
        borderRadius: 16,
        padding: "24px 28px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: 16,
        }}
      >
        <span
          style={{
            fontSize: 12,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: gold,
            fontWeight: 700,
          }}
        >
          Receipt
        </span>
        <span style={{ fontSize: 13, color: muted }}>Order {receipt.orderNumber}</span>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {receipt.lines.map((l, i) => (
            <tr key={i}>
              <td style={{ padding: "10px 0", borderBottom: `1px solid ${border}`, fontSize: 15 }}>
                {l.description}
                <span style={{ color: muted }}>&nbsp;×&nbsp;{l.quantity}</span>
              </td>
              <td
                style={{
                  padding: "10px 0",
                  borderBottom: `1px solid ${border}`,
                  fontSize: 15,
                  textAlign: "right",
                  whiteSpace: "nowrap",
                }}
              >
                {formatMoney(l.amount, receipt.currency)}
              </td>
            </tr>
          ))}
          <tr>
            <td style={{ padding: "12px 0 2px", color: muted, fontSize: 14 }}>Subtotal</td>
            <td style={{ padding: "12px 0 2px", color: muted, fontSize: 14, textAlign: "right" }}>
              {formatMoney(receipt.amountSubtotal, receipt.currency)}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "2px 0", color: muted, fontSize: 14 }}>Shipping</td>
            <td style={{ padding: "2px 0", color: muted, fontSize: 14, textAlign: "right" }}>
              {receipt.shippingAmount > 0
                ? formatMoney(receipt.shippingAmount, receipt.currency)
                : "Free"}
            </td>
          </tr>
          <tr>
            <td style={{ padding: "10px 0 0", fontSize: 17, fontWeight: 700 }}>Total</td>
            <td
              style={{
                padding: "10px 0 0",
                fontSize: 17,
                fontWeight: 700,
                color: gold,
                textAlign: "right",
              }}
            >
              {formatMoney(receipt.amountTotal, receipt.currency)}
            </td>
          </tr>
        </tbody>
      </table>

      {addrLines.length > 0 && (
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${border}` }}>
          <p
            style={{
              margin: "0 0 4px",
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: muted,
            }}
          >
            Shipping to
          </p>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6 }}>
            {addrLines.map((line, i) => (
              <span key={i}>
                {line}
                {i < addrLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}
