"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// Animated orbiting ring around the section
function OrbitRing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    let angle = 0;
    const draw = () => {
      const W = canvas.width  = canvas.offsetWidth;
      const H = canvas.height = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2, cy = H / 2;
      const rx = W * 0.42, ry = H * 0.38;
      // Draw ellipse path
      ctx.beginPath();
      for (let i = 0; i <= 360; i++) {
        const a = (i * Math.PI) / 180;
        const x = cx + rx * Math.cos(a);
        const y = cy + ry * Math.sin(a);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(123,47,255,0.08)";
      ctx.lineWidth = 1;
      ctx.stroke();
      // Orbiting dot
      const ox = cx + rx * Math.cos(angle);
      const oy = cy + ry * Math.sin(angle);
      const grad = ctx.createRadialGradient(ox, oy, 0, ox, oy, 12);
      grad.addColorStop(0, "rgba(201,169,110,0.9)");
      grad.addColorStop(1, "rgba(201,169,110,0)");
      ctx.beginPath();
      ctx.arc(ox, oy, 12, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ox, oy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "#C9A96E";
      ctx.fill();
      angle += 0.004;
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas ref={canvasRef} style={{
      position: "absolute", inset: 0, width: "100%", height: "100%",
      pointerEvents: "none",
    }} />
  );
}

// Contact method card — new design
function ContactCard({
  icon, label, sub, href, color, index, visible,
}: {
  icon: React.ReactNode;
  label: string; sub: string; href: string;
  color: string; index: number; visible: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLAnchorElement>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <a
      ref={cardRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={onMouseMove}
      style={{
        position: "relative",
        flex: "1", minWidth: "200px", maxWidth: "260px",
        display: "flex", flexDirection: "column",
        alignItems: "flex-start",
        padding: "36px 32px",
        background: hovered
          ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${color}14, rgba(10,10,15,0.95) 60%)`
          : "rgba(10,10,15,0.85)",
        border: `1px solid ${hovered ? color + "50" : "rgba(255,255,255,0.05)"}`,
        borderRadius: "2px",
        textDecoration: "none",
        overflow: "hidden",
        transition: "border-color 0.4s ease, transform 0.45s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s ease",
        transform: visible
          ? hovered
            ? `translateY(-10px) perspective(600px) rotateX(${(mousePos.y - 0.5) * -8}deg) rotateY(${(mousePos.x - 0.5) * 8}deg)`
            : "translateY(0)"
          : `translateY(40px)`,
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 0.1}s` : "0s",
        boxShadow: hovered ? `0 30px 80px rgba(0,0,0,0.5), 0 0 40px ${color}15` : "none",
        cursor: "none",
      }}
    >
      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: hovered
          ? `linear-gradient(90deg, transparent, ${color}, transparent)`
          : "transparent",
        transition: "background 0.4s ease",
      }} />

      {/* Corner bracket top-left */}
      <div style={{
        position: "absolute", top: "12px", left: "12px",
        width: "12px", height: "12px",
        borderTop: `1px solid ${hovered ? color : "rgba(255,255,255,0.1)"}`,
        borderLeft: `1px solid ${hovered ? color : "rgba(255,255,255,0.1)"}`,
        transition: "border-color 0.4s",
      }} />
      {/* Corner bracket bottom-right */}
      <div style={{
        position: "absolute", bottom: "12px", right: "12px",
        width: "12px", height: "12px",
        borderBottom: `1px solid ${hovered ? color : "rgba(255,255,255,0.1)"}`,
        borderRight: `1px solid ${hovered ? color : "rgba(255,255,255,0.1)"}`,
        transition: "border-color 0.4s",
      }} />

      {/* Icon */}
      <div style={{
        color: hovered ? color : "rgba(240,238,246,0.4)",
        filter: hovered ? `drop-shadow(0 0 10px ${color})` : "none",
        transition: "color 0.35s, filter 0.35s",
        marginBottom: "28px",
      }}>
        {icon}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "11px", letterSpacing: "0.25em",
        color: hovered ? "#F0EEF6" : "rgba(240,238,246,0.5)",
        marginBottom: "8px",
        transition: "color 0.3s",
        textTransform: "uppercase",
      }}>
        {label}
      </div>

      {/* Sub */}
      <div style={{
        fontFamily: "Georgia, serif",
        fontSize: "13px", fontStyle: "italic",
        color: hovered ? color : "rgba(240,238,246,0.25)",
        transition: "color 0.3s",
        lineHeight: 1.5,
      }}>
        {sub}
      </div>

      {/* Arrow */}
      <div style={{
        position: "absolute", bottom: "28px", right: "28px",
        fontFamily: "'Space Mono', monospace",
        fontSize: "14px",
        color: hovered ? color : "rgba(255,255,255,0.1)",
        transform: hovered ? "translate(3px, -3px)" : "none",
        transition: "color 0.3s, transform 0.4s cubic-bezier(0.16,1,0.3,1)",
      }}>
        ↗
      </div>
    </a>
  );
}

