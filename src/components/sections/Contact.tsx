"use client";

import { useEffect, useRef, useState } from "react";
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

export default function Contact() {
  const { t } = useTranslation("common");
  const { ref: headRef, visible: headVisible } = useReveal();
  const { ref: cardsRef, visible: cardsVisible } = useReveal();

  const contactMethods = [
    { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>), label: t("contact.whatsapp"), sub: t("contact.whatsappSub"), href: "https://wa.me/message/DDNIUOL264WDB1", color: "#7B2FFF" },
    { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>), label: t("contact.email"), sub: "cleothewep@gmail.com", href: "mailto:cleothewep@gmail.com", color: "#C9A96E" },
    { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>), label: t("contact.phone"), sub: "01558255525", href: "tel:01558255525", color: "#A855F7" },
  ];

  return (
    <section id="contact" style={{ padding: "140px 48px", background: "#0a0a0f", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: "-10%", left: "50%", transform: "translateX(-50%)", width: "900px", height: "500px", background: "radial-gradient(ellipse, rgba(123,47,255,0.07), transparent 70%)", pointerEvents: "none" }} />

      <div ref={headRef} style={{ textAlign: "center", marginBottom: "80px", opacity: headVisible ? 1 : 0, transform: headVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#7B2FFF", marginBottom: "24px" }}>{t("contact.label")}</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0, marginBottom: "20px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          {t("contact.title")}<br />
          <em style={{ background: "linear-gradient(135deg, #7B2FFF, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{t("contact.titleAccent")}</em>
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "rgba(240,238,246,0.35)", margin: "0 auto", fontStyle: "italic", maxWidth: "500px", lineHeight: 1.8 }}>{t("contact.sub")}</p>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #7B2FFF, #C9A96E, transparent)", margin: "28px auto 0" }} />
      </div>

      <div ref={cardsRef} style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap", maxWidth: "800px", margin: "0 auto 80px" }}>
        {contactMethods.map((m, i) => (
          <a key={i} href={m.href} target="_blank" rel="noopener noreferrer"
            style={{ flex: "1", minWidth: "200px", maxWidth: "240px", display: "flex", flexDirection: "column", alignItems: "center", gap: "14px", padding: "36px 28px", background: "rgba(12,12,18,0.9)", border: `1px solid ${m.color}22`, borderRadius: "10px", textDecoration: "none", transition: "all 0.4s ease", opacity: cardsVisible ? 1 : 0, transform: cardsVisible ? "translateY(0)" : "translateY(30px)", transitionDelay: `${i * 0.12}s`, position: "relative", overflow: "hidden" }}
            onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = m.color + "66"; el.style.transform = "translateY(-6px)"; el.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${m.color}18`; }}
            onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.borderColor = m.color + "22"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}
          >
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, ${m.color}44, transparent)` }} />
            <div style={{ color: m.color, filter: `drop-shadow(0 0 8px ${m.color})` }}>{m.icon}</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.2em", color: "#F0EEF6", marginBottom: "6px" }}>{m.label}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "12px", fontStyle: "italic", color: "rgba(240,238,246,0.35)" }}>{m.sub}</div>
            </div>
          </a>
        ))}
      </div>

      <div style={{ textAlign: "center" }}>
        <a href="https://wa.me/message/DDNIUOL264WDB1" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "12px", padding: "18px 52px", background: "linear-gradient(135deg, #7B2FFF, #5a1fd1)", color: "#F0EEF6", fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", textDecoration: "none", borderRadius: "2px", transition: "all 0.3s ease", boxShadow: "0 0 40px rgba(123,47,255,0.35)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 70px rgba(123,47,255,0.6)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 40px rgba(123,47,255,0.35)"; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          {t("contact.startProject")}
        </a>
      </div>
    </section>
  );
}