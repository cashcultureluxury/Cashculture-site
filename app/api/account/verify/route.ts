import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  CHALLENGE_COOKIE,
  CHALLENGE_TTL_S,
  SESSION_COOKIE,
  SESSION_TTL_S,
  accountsConfigured,
  buildSession,
  checkChallenge,
} from "@/lib/auth";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!accountsConfigured()) {
    return NextResponse.json({ ok: false, message: "Accounts are unavailable right now." }, { status: 503 });
  }

  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request" }, { status: 400 });
  }

  const code = String(body.code ?? "").replace(/\D/g, "");
  if (code.length !== 6) {
    return NextResponse.json({ ok: false, message: "Enter the 6-digit code" }, { status: 400 });
  }

  const store = await cookies();
  const result = checkChallenge(store.get(CHALLENGE_COOKIE)?.value, code);

  if (result.ok) {
    const session = buildSession(result.email);
    if (!session) {
      return NextResponse.json({ ok: false, message: "Could not start session." }, { status: 503 });
    }
    store.set(SESSION_COOKIE, session, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_TTL_S,
    });
    store.delete(CHALLENGE_COOKIE);
    return NextResponse.json({ ok: true });
  }

  if (result.reason === "expired") {
    store.delete(CHALLENGE_COOKIE);
    return NextResponse.json(
      { ok: false, expired: true, message: "That code expired. Request a new one." },
      { status: 400 }
    );
  }

  if (result.reason === "locked") {
    store.delete(CHALLENGE_COOKIE);
    return NextResponse.json(
      { ok: false, locked: true, message: "Too many attempts. Request a new code." },
      { status: 429 }
    );
  }

  // Wrong code, attempts remaining: persist the incremented challenge.
  if (result.next) {
    store.set(CHALLENGE_COOKIE, result.next, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: CHALLENGE_TTL_S,
    });
  }
  return NextResponse.json({ ok: false, message: "Incorrect code. Try again." }, { status: 400 });
}
