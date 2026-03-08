"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

const serviceKeys = ["animations", "presentations", "backgrounds", "websites", "uiux", "custom"] as const;
const serviceIcons = ["✦", "◈", "◉", "⬡", "◎", "∞"];
const serviceColors = ["#7B2FFF", "#C9A96E", "#A855F7", "#C9A96E", "#7B2FFF", "#F0EEF6"];
const serviceStyles = ["flip", "lift", "flip", "lift", "flip", "lift"] as const;
const serviceTags = [
  ["After Effects", "Lottie", "CSS Motion"],
  ["PowerPoint", "Keynote", "Interactive"],
  ["Three.js", "WebGL", "Loop"],
  ["Next.js", "React", "Tailwind"],
  ["Figma", "Prototyping", "Research"],
  ["Custom", "Creative", "Anything"],
];

function FlipCard({ serviceKey, index }: { serviceKey: typeof serviceKeys[number]; index: number }) {
  const { t } = useTranslation("common");
  const [flipped, setFlipped] = useState(false);
  const { ref, visible } = useReveal();
  const color = serviceColors[index];
  const icon = serviceIcons[index];
  const tags = serviceTags[index];

  return (
    <div ref={ref} style={{ perspective: "1000px", height: "320px", cursor: "pointer", opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s` }}
      onMouseEnter={() => setFlipped(true)} onMouseLeave={() => setFlipped(false)}>
      <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)", transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", background: "linear-gradient(160deg, rgba(20,18,30,0.95), rgba(12,12,18,0.98))", border: `1px solid ${color}28`, borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", padding: "32px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", inset: "-16px", background: `radial-gradient(circle, ${color}22, transparent 70%)`, borderRadius: "50%" }} />
            <span style={{ fontSize: "48px", color, filter: `drop-shadow(0 0 14px ${color})`, position: "relative" }}>{icon}</span>
          </div>
          <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "0.35em", color: "#F0EEF6", margin: 0, textTransform: "uppercase" }}>{t(`services.items.${serviceKey}.title`)}</h3>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(240,238,246,0.4)", margin: 0, textAlign: "center", fontStyle: "italic" }}>{t(`services.items.${serviceKey}.sub`)}</p>
          <div style={{ width: "32px", height: "1px", background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center" }}>
            {tags.map(tag => <span key={tag} style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.15em", color, border: `1px solid ${color}33`, padding: "3px 8px", borderRadius: "2px", opacity: 0.7 }}>{tag}</span>)}
          </div>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.3em", color, opacity: 0.45, marginTop: "4px" }}>{t("services.hover")}</span>
        </div>
        <div style={{ position: "absolute", inset: 0, backfaceVisibility: "hidden", transform: "rotateY(180deg)", background: `linear-gradient(135deg, ${color}18, rgba(8,8,12,0.98))`, border: `1px solid ${color}55`, borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", padding: "32px", boxShadow: `0 0 40px ${color}15` }}>
          <div style={{ width: "36px", height: "1px", background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
          <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.3em", color, margin: 0, textTransform: "uppercase" }}>{t(`services.items.${serviceKey}.title`)}</h3>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "14px", color: "rgba(240,238,246,0.8)", margin: 0, textAlign: "center", lineHeight: 1.8, fontStyle: "italic" }}>{t(`services.items.${serviceKey}.back`)}</p>
          <a href="https://wa.me/message/DDNIUOL264WDB1" target="_blank" rel="noopener noreferrer" style={{ padding: "11px 28px", background: `linear-gradient(135deg, ${color}, ${color}aa)`, color: "#F0EEF6", fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", textDecoration: "none", borderRadius: "2px", boxShadow: `0 0 20px ${color}44` }}>{t("services.startNow")}</a>
        </div>
      </div>
    </div>
  );
}

function LiftCard({ serviceKey, index }: { serviceKey: typeof serviceKeys[number]; index: number }) {
  const { t } = useTranslation("common");
  const [hovered, setHovered] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const { ref, visible } = useReveal();
  const color = serviceColors[index];
  const icon = serviceIcons[index];
  const tags = serviceTags[index];

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMouse({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 18, y: ((e.clientY - rect.top) / rect.height - 0.5) * -18 });
  };

  return (
    <div ref={ref} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.7s ease ${index * 0.1}s, transform 0.7s ease ${index * 0.1}s` }}>
      <div ref={cardRef} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setMouse({ x: 0, y: 0 }); }} onMouseMove={handleMouseMove}
        style={{ height: "320px", cursor: "pointer", background: "linear-gradient(160deg, rgba(20,18,30,0.95), rgba(12,12,18,0.98))", border: `1px solid ${hovered ? color + "55" : color + "18"}`, borderRadius: "12px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px", padding: "32px", transition: "border-color 0.4s, box-shadow 0.4s, transform 0.15s ease", transform: hovered ? `perspective(800px) rotateX(${mouse.y}deg) rotateY(${mouse.x}deg) translateY(-10px) scale(1.02)` : "perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)", boxShadow: hovered ? `0 30px 80px rgba(0,0,0,0.6), 0 0 50px ${color}20` : "inset 0 1px 0 rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: hovered ? `radial-gradient(ellipse at 50% 50%, ${color}12, transparent 70%)` : "transparent", transition: "background 0.5s ease", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", inset: "-16px", background: `radial-gradient(circle, ${color}${hovered ? "30" : "15"}, transparent 70%)`, borderRadius: "50%", transition: "all 0.4s" }} />
          <span style={{ fontSize: "48px", color, filter: `drop-shadow(0 0 ${hovered ? "22px" : "10px"} ${color})`, transition: "filter 0.4s", position: "relative" }}>{icon}</span>
        </div>
        <h3 style={{ fontFamily: "'Space Mono', monospace", fontSize: "12px", letterSpacing: "0.35em", color: "#F0EEF6", margin: 0, textTransform: "uppercase", position: "relative" }}>{t(`services.items.${serviceKey}.title`)}</h3>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(240,238,246,0.4)", margin: 0, textAlign: "center", fontStyle: "italic", position: "relative" }}>{t(`services.items.${serviceKey}.sub`)}</p>
        <div style={{ width: hovered ? "56px" : "32px", height: "1px", background: `linear-gradient(90deg, transparent, ${color}, transparent)`, transition: "width 0.4s ease" }} />
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", justifyContent: "center", position: "relative" }}>
          {tags.map(tag => <span key={tag} style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.15em", color, border: `1px solid ${color}33`, padding: "3px 8px", borderRadius: "2px", opacity: hovered ? 1 : 0.5, transition: "opacity 0.3s" }}>{tag}</span>)}
        </div>
        {hovered && <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(240,238,246,0.65)", margin: 0, textAlign: "center", lineHeight: 1.7, position: "relative", animation: "fadeUp 0.35s ease", fontStyle: "italic" }}>{t(`services.items.${serviceKey}.back`)}</p>}
      </div>
    </div>
  );
}

export default function Services() {
  const { t } = useTranslation("common");
  const { ref: titleRef, visible: titleVisible } = useReveal();

  return (
    <section id="services" style={{ padding: "140px 48px", background: "#0a0a0f", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "800px", height: "500px", background: "radial-gradient(ellipse, rgba(123,47,255,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div ref={titleRef} style={{ textAlign: "center", marginBottom: "80px", opacity: titleVisible ? 1 : 0, transform: titleVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#7B2FFF", marginBottom: "24px" }}>{t("services.label")}</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0, marginBottom: "16px", letterSpacing: "-0.02em" }}>
          {t("services.title")} <em style={{ color: "#7B2FFF" }}>{t("services.titleAccent")}</em>
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "rgba(240,238,246,0.35)", margin: 0, fontStyle: "italic" }}>{t("services.sub")}</p>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #7B2FFF, #C9A96E, transparent)", margin: "28px auto 0" }} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
        {serviceKeys.map((key, i) =>
          serviceStyles[i] === "flip"
            ? <FlipCard key={key} serviceKey={key} index={i} />
            : <LiftCard key={key} serviceKey={key} index={i} />
        )}
      </div>
      <style>{`@keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </section>
  );
}