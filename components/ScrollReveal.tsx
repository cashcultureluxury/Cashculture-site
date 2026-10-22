"use client";

import { useEffect } from "react";

// Reproduces the mockups' on-scroll fade-in. Observes the given selector inside
// the current page and reveals each element as it nears the viewport. A safety
// timer guarantees nothing stays hidden if the observer never fires.
export default function ScrollReveal({ selector }: { selector: string }) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (els.length === 0) return;

    const reveal = (el: HTMLElement) => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    };

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || typeof IntersectionObserver === "undefined") return; // leave visible

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target as HTMLElement);
            observer.unobserve(e.target);
          }
        });
      },
      // Reveal a little before the element scrolls into view.
      { threshold: 0.05, rootMargin: "0px 0px 200px 0px" }
    );

    els.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      el.style.transition = `opacity 0.6s ${i * 0.05}s ease, transform 0.6s ${i * 0.05}s ease`;
      observer.observe(el);
    });

    // Safety net: never let content stay hidden. After 2.5s reveal anything
    // still pending (covers headless captures, odd viewports, observer hiccups).
    const safety = window.setTimeout(() => els.forEach(reveal), 2500);

    return () => {
      observer.disconnect();
      window.clearTimeout(safety);
    };
  }, [selector]);

  return null;
}
