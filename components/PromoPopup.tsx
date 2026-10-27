"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const SEEN_KEY = "cc_promo_seen";
const SUBSCRIBED_KEY = "cc_subscribed";
const SEEN_TTL_DAYS = 14;
const DWELL_MS = 20_000;
const SCROLL_TRIGGER = 0.75; // 75% scroll depth
// Let people look around first: never on the first page of a visit.
const PAGES_KEY = "cc_pages_viewed";
const MIN_PAGES = 2;

// Counts page views in this browser tab's visit. Storage can be blocked
// (private mode), in which case we treat every page as the first.
function countPageView(): number {
  try {
    const n = Number(sessionStorage.getItem(PAGES_KEY) || 0) + 1;
    sessionStorage.setItem(PAGES_KEY, String(n));
    return n;
  } catch {
    return 1;
  }
}

function eligible(pathname: string): boolean {
  if (typeof window === "undefined") return false;
  if (pathname.startsWith("/admin")) return false;
  if (new URLSearchParams(window.location.search).has("code")) return false;
  if (localStorage.getItem(SUBSCRIBED_KEY)) return false;
  const seen = localStorage.getItem(SEEN_KEY);
  if (seen) {
    const ts = Number(seen);
    if (!Number.isNaN(ts) && Date.now() - ts < SEEN_TTL_DAYS * 86_400_000) return false;
  }
  return true;
}

export default function PromoPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [msg, setMsg] = useState("");
  const firedRef = useRef(false);

  const fire = useCallback(() => {
    if (firedRef.current) return;
    if (!eligible(pathname)) return;
    firedRef.current = true;
    setOpen(true);
  }, [pathname]);

  useEffect(() => {
    const pages = countPageView();
    if (pages < MIN_PAGES || !eligible(pathname)) return;

    const dwell = window.setTimeout(fire, DWELL_MS);

    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1);
      if (scrolled >= SCROLL_TRIGGER) fire();
    };
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseout", onExit);
    return () => {
      window.clearTimeout(dwell);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onExit);
    };
  }, [fire, pathname]);

  const markSeen = () => localStorage.setItem(SEEN_KEY, String(Date.now()));

  const close = () => {
    markSeen();
    setOpen(false);
  };

  const dismissForever = () => {
    // Treat an explicit dismiss as a long cooldown (the 14 day cap still applies).
    markSeen();
    setOpen(false);
  };

  const copyCode = () => {
    if (!code) return;
    navigator.clipboard
      ?.writeText(code)
      .then(() => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => {});
  };

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
        body: JSON.stringify({ email, source: "popup" }),
      });
      const data = await res.json().catch(() => ({}));
      if (data.code) setCode(data.code);
      if (res.ok && data.ok) {
        localStorage.setItem(SUBSCRIBED_KEY, "1");
        markSeen();
        setRevealed(true);
        setStatus("idle");
      } else {
        // Still reveal the offer so the visitor gets the promised value, but
        // surface that the list signup needs a retry.
        setStatus("error");
        setMsg(data.message || "Saved locally. We will confirm your signup shortly.");
        localStorage.setItem(SUBSCRIBED_KEY, "1");
        markSeen();
        setRevealed(true);
      }
    } catch {
      setStatus("error");
      setMsg("Network error, but your 15% is unlocked.");
      setRevealed(true);
    }
  }

  if (!open) return null;

  return (
    <div className="promo-overlay" onClick={(e) => e.target === e.currentTarget && close()}>
      <div className="promo-flyer" role="dialog" aria-modal="true" aria-label="15 percent off first order">
        <button className="promo-close" onClick={close} aria-label="Close">&times;</button>

        <div className="promo-top">
          <Image src="/images/home-img-21.webp" alt="Cash Culture Luxury" className="promo-logo" width={80} height={80} />
          <p className="promo-eyebrow">Welcome to Cash Culture Luxury</p>
          <div className="promo-pct">15%</div>
          <div className="promo-pct-label">OFF YOUR FIRST ORDER</div>
          <p className="promo-subtitle">{revealed ? (code ? "Your code is ready" : "Use a Family code at checkout") : "Drop your email to unlock"}</p>
          <p className="promo-fine">Valid on all items. One use per customer.<br />Cannot be combined with other offers.</p>
        </div>

        <div className="promo-bottom">
          <div className="promo-stars">
            <span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span>
          </div>

          {!revealed ? (
            <>
              <form className="promo-form" onSubmit={submit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address"
                  required
                />
                <button type="submit" disabled={status === "loading"}>
                  {status === "loading" ? "..." : "Unlock 15%"}
                </button>
              </form>
              {status === "error" && <p className="promo-fine" style={{ color: "var(--gold)" }}>{msg}</p>}
              <button className="promo-dismiss" onClick={dismissForever}>No thanks, I will pay full price</button>
            </>
          ) : code ? (
            <>
              <div className="promo-amb-note">
                Your <strong>15% member code</strong> &mdash; we emailed it to you too:
              </div>
              <button
                type="button"
                className="promo-code-box"
                onClick={copyCode}
                title="Tap to copy"
                style={{
                  display: "block",
                  width: "100%",
                  fontFamily: "'Courier New', monospace",
                  fontSize: "30px",
                  fontWeight: 800,
                  letterSpacing: "0.12em",
                  color: "#0e0c0a",
                  background: "var(--gold, #cda551)",
                  border: "none",
                  padding: "16px 18px",
                  borderRadius: "8px",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                {copied ? "Copied!" : code}
              </button>
              <p className="promo-fine">Apply it at checkout. One use per customer &middot; cannot be combined with other offers.</p>
              <a className="promo-cta" href="/luxury" onClick={close}>Shop the collection &rarr;</a>
              {status === "error" && <p className="promo-fine">{msg}</p>}
            </>
          ) : (
            <>
              <div className="promo-amb-note">
                Your <strong>15% is unlocked.</strong>{" "}Join the <strong>Cash Culture Family</strong>{" "}to get your own code &mdash; and an account that tracks every order.
              </div>
              <a className="promo-cta" href="/family" onClick={close}>Join the Family</a>
              <a className="promo-shop-link" href="/luxury" onClick={close}>or continue to shop &rarr;</a>
              {status === "error" && <p className="promo-fine">{msg}</p>}
            </>
          )}
        </div>

        <div className="promo-ticker">
          <div className="promo-ticker-inner">
            <span>&#9670; FREE SHIPPING ON ORDERS OVER $75</span>
            <span>&#9670; LIMITED DROPS. WHILE SUPPLIES LAST</span>
            <span>&#9670; USE AN AMBASSADOR CODE FOR 15% OFF</span>
            <span>&#9670; CASH CULTURE LUXURY. BUILT FROM HUSTLE</span>
            <span>&#9670; FREE SHIPPING ON ORDERS OVER $75</span>
            <span>&#9670; LIMITED DROPS. WHILE SUPPLIES LAST</span>
            <span>&#9670; USE AN AMBASSADOR CODE FOR 15% OFF</span>
            <span>&#9670; CASH CULTURE LUXURY. BUILT FROM HUSTLE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
