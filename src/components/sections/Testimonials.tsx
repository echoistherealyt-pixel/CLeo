"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const testimonials = [
  { quote: "Working with Cleo was unlike any agency experience I've had. They didn't just deliver — they elevated everything.", name: "Sarah M.", role: "Brand Director", color: "#7B2FFF", initial: "S" },
  { quote: "Our presentation went from forgettable to unforgettable overnight. The animations were cinematic. Pure art.", name: "Ahmed K.", role: "Startup Founder", color: "#C9A96E", initial: "A" },
  { quote: "The website they built for us didn't just look good — it performed. Clients mention it in every call.", name: "Lena V.", role: "Creative Director", color: "#A855F7", initial: "L" },
  { quote: "Fast, precise, and genuinely creative. Cleo understood our vision better than we did.", name: "Omar R.", role: "Product Manager", color: "#C9A96E", initial: "O" },
];

export default function Testimonials() {
  const { t } = useTranslation("common");
  const [active, setActive] = useState(0);
  const [animating, setAnimating] = useState(false);
  const { ref: headRef, visible: headVisible } = useReveal();
  const { ref: bodyRef, visible: bodyVisible } = useReveal();

  const goTo = (i: number) => {
    if (animating || i === active) return;
    setAnimating(true);
    setTimeout(() => { setActive(i); setAnimating(false); }, 350);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => { setActive(p => (p + 1) % testimonials.length); setAnimating(false); }, 350);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const t_ = testimonials[active];

  return (
    <section style={{ padding: "120px 48px", background: "#060608", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "600px", height: "400px", background: "radial-gradient(ellipse, rgba(201,169,110,0.05), transparent 70%)", pointerEvents: "none" }} />

      <div ref={headRef} style={{ textAlign: "center", marginBottom: "72px", opacity: headVisible ? 1 : 0, transform: headVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#C9A96E", marginBottom: "20px" }}>{t("testimonials.label")}</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0, letterSpacing: "-0.02em" }}>
          {t("testimonials.title")} <em style={{ color: "#7B2FFF" }}>{t("testimonials.titleAccent")}</em>
        </h2>
      </div>

      <div ref={bodyRef} style={{ maxWidth: "760px", margin: "0 auto", opacity: bodyVisible ? 1 : 0, transform: bodyVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease" }}>
        <div style={{ padding: "56px 64px", background: "rgba(12,12,18,0.9)", border: `1px solid ${t_.color}22`, borderRadius: "12px", position: "relative", marginBottom: "40px", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)", transition: "border-color 0.4s" }}>
          <div style={{ position: "absolute", top: 0, left: "64px", right: "64px", height: "1px", background: `linear-gradient(90deg, transparent, ${t_.color}55, transparent)` }} />
          <div style={{ fontFamily: "Georgia, serif", fontSize: "80px", lineHeight: 0.8, color: t_.color, opacity: 0.15, marginBottom: "28px", userSelect: "none" }}>"</div>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)", fontStyle: "italic", color: "rgba(240,238,246,0.85)", margin: 0, lineHeight: 1.75, opacity: animating ? 0 : 1, transform: animating ? "translateY(8px)" : "translateY(0)", transition: "opacity 0.35s ease, transform 0.35s ease" }}>
            {t_.quote}
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", opacity: animating ? 0 : 1, transition: "opacity 0.35s ease" }}>
            <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: `linear-gradient(135deg, ${t_.color}55, ${t_.color}22)`, border: `1px solid ${t_.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Georgia, serif", fontSize: "18px", fontStyle: "italic", color: t_.color }}>{t_.initial}</div>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.15em", color: "#F0EEF6", marginBottom: "4px" }}>{t_.name}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "12px", fontStyle: "italic", color: "rgba(240,238,246,0.35)" }}>{t_.role}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => goTo(i)} style={{ width: i === active ? "24px" : "6px", height: "6px", borderRadius: "3px", background: i === active ? "linear-gradient(90deg, #7B2FFF, #C9A96E)" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", transition: "all 0.4s ease", padding: 0 }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}