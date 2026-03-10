"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// Animated bottom line — particles flowing left to right
function FlowLine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;
    const particles: { x: number; speed: number; size: number; alpha: number }[] = Array.from({ length: 18 }, () => ({
      x: Math.random() * window.innerWidth,
      speed: 0.3 + Math.random() * 0.5,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
    }));
    const draw = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const W = canvas.width;
      ctx.clearRect(0, 0, W, canvas.height);
      // base line
      const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
      lineGrad.addColorStop(0,    "transparent");
      lineGrad.addColorStop(0.2,  "rgba(123,47,255,0.25)");
      lineGrad.addColorStop(0.5,  "rgba(201,169,110,0.35)");
      lineGrad.addColorStop(0.8,  "rgba(123,47,255,0.25)");
      lineGrad.addColorStop(1,    "transparent");
      ctx.beginPath();
      ctx.moveTo(0, 1); ctx.lineTo(W, 1);
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = 1;
      ctx.stroke();
      // flowing particles
      particles.forEach(p => {
        p.x += p.speed;
        if (p.x > W) p.x = 0;
        const ratio = p.x / W;
        const r = Math.round(123 + (201 - 123) * ratio);
        const g = Math.round(47  + (169 -  47) * ratio);
        const b = Math.round(255 + (110 - 255) * ratio);
        const grd = ctx.createRadialGradient(p.x, 1, 0, p.x, 1, p.size * 4);
        grd.addColorStop(0, `rgba(${r},${g},${b},${p.alpha})`);
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(p.x, 1, p.size * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <canvas ref={canvasRef} style={{ width: "100%", height: "4px", display: "block", marginBottom: "64px" }} />
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "8px",
        fontFamily: "'Space Mono', monospace",
        fontSize: "10px", letterSpacing: "0.2em",
        color: hovered ? "#C9A96E" : "rgba(240,238,246,0.3)",
        textDecoration: "none", marginBottom: "14px",
        transition: "color 0.3s ease",
        cursor: "none",
      }}
    >
      <span style={{
        display: "inline-block", width: "14px", height: "1px",
        background: hovered ? "#C9A96E" : "rgba(240,238,246,0.15)",
        transition: "background 0.3s, width 0.3s",
        flexShrink: 0,
      }} />
      {children}
    </a>
  );
}

export default function Footer() {
  const { t } = useTranslation("common");
  const [logoHovered, setLogoHovered] = useState(false);
  const navLinks = ["services", "work", "pricing", "contact"];

  const contactItems = [
    { label: "WhatsApp",             href: "https://wa.me/message/DDNIUOL264WDB1" },
    { label: "cleothewep@gmail.com", href: "mailto:cleothewep@gmail.com"           },
    { label: "01558255525",          href: "tel:01558255525"                        },
  ];

  return (
    <footer style={{
      background: "#060608",
      position: "relative", overflow: "hidden",
      paddingTop: "80px",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: 0, left: "50%",
        transform: "translateX(-50%)",
        width: "700px", height: "300px",
        background: "radial-gradient(ellipse, rgba(123,47,255,0.05), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 48px" }}>

        {/* ── Main row ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gap: "60px",
          marginBottom: "72px",
          flexWrap: "wrap",
        }}>

          {/* Brand column */}
          <div>
            {/* Logo */}
            <div
              onMouseEnter={() => setLogoHovered(true)}
              onMouseLeave={() => setLogoHovered(false)}
              style={{ marginBottom: "20px", cursor: "none", display: "inline-block" }}
            >
              <div style={{
                fontFamily: "Georgia, serif",
                fontSize: "42px", fontStyle: "italic",
                letterSpacing: "0.04em",
                background: logoHovered
                  ? "linear-gradient(135deg, #C9A96E, #7B2FFF)"
                  : "linear-gradient(135deg, #7B2FFF, #C9A96E)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                transition: "all 0.5s ease",
                filter: logoHovered ? "drop-shadow(0 0 20px rgba(201,169,110,0.3))" : "none",
              }}>
                Cleo
              </div>
            </div>

            {/* Tagline */}
            <p style={{
              fontFamily: "Georgia, serif",
              fontSize: "14px", fontStyle: "italic",
              color: "rgba(240,238,246,0.3)",
              margin: "0 0 28px", lineHeight: 1.8, maxWidth: "260px",
            }}>
              {t("footer.tagline").split("\n").map((line: string, i: number) => (
                <span key={i}>{line}{i === 0 && <br />}</span>
              ))}
            </p>

            {/* Social / WA pill */}
            <a
              href="https://wa.me/message/DDNIUOL264WDB1"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "9px 18px",
                border: "1px solid rgba(123,47,255,0.25)",
                borderRadius: "2px",
                fontFamily: "'Space Mono', monospace",
                fontSize: "8px", letterSpacing: "0.25em",
                color: "rgba(240,238,246,0.4)",
                textDecoration: "none",
                transition: "all 0.35s ease",
                cursor: "none",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(123,47,255,0.6)";
                el.style.color = "#F0EEF6";
                el.style.boxShadow = "0 0 20px rgba(123,47,255,0.2)";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.borderColor = "rgba(123,47,255,0.25)";
                el.style.color = "rgba(240,238,246,0.4)";
                el.style.boxShadow = "none";
              }}
            >
              <span style={{ color: "#7B2FFF", fontSize: "10px" }}>✦</span>
              START A PROJECT
            </a>
          </div>

          {/* Navigate */}
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "8px", letterSpacing: "0.4em",
              color: "#7B2FFF", marginBottom: "24px",
              textTransform: "uppercase",
            }}>
              {t("footer.navigate")}
            </div>
            {navLinks.map(link => (
              <NavLink key={link} href={`#${link}`}>
                {t(`nav.${link}`)}
              </NavLink>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "8px", letterSpacing: "0.4em",
              color: "#C9A96E", marginBottom: "24px",
              textTransform: "uppercase",
            }}>
              {t("footer.contact")}
            </div>
            {contactItems.map(item => (
              <NavLink key={item.label} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>

        {/* ── Flow line ── */}
        <FlowLine />

        {/* ── Bottom bar ── */}
        <div style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap",
          gap: "12px", paddingBottom: "36px",
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "8px", letterSpacing: "0.22em",
            color: "rgba(240,238,246,0.18)",
          }}>
            © {new Date().getFullYear()} CLEO. {t("footer.rights")}
          </span>

          <span style={{
            fontFamily: "Georgia, serif",
            fontSize: "12px", fontStyle: "italic",
            background: "linear-gradient(90deg, rgba(123,47,255,0.5), rgba(201,169,110,0.5))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {t("footer.magic")}
          </span>
        </div>
      </div>
    </footer>
  );
}