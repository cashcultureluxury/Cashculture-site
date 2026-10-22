// Beehiiv subscription helper. Real API call when configured, otherwise a
// clearly-flagged no-op so the UI can tell the difference.

type SubscribeResult = { ok: boolean; configured: boolean; message?: string };

export async function beehiivSubscribe(email: string, source: string): Promise<SubscribeResult> {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;

  if (!apiKey || !pubId) {
    console.warn(`[beehiiv] not configured; skipped subscribe for source="${source}"`);
    return { ok: false, configured: false, message: "Email signup goes live shortly. We saved your interest." };
  }

  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: source,
        utm_medium: "website",
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[beehiiv] subscribe failed (${res.status}): ${text}`);
      return { ok: false, configured: true, message: "Could not subscribe right now. Please try again." };
    }
    return { ok: true, configured: true };
  } catch (err) {
    console.error("[beehiiv] subscribe error", err);
    return { ok: false, configured: true, message: "Network error reaching the mailing list." };
  }
}
