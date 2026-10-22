import { NextResponse } from "next/server";
import { storeApplication, notifyNewApplication, type AmbassadorApplication } from "@/lib/ambassador-store";
import { beehiivSubscribe } from "@/lib/beehiiv";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  // Honeypot: real users never fill this hidden field.
  if (str(body.company)) {
    return NextResponse.json({ ok: true }); // silently accept and drop
  }

  const app: AmbassadorApplication = {
    firstName: str(body.firstName),
    lastName: str(body.lastName),
    email: str(body.email).toLowerCase(),
    phone: str(body.phone),
    location: str(body.location),
    instagram: str(body.instagram),
    tiktok: str(body.tiktok),
    followerRange: str(body.followerRange),
    niche: str(body.niche),
    building: str(body.building),
    meaning: str(body.meaning),
    codeValue: str(body.codeValue),
    why: str(body.why),
  };

  if (!app.firstName || !app.lastName || !EMAIL_RE.test(app.email) || !app.instagram || !app.building) {
    return NextResponse.json(
      { ok: false, message: "Please complete the required fields, including what you're building, with a valid email." },
      { status: 400 }
    );
  }

  const stored = await storeApplication(app);

  // Tag the applicant on the mailing list and notify the inbox. Best effort:
  // these should not block the applicant's success response.
  const [, notify] = await Promise.allSettled([
    beehiivSubscribe(app.email, "ambassador"),
    notifyNewApplication(app),
  ]);

  // The application is captured if it was stored (Airtable/Formspree) OR an
  // email notification was delivered (Resend) — so email-only setups work too.
  const emailed = notify.status === "fulfilled" && notify.value === true;
  if (!stored.ok && !emailed) {
    return NextResponse.json({ ok: false, message: stored.message }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
