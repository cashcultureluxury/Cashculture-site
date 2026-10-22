import { NextResponse } from "next/server";
import { beehiivSubscribe } from "@/lib/beehiiv";
import { sendWelcomeCode } from "@/lib/welcome-email";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

// The welcome code, shared by everyone. Create a matching discount in Shopify
// (15% off, "limit to one use per customer") so each customer can redeem it
// once. Overridable via env without a code change.
const WELCOME_CODE = process.env.WELCOME_CODE || "CashMember15";

export async function POST(req: Request) {
  let body: { email?: string; source?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  const email = (body.email || "").trim().toLowerCase();
  const source = (body.source || "site").trim();

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, message: "Enter a valid email" }, { status: 400 });
  }

  // Add to the mailing list, then email the welcome code. Independent steps:
  // a signup still gets its code shown even if the list call fails.
  const result = await beehiivSubscribe(email, source);
  const sent = await sendWelcomeCode(email, WELCOME_CODE);

  return NextResponse.json(
    {
      ok: result.ok,
      configured: result.configured,
      message: result.message,
      code: WELCOME_CODE,
      emailed: sent.ok,
    },
    { status: 200 } // 200 either way; client reads the ok/code flags
  );
}
