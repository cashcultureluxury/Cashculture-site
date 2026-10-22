// Stripe-backed customer accounts: stateless auth primitives.
//
// We avoid a database entirely. Logins use an email one-time code (OTP):
//   1. /api/account/request-code generates a 6-digit code, emails it (Resend),
//      and stores only a SIGNED HASH of it in a short-lived httpOnly cookie
//      (the "login challenge"). The plaintext code never touches our storage.
//   2. /api/account/verify checks the submitted code against that hash and, on
//      success, issues a signed session cookie keyed to the email.
//
// Tokens are compact HMAC-SHA256 envelopes (`base64url(payload).base64url(sig)`)
// signed with ACCOUNT_SESSION_SECRET. No JWT dependency, no server-side state.

import { cookies } from "next/headers";
import { createHmac, randomInt, timingSafeEqual } from "node:crypto";

export const SESSION_COOKIE = "cc_session";
export const CHALLENGE_COOKIE = "cc_login_challenge";

export const SESSION_TTL_S = 60 * 60 * 24 * 30; // 30 days
export const CHALLENGE_TTL_S = 60 * 10; // 10 minutes
export const MAX_CODE_ATTEMPTS = 5;

type SessionPayload = { email: string; exp: number };
type ChallengePayload = { email: string; codeHash: string; attempts: number; exp: number };

function secret(): string | null {
  return process.env.ACCOUNT_SESSION_SECRET || null;
}

/** True when accounts can issue/verify sessions (signing secret present). */
export function accountsConfigured(): boolean {
  return Boolean(secret());
}

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(data: string, key: string): string {
  return createHmac("sha256", key).update(data).digest("base64url");
}

/** Constant-time string compare that tolerates length mismatch. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

function encode<T extends object>(payload: T, key: string): string {
  const body = b64url(JSON.stringify(payload));
  return `${body}.${sign(body, key)}`;
}

function decode<T>(token: string | undefined, key: string): T | null {
  if (!token) return null;
  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(sig, sign(body, key))) return null;
  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as { exp?: number };
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
    return payload as T;
  } catch {
    return null;
  }
}

/** Hash an OTP so the plaintext is never persisted, even in the signed cookie. */
function hashCode(code: string, key: string): string {
  return createHmac("sha256", `${key}:otp`).update(code).digest("base64url");
}

/** A 6-digit numeric login code. */
export function generateCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

// ---- Login challenge (pre-auth) ------------------------------------------

/** Build a signed challenge envelope for a freshly issued code. */
export function buildChallenge(email: string, code: string): string | null {
  const key = secret();
  if (!key) return null;
  const payload: ChallengePayload = {
    email,
    codeHash: hashCode(code, key),
    attempts: 0,
    exp: Math.floor(Date.now() / 1000) + CHALLENGE_TTL_S,
  };
  return encode(payload, key);
}

type ChallengeCheck =
  | { ok: true; email: string }
  | { ok: false; reason: "expired" | "mismatch" | "locked"; next?: string };

/**
 * Validate a submitted code against the challenge cookie. On a wrong guess we
 * return a re-issued challenge with an incremented attempt counter (the caller
 * resets the cookie), locking out after MAX_CODE_ATTEMPTS.
 */
export function checkChallenge(token: string | undefined, code: string): ChallengeCheck {
  const key = secret();
  if (!key) return { ok: false, reason: "expired" };
  const challenge = decode<ChallengePayload>(token, key);
  if (!challenge) return { ok: false, reason: "expired" };
  if (challenge.attempts >= MAX_CODE_ATTEMPTS) return { ok: false, reason: "locked" };

  if (safeEqual(hashCode(code, key), challenge.codeHash)) {
    return { ok: true, email: challenge.email };
  }

  const bumped: ChallengePayload = { ...challenge, attempts: challenge.attempts + 1 };
  const locked = bumped.attempts >= MAX_CODE_ATTEMPTS;
  return { ok: false, reason: locked ? "locked" : "mismatch", next: encode(bumped, key) };
}

// ---- Session (post-auth) -------------------------------------------------

export function buildSession(email: string): string | null {
  const key = secret();
  if (!key) return null;
  const payload: SessionPayload = {
    email,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_S,
  };
  return encode(payload, key);
}

/** The logged-in customer's email, or null. Reads the request cookies. */
export async function getSessionEmail(): Promise<string | null> {
  const key = secret();
  if (!key) return null;
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return decode<SessionPayload>(token, key)?.email ?? null;
}

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function normalizeEmail(raw: unknown): string | null {
  const email = String(raw ?? "").trim().toLowerCase();
  return EMAIL_RE.test(email) ? email : null;
}
