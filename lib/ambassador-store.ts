// Family (ambassador) application storage.
// Primary: Airtable. Fallback: Formspree (captures to email) until the Airtable
// token lands. Returns where the application was stored so the API can report
// honestly.

export type AmbassadorApplication = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  instagram: string;
  tiktok: string;
  /** Legacy field from the old form; no longer asked. */
  followerRange: string;
  /** What they do (role). */
  niche: string;
  /** What are you building? The answer that matters most. */
  building: string;
  /** What does Cash Culture mean to you? */
  meaning: string;
  /** The Cash Culture Code value that represents them most. */
  codeValue: string;
  /** Why do you want to be part of the Family? */
  why: string;
};

// The Airtable table predates the Family questions, so the long answers are
// folded into its existing "Why" column (unknown field names would make
// Airtable reject the whole record). Empty answers are skipped.
export function applicationSummary(app: AmbassadorApplication): string {
  return [
    ["What are you building", app.building],
    ["What Cash Culture means to them", app.meaning],
    ["Code value", app.codeValue],
    ["Why the Family", app.why],
  ]
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("\n\n");
}

type StoreResult = { ok: boolean; via: "airtable" | "formspree" | "none"; message?: string };

export async function storeApplication(app: AmbassadorApplication): Promise<StoreResult> {
  const token = process.env.AIRTABLE_TOKEN;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_AMBASSADOR_TABLE || "Ambassador Applications";

  if (token && baseId) {
    try {
      const res = await fetch(
        `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            typecast: true,
            fields: {
              "First Name": app.firstName,
              "Last Name": app.lastName,
              Email: app.email,
              Phone: app.phone,
              Location: app.location,
              Instagram: app.instagram,
              TikTok: app.tiktok,
              ...(app.followerRange ? { "Follower Range": app.followerRange } : {}),
              Niche: app.niche,
              Why: applicationSummary(app),
              Status: "New",
              Source: "website",
              "Submitted At": new Date().toISOString(),
            },
          }),
        }
      );
      if (res.ok) return { ok: true, via: "airtable" };
      const text = await res.text().catch(() => "");
      console.error(`[ambassador] Airtable failed (${res.status}): ${text}`);
    } catch (err) {
      console.error("[ambassador] Airtable error", err);
    }
  }

  // Fallback to Formspree so applications are never lost.
  const formspreeId = process.env.FORMSPREE_AMBASSADOR_ID;
  if (formspreeId) {
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(app),
      });
      if (res.ok) return { ok: true, via: "formspree" };
      console.error(`[ambassador] Formspree failed (${res.status})`);
    } catch (err) {
      console.error("[ambassador] Formspree error", err);
    }
  }

  console.warn("[ambassador] no storage configured; application not persisted", { email: app.email });
  return { ok: false, via: "none", message: "Application capture is being connected. Email us directly for now." };
}

export async function notifyNewApplication(app: AmbassadorApplication): Promise<boolean> {
  const to = process.env.NOTIFY_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  if (!to || !resendKey) {
    console.warn("[ambassador] notification not configured (NOTIFY_EMAIL / RESEND_API_KEY)");
    return false;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "Cash Culture <onboarding@resend.dev>",
        to: [to],
        subject: `New Family application: ${app.firstName} ${app.lastName}`,
        text: [
          `${app.firstName} ${app.lastName}`,
          `Email: ${app.email}`,
          `Phone: ${app.phone}`,
          `Location: ${app.location}`,
          `Instagram: ${app.instagram}`,
          `TikTok: ${app.tiktok}`,
          `What they do: ${app.niche}`,
          ``,
          `What are you building?`,
          app.building,
          ``,
          `What does Cash Culture mean to you?`,
          app.meaning || "(no answer)",
          ``,
          `Code value that represents them: ${app.codeValue || "(none selected)"}`,
          ``,
          `Why do you want to be part of the Family?`,
          app.why || "(no answer)",
        ].join("\n"),
      }),
    });
    if (res.ok) return true;
    const text = await res.text().catch(() => "");
    console.error(`[ambassador] Resend failed (${res.status}): ${text}`);
    return false;
  } catch (err) {
    console.error("[ambassador] notify error", err);
    return false;
  }
}
