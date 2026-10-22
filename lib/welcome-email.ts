// Emails a new subscriber their one-time 15%-off code via Resend (same provider
// used for login codes + order receipts). Reports configured:false when
// RESEND_API_KEY is absent so the API can stay honest about delivery.

type SendResult = { ok: boolean; configured: boolean };

const FROM = process.env.ORDER_EMAIL_FROM || "Cash Culture <onboarding@resend.dev>";

export async function sendWelcomeCode(email: string, code: string): Promise<SendResult> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("[welcome] RESEND_API_KEY not set; welcome code not emailed.");
    return { ok: false, configured: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: `Your 15% off code: ${code}`,
        text: [
          `Welcome to Cash Culture Luxury.`,
          ``,
          `Here's your one-time 15% off code:`,
          ``,
          `    ${code}`,
          ``,
          `Enter it in the "Discount code" box at checkout. Valid on your first`,
          `order, one use only, and cannot be combined with other offers.`,
          ``,
          `Shop the collection: https://cashcultureluxury.com`,
          ``,
          `Baltimore Made. Culture Driven.`,
        ].join("\n"),
      }),
    });
    if (res.ok) return { ok: true, configured: true };
    const detail = await res.text().catch(() => "");
    console.error(`[welcome] Resend failed (${res.status}): ${detail}`);
    return { ok: false, configured: true };
  } catch (err) {
    console.error("[welcome] send error", err);
    return { ok: false, configured: true };
  }
}
