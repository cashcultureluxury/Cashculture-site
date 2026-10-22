import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CHALLENGE_COOKIE,
  CHALLENGE_TTL_S,
  accountsConfigured,
  buildChallenge,
  generateCode,
  normalizeEmail,
} from "@/lib/auth";
import { sendLoginCode } from "@/lib/account-email";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!accountsConfigured()) {
    return NextResponse.json(
      { ok: false, configured: false, message: "Accounts are being connected. Check back shortly." },
      { status: 200 }
    );
  }

  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  const email = normalizeEmail(body.email);
  if (!email) {
    return NextResponse.json({ ok: false, message: "Enter a valid email" }, { status: 400 });
  }

  const code = generateCode();
  const challenge = buildChallenge(email, code);
  if (!challenge) {
    return NextResponse.json({ ok: false, message: "Accounts are unavailable right now." }, { status: 503 });
  }

  const sent = await sendLoginCode(email, code);

  (await cookies()).set(CHALLENGE_COOKIE, challenge, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: CHALLENGE_TTL_S,
  });

  // We always set the challenge so the verify step works; `delivered` tells the
  // UI whether the email actually went out (false when Resend isn't configured).
  return NextResponse.json({ ok: true, delivered: sent.ok });
}
