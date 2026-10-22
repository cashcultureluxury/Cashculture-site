// Emails a login code to the customer via Resend (same provider used for
// ambassador notifications). When RESEND_API_KEY is absent we report
// `configured: false` so the API can stay honest about delivery.

type SendResult = { ok: boolean; configured: boolean };

export async function sendLoginCode(email: string, code: string): Promise<SendResult> {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    console.warn("[account] RESEND_API_KEY not set; login code not delivered.");
    return { ok: false, configured: false };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Cash Culture <onboarding@resend.dev>",
        to: [email],
        subject: `${code} is your Cash Culture login code`,
        text: [
          `Your Cash Culture login code is ${code}.`,
          ``,
          `Enter it on the sign-in screen to access your account and order history.`,
          `This code expires in 10 minutes. If you didn't request it, you can ignore this email.`,
        ].join("\n"),
      }),
    });
    if (res.ok) return { ok: true, configured: true };
    const detail = await res.text().catch(() => "");
    console.error(`[account] Resend failed (${res.status}): ${detail}`);
    return { ok: false, configured: true };
  } catch (err) {
    console.error("[account] login code send error", err);
    return { ok: false, configured: true };
  }
}
