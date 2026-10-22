"use client";

import { useState } from "react";

// Inline email capture used for the tapestry restock waitlist. Posts to the
// same subscribe endpoint with a distinct source tag.
export default function WaitlistForm({ source, cta = "Notify Me" }: { source: string; cta?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      setMsg("Enter a valid email");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
        setMsg("You are on the list. We will email you when it restocks.");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.message || "Could not save. Try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Try again.");
    }
  }

  if (status === "done") {
    return <p className="size-label" style={{ color: "var(--gold)", marginTop: 8 }}>{msg}</p>;
  }

  return (
    <>
      <form className="waitlist-form" onSubmit={submit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          aria-label="Email address"
          required
        />
        <button type="submit" disabled={status === "loading"}>{status === "loading" ? "..." : cta}</button>
      </form>
      {status === "error" && <p className="size-label" style={{ color: "var(--gold)", marginTop: 8 }}>{msg}</p>}
    </>
  );
}
