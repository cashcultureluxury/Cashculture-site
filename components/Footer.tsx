"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function subscribe(e: React.FormEvent) {
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
        body: JSON.stringify({ email, source: "footer" }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("done");
        setMsg("You are on the list. Check your inbox.");
        setEmail("");
      } else {
        setStatus("error");
        setMsg(data.message || "Could not subscribe. Try again.");
      }
    } catch {
      setStatus("error");
      setMsg("Network error. Try again.");
    }
  }

  return (
    <footer className="cc-footer" id="contact">
      <div className="footer-top">
        <div className="footer-join">
          <h3>JOIN THE CULTURE</h3>
          <p>For the ones who build &middot; @cashcultureluxury</p>
        </div>
        <div className="footer-logo-center">
          <Image src="/images/home-img-21.webp" alt="Cash Culture logo" width={200} height={200} />
        </div>
        <div className="footer-email-wrap">
          <p>Drops, stories &amp; events first</p>
          <form className="footer-email-form" onSubmit={subscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
              required
            />
            <button type="submit" disabled={status === "loading"}>
              {status === "loading" ? "..." : "Sign Up"}
            </button>
          </form>
          <p className="footer-msg" role="status">{msg}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">&copy; 2026 Cash Culture, LLC. All Rights Reserved.</p>
        <div className="footer-links">
          <Link href="/culture">The Culture</Link>
          <Link href="/about">About</Link>
          <Link href="/family">Family</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
        </div>
        <div className="footer-social">
          <a className="social-icon" href="https://www.instagram.com/cashcultureluxury" target="_blank" rel="noopener noreferrer" title="Instagram" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
          </a>
          <a className="social-icon" href="https://www.tiktok.com/@cashculturebrand" target="_blank" rel="noopener noreferrer" title="TikTok" style={{ fontSize: "0.65rem", letterSpacing: "1px" }}>TK</a>
          <a className="social-icon" href="tel:+16675041440" title="Call (667) 504-1440" aria-label="Phone">
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
          </a>
          <a className="social-icon" href="mailto:cashculturebrand@gmail.com" title="Email" aria-label="Email">
            <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
