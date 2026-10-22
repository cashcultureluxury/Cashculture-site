"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Step = "email" | "code";

export default function AccountLogin() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState("");
  const [err, setErr] = useState("");

  async function requestCode(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErr("Enter a valid email");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/account/request-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStep("code");
        setNote(
          data.delivered
            ? `We sent a 6-digit code to ${email}. It expires in 10 minutes.`
            : `Enter the 6-digit code. (Email delivery isn't live yet — check server logs in dev.)`
        );
      } else {
        setErr(data.message || "Could not send a code. Try again.");
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verify(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const clean = code.replace(/\D/g, "");
    if (clean.length !== 6) {
      setErr("Enter the 6-digit code");
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/account/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: clean }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        router.refresh();
        return;
      }
      setErr(data.message || "Incorrect code.");
      if (data.expired || data.locked) {
        setStep("email");
        setCode("");
      }
    } catch {
      setErr("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="account-card">
      {step === "email" ? (
        <form className="account-form" onSubmit={requestCode}>
          <label htmlFor="acct-email">Email</label>
          <input
            id="acct-email"
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-gold" disabled={busy}>
            {busy ? "Sending…" : "Email me a login code"}
          </button>
          <p className="account-hint">No password needed. We email you a one-time code.</p>
        </form>
      ) : (
        <form className="account-form" onSubmit={verify}>
          {note && <p className="account-note">{note}</p>}
          <label htmlFor="acct-code">6-digit code</label>
          <input
            id="acct-code"
            inputMode="numeric"
            autoComplete="one-time-code"
            maxLength={6}
            placeholder="••••••"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
            required
          />
          <button type="submit" className="btn-gold" disabled={busy}>
            {busy ? "Verifying…" : "Sign in"}
          </button>
          <button
            type="button"
            className="account-link-btn"
            onClick={() => {
              setStep("email");
              setCode("");
              setErr("");
              setNote("");
            }}
          >
            Use a different email
          </button>
        </form>
      )}
      {err && <p className="account-error">{err}</p>}
    </div>
  );
}
