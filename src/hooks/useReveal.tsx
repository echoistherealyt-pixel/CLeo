"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── useReveal hook ────────────────────────────────────────────────────────────
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, visible };
}

// ── ScrollToTop ───────────────────────────────────────────────────────────────
export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollUp = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      onClick={scrollUp}
      aria-label="Scroll to top"
      style={{
        position: "fixed", bottom: "40px", right: "40px", zIndex: 500,
        width: "44px", height: "44px", borderRadius: "50%",
        background: "rgba(10,10,15,0.9)",
        border: "1px solid rgba(123,47,255,0.3)",
        backdropFilter: "blur(12px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0) scale(1)" : "translateY(12px) scale(0.9)",
        transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
        pointerEvents: show ? "all" : "none",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 16px rgba(123,47,255,0.15)",
      }}
      onMouseEnter={e => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.borderColor = "#7B2FFF";
        b.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4), 0 0 24px rgba(123,47,255,0.35)";
        b.style.background = "rgba(123,47,255,0.15)";
      }}
      onMouseLeave={e => {
        const b = e.currentTarget as HTMLButtonElement;
        b.style.borderColor = "rgba(123,47,255,0.3)";
        b.style.boxShadow = "0 8px 32px rgba(0,0,0,0.4), 0 0 16px rgba(123,47,255,0.15)";
        b.style.background = "rgba(10,10,15,0.9)";
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#7B2FFF" strokeWidth="2" strokeLinecap="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}