export default function Contact() {
  const { t } = useTranslation("common");
  const { ref: sectionRef, visible: sectionVisible } = useReveal(0.08);
  const { ref: headRef,    visible: headVisible    } = useReveal(0.1);
  const { ref: cardsRef,   visible: cardsVisible   } = useReveal(0.1);
  const { ref: ctaRef,     visible: ctaVisible     } = useReveal(0.2);
  const [ctaHovered, setCtaHovered] = useState(false);

  const contactMethods = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      ),
      label: t("contact.whatsapp"),
      sub: t("contact.whatsappSub"),
      href: "https://wa.me/message/DDNIUOL264WDB1",
      color: "#7B2FFF",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
      label: t("contact.email"),
      sub: "cleothewep@gmail.com",
      href: "mailto:cleothewep@gmail.com",
      color: "#C9A96E",
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      ),
      label: t("contact.phone"),
      sub: "01558255525",
      href: "tel:01558255525",
      color: "#A855F7",
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: "160px 48px", background: "#0a0a0f", position: "relative", overflow: "hidden" }}
    >
      {/* Orbiting canvas bg */}
      <OrbitRing />

      {/* Deep glow */}
      <div style={{ position: "absolute", bottom: "-15%", left: "50%", transform: "translateX(-50%)", width: "1000px", height: "600px", background: "radial-gradient(ellipse, rgba(123,47,255,0.07), transparent 65%)", pointerEvents: "none" }} />

      {/* ── Header ── */}
      <div ref={headRef} style={{
        textAlign: "center", marginBottom: "90px",
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px", letterSpacing: "0.45em",
          color: "#7B2FFF", marginBottom: "28px",
        }}>
          {t("contact.label")}
        </div>

        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "#F0EEF6", margin: "0 0 20px",
          letterSpacing: "-0.02em", lineHeight: 1.15,
        }}>
          {t("contact.title")}<br />
          <em style={{
            background: "linear-gradient(135deg, #7B2FFF, #C9A96E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {t("contact.titleAccent")}
          </em>
        </h2>

        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "15px", fontStyle: "italic",
          color: "rgba(240,238,246,0.35)",
          margin: "0 auto", maxWidth: "480px", lineHeight: 1.9,
        }}>
          {t("contact.sub")}
        </p>

        <div style={{
          width: "60px", height: "1px",
          background: "linear-gradient(90deg, transparent, #7B2FFF, #C9A96E, transparent)",
          margin: "32px auto 0",
        }} />
      </div>

      {/* ── Cards ── */}
      <div ref={cardsRef} style={{
        display: "flex", gap: "16px",
        justifyContent: "center", flexWrap: "wrap",
        maxWidth: "860px", margin: "0 auto 100px",
      }}>
        {contactMethods.map((m, i) => (
          <ContactCard key={i} {...m} index={i} visible={cardsVisible} />
        ))}
      </div>

      {/* ── CTA ── */}
      <div ref={ctaRef} style={{
        textAlign: "center",
        opacity: ctaVisible ? 1 : 0,
        transform: ctaVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.9s ease 0.2s, transform 0.9s ease 0.2s",
      }}>
        <a
          href="https://wa.me/message/DDNIUOL264WDB1"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            display: "inline-flex", alignItems: "center", gap: "14px",
            padding: "20px 60px",
            background: ctaHovered
              ? "linear-gradient(135deg, #9B5FFF, #7B2FFF)"
              : "linear-gradient(135deg, #7B2FFF, #5a1fd1)",
            color: "#F0EEF6",
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px", letterSpacing: "0.3em",
            textDecoration: "none",
            borderRadius: "2px",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            transform: ctaHovered ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
            boxShadow: ctaHovered
              ? "0 0 80px rgba(123,47,255,0.7), 0 20px 60px rgba(0,0,0,0.4)"
              : "0 0 40px rgba(123,47,255,0.35)",
            cursor: "none",
            position: "relative", overflow: "hidden",
          }}
        >
          {/* Shimmer on hover */}
          {ctaHovered && (
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.08) 50%, transparent 70%)",
              animation: "shimmerPass 0.6s ease forwards",
            }} />
          )}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{ position: "relative" }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span style={{ position: "relative" }}>{t("contact.startProject")}</span>
        </a>
      </div>

      <style>{`
        @keyframes shimmerPass {
          from { transform: translateX(-100%); }
          to   { transform: translateX(200%);  }
        }
      `}</style>
    </section>
  );
}