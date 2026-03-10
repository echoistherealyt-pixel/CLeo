"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES & CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const SERVICE_KEYS = ["animations", "presentations", "backgrounds", "websites", "uiux", "custom"] as const;
type ServiceKey = typeof SERVICE_KEYS[number];

const CONFIG: Record<ServiceKey, { icon: string; color: string; tags: string[]; accent: string }> = {
  animations:    { icon: "✦", color: "#7B2FFF", accent: "#9B5FFF", tags: ["After Effects", "Lottie", "CSS Motion"] },
  presentations: { icon: "◈", color: "#C9A96E", accent: "#E8C98E", tags: ["PowerPoint", "Keynote", "Interactive"] },
  backgrounds:   { icon: "◉", color: "#A855F7", accent: "#C084FC", tags: ["Three.js", "WebGL", "Loop"] },
  websites:      { icon: "⬡", color: "#7B2FFF", accent: "#9B5FFF", tags: ["Next.js", "React", "Tailwind"] },
  uiux:          { icon: "◎", color: "#C9A96E", accent: "#E8C98E", tags: ["Figma", "Prototyping", "Research"] },
  custom:        { icon: "∞", color: "#F0EEF6", accent: "#C9A96E", tags: ["Anything", "Creative", "Yours"] },
};

function useReveal(threshold = 0.1) {
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

// ─────────────────────────────────────────────────────────────────────────────
// ACTIVE SERVICE PANEL — full-width expandable detail
// ─────────────────────────────────────────────────────────────────────────────
function ServicePanel({ serviceKey, onClose }: { serviceKey: ServiceKey; onClose: () => void }) {
  const { t } = useTranslation("common");
  const cfg = CONFIG[serviceKey];
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div style={{
      gridColumn: "1 / -1",
      background: `linear-gradient(135deg, ${cfg.color}12, rgba(8,8,12,0.98))`,
      border: `1px solid ${cfg.color}40`,
      borderRadius: "6px",
      padding: "48px 52px",
      position: "relative", overflow: "hidden",
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0) scaleY(1)" : "translateY(-20px) scaleY(0.92)",
      transformOrigin: "top",
      transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
    }}>
      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "-50%", left: "50%",
        transform: "translateX(-50%)",
        width: "600px", height: "400px",
        background: `radial-gradient(ellipse, ${cfg.color}15, transparent 65%)`,
        pointerEvents: "none",
      }} />

      {/* Close */}
      <button onClick={onClose} style={{
        position: "absolute", top: "24px", right: "24px",
        width: "32px", height: "32px", borderRadius: "50%",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        color: "rgba(240,238,246,0.5)",
        fontFamily: "'Space Mono', monospace", fontSize: "14px",
        cursor: "none", display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s",
      }}
        onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = `${cfg.color}22`; (e.currentTarget as HTMLButtonElement).style.borderColor = cfg.color; (e.currentTarget as HTMLButtonElement).style.color = cfg.color; }}
        onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,238,246,0.5)"; }}
      >
        ✕
      </button>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "start", position: "relative" }}>
        {/* Left */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" }}>
            <span style={{ fontSize: "44px", color: cfg.color, filter: `drop-shadow(0 0 16px ${cfg.color})` }}>{cfg.icon}</span>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.4em", color: cfg.color, marginBottom: "6px", opacity: 0.7 }}>SERVICE</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "28px", fontStyle: "italic", fontWeight: 300, color: "#F0EEF6", margin: 0, letterSpacing: "-0.01em" }}>
                {t(`services.items.${serviceKey}.title`)}
              </h3>
            </div>
          </div>

          <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", fontStyle: "italic", color: "rgba(240,238,246,0.6)", lineHeight: 1.9, marginBottom: "32px" }}>
            {t(`services.items.${serviceKey}.back`)}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "40px" }}>
            {cfg.tags.map(tag => (
              <span key={tag} style={{
                fontFamily: "'Space Mono', monospace", fontSize: "8px",
                letterSpacing: "0.2em", color: cfg.color,
                border: `1px solid ${cfg.color}44`,
                padding: "5px 12px", borderRadius: "2px",
                background: `${cfg.color}08`,
              }}>
                {tag}
              </span>
            ))}
          </div>

          <a href="https://wa.me/message/DDNIUOL264WDB1" target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "14px 36px",
              background: `linear-gradient(135deg, ${cfg.color}, ${cfg.accent}aa)`,
              color: "#F0EEF6",
              fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em",
              textDecoration: "none", borderRadius: "2px",
              boxShadow: `0 0 30px ${cfg.color}44`,
              cursor: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 60px ${cfg.color}66`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "none"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 30px ${cfg.color}44`; }}
          >
            {t("services.startNow")} →
          </a>
        </div>

        {/* Right — visual */}
        <div style={{
          height: "260px", position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          {/* Orbiting rings */}
          {[1, 1.6, 2.2].map((scale, i) => (
            <div key={i} style={{
              position: "absolute",
              width: `${140 * scale}px`, height: `${140 * scale}px`,
              borderRadius: "50%",
              border: `1px solid ${cfg.color}${i === 0 ? "50" : i === 1 ? "28" : "12"}`,
              animation: `orbit${i % 2 === 0 ? "CW" : "CCW"} ${8 + i * 4}s linear infinite`,
            }} />
          ))}

          {/* Center icon */}
          <div style={{
            width: "100px", height: "100px", borderRadius: "50%",
            background: `radial-gradient(circle, ${cfg.color}22, transparent 70%)`,
            border: `1px solid ${cfg.color}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            position: "relative", zIndex: 2,
          }}>
            <span style={{ fontSize: "44px", color: cfg.color, filter: `drop-shadow(0 0 20px ${cfg.color})` }}>
              {cfg.icon}
            </span>
          </div>

          {/* Floating tag bubbles */}
          {cfg.tags.map((tag, i) => (
            <div key={tag} style={{
              position: "absolute",
              top: `${20 + i * 28}%`,
              right: i % 2 === 0 ? "5%" : "15%",
              fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.2em",
              color: cfg.color, border: `1px solid ${cfg.color}33`,
              padding: "4px 10px", borderRadius: "2px",
              background: `${cfg.color}08`,
              animation: `float${i} 4s ease-in-out infinite`,
              animationDelay: `${i * 0.8}s`,
            }}>
              {tag}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes orbitCW  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes orbitCCW { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes float0 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-8px)}  }
        @keyframes float1 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(6px)}   }
        @keyframes float2 { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-5px)}  }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SERVICE CARD — new design: horizontal pill with expand
// ─────────────────────────────────────────────────────────────────────────────
function ServiceCard({ serviceKey, index, visible, isActive, onActivate }: {
  serviceKey: ServiceKey; index: number; visible: boolean;
  isActive: boolean; onActivate: () => void;
}) {
  const { t } = useTranslation("common");
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const cardRef = useRef<HTMLDivElement>(null);
  const cfg = CONFIG[serviceKey];

  const onMouseMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setMousePos({ x: (e.clientX - r.left) / r.width, y: (e.clientY - r.top) / r.height });
  };

  return (
    <div
      ref={cardRef}
      onClick={onActivate}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 0.5, y: 0.5 }); }}
      onMouseMove={onMouseMove}
      style={{
        position: "relative", overflow: "hidden",
        padding: "32px 36px",
        background: isActive
          ? `linear-gradient(135deg, ${cfg.color}18, rgba(8,8,12,0.98))`
          : hovered
          ? `radial-gradient(circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, ${cfg.color}0E, rgba(8,8,12,0.9) 55%)`
          : "rgba(8,8,12,0.7)",
        border: `1px solid ${isActive ? cfg.color + "55" : hovered ? cfg.color + "30" : "rgba(255,255,255,0.05)"}`,
        borderRadius: "6px",
        cursor: "none",
        transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
        transform: visible
          ? hovered && !isActive ? "translateY(-6px)" : isActive ? "translateY(-4px)" : "translateY(0)"
          : "translateY(50px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.08}s`,
        boxShadow: isActive
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${cfg.color}18`
          : hovered
          ? `0 16px 50px rgba(0,0,0,0.4), 0 0 30px ${cfg.color}10`
          : "none",
      }}
    >
      {/* Left glow strip */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "3px",
        background: `linear-gradient(180deg, transparent, ${cfg.color}, transparent)`,
        opacity: isActive ? 1 : hovered ? 0.6 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* Top shimmer */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${cfg.color}, transparent)`,
        opacity: isActive ? 0.8 : hovered ? 0.4 : 0,
        transition: "opacity 0.4s",
      }} />

      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Icon */}
        <div style={{
          width: "52px", height: "52px", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: isActive ? `${cfg.color}20` : hovered ? `${cfg.color}12` : "rgba(255,255,255,0.03)",
          border: `1px solid ${isActive ? cfg.color + "44" : "rgba(255,255,255,0.06)"}`,
          borderRadius: "8px",
          transition: "all 0.4s",
          position: "relative",
        }}>
          <span style={{
            fontSize: "22px", color: isActive || hovered ? cfg.color : "rgba(240,238,246,0.3)",
            filter: isActive ? `drop-shadow(0 0 10px ${cfg.color})` : "none",
            transition: "all 0.4s",
          }}>
            {cfg.icon}
          </span>
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "10px", letterSpacing: "0.25em",
            color: isActive ? cfg.color : hovered ? "#F0EEF6" : "rgba(240,238,246,0.6)",
            margin: "0 0 6px",
            textTransform: "uppercase",
            transition: "color 0.3s",
          }}>
            {t(`services.items.${serviceKey}.title`)}
          </h3>
          <p style={{
            fontFamily: "Georgia, serif", fontSize: "13px",
            fontStyle: "italic",
            color: isActive ? "rgba(240,238,246,0.55)" : "rgba(240,238,246,0.3)",
            margin: 0, lineHeight: 1.6,
            transition: "color 0.3s",
          }}>
            {t(`services.items.${serviceKey}.sub`)}
          </p>
        </div>

        {/* Tags — shown on hover/active */}
        <div style={{
          display: "flex", gap: "6px", flexWrap: "wrap",
          justifyContent: "flex-end", maxWidth: "160px",
          opacity: hovered || isActive ? 1 : 0,
          transform: hovered || isActive ? "translateX(0)" : "translateX(10px)",
          transition: "all 0.4s ease",
        }}>
          {cfg.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "'Space Mono', monospace", fontSize: "7px",
              letterSpacing: "0.15em", color: cfg.color,
              border: `1px solid ${cfg.color}33`,
              padding: "3px 8px", borderRadius: "2px",
              background: `${cfg.color}0A`,
              whiteSpace: "nowrap",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow indicator */}
        <div style={{
          flexShrink: 0, width: "28px", height: "28px",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: isActive ? cfg.color : "rgba(240,238,246,0.2)",
          fontSize: "12px",
          transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
          transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        }}>
          ↓
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────────────────────────────────────
function SectionHeader({ visible }: { visible: boolean }) {
  const { t } = useTranslation("common");
  return (
    <div style={{
      textAlign: "center", marginBottom: "80px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
    }}>
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "9px", letterSpacing: "0.5em",
        color: "#7B2FFF", marginBottom: "28px",
      }}>
        {t("services.label")}
      </div>
      <h2 style={{
        fontFamily: "Georgia, serif",
        fontSize: "clamp(2rem, 5vw, 4rem)",
        fontWeight: 300, fontStyle: "italic",
        color: "#F0EEF6", margin: "0 0 18px",
        letterSpacing: "-0.025em", lineHeight: 1.1,
      }}>
        {t("services.title")}{" "}
        <em style={{
          background: "linear-gradient(135deg, #7B2FFF, #C9A96E)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          {t("services.titleAccent")}
        </em>
      </h2>
      <p style={{
        fontFamily: "Georgia, serif", fontSize: "15px",
        fontStyle: "italic", color: "rgba(240,238,246,0.32)",
        margin: "0 auto", maxWidth: "460px", lineHeight: 1.9,
      }}>
        {t("services.sub")}
      </p>
      <div style={{
        width: "60px", height: "1px",
        background: "linear-gradient(90deg, transparent, #7B2FFF, #C9A96E, transparent)",
        margin: "30px auto 0",
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
export default function Services() {
  const [activeKey, setActiveKey] = useState<ServiceKey | null>(null);
  const { ref: headRef,  visible: headVisible  } = useReveal(0.08);
  const { ref: gridRef,  visible: gridVisible  } = useReveal(0.05);

  const handleActivate = useCallback((key: ServiceKey) => {
    setActiveKey(prev => prev === key ? null : key);
  }, []);

  const handleClose = useCallback(() => setActiveKey(null), []);

  // Build grid items — inject panel after its row
  const items: ("card" | "panel")[] = [];
  const COLS = 2;

  SERVICE_KEYS.forEach((key, i) => {
    items.push("card");
    // After every row, check if active is in this row
    if (activeKey && (i + 1) % COLS === 0) {
      const rowStart = i - (COLS - 1);
      const rowKeys  = SERVICE_KEYS.slice(rowStart, rowStart + COLS);
      if (rowKeys.includes(activeKey)) items.push("panel");
    }
  });
  // Last row if odd count
  if (activeKey && SERVICE_KEYS.length % COLS !== 0) {
    const lastKey = SERVICE_KEYS[SERVICE_KEYS.length - 1];
    if (activeKey === lastKey) items.push("panel");
  }

  return (
    <section id="services" style={{
      padding: "160px 48px", background: "#0a0a0f",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient */}
      <div style={{ position: "absolute", top: "40%", left: "50%", transform: "translate(-50%,-50%)", width: "900px", height: "600px", background: "radial-gradient(ellipse, rgba(123,47,255,0.05), transparent 65%)", pointerEvents: "none" }} />

      {/* Header */}
      <div ref={headRef}>
        <SectionHeader visible={headVisible} />
      </div>

      {/* Grid */}
      <div ref={gridRef} style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "12px",
        maxWidth: "1000px", margin: "0 auto",
      }}>
        {SERVICE_KEYS.map((key, i) => {
          const rowIndex = Math.floor(i / COLS);
          const activeRow = activeKey ? Math.floor(SERVICE_KEYS.indexOf(activeKey) / COLS) : -1;

          return (
            <>
              <ServiceCard
                key={key}
                serviceKey={key}
                index={i}
                visible={gridVisible}
                isActive={activeKey === key}
                onActivate={() => handleActivate(key)}
              />

              {/* Panel inject — after last card in active row */}
              {activeKey &&
                rowIndex === activeRow &&
                (i + 1) % COLS === 0 && (
                <ServicePanel key={`panel-${activeKey}`} serviceKey={activeKey} onClose={handleClose} />
              )}

              {/* Last row panel if odd */}
              {activeKey === key &&
                i === SERVICE_KEYS.length - 1 &&
                SERVICE_KEYS.length % COLS !== 0 && (
                <ServicePanel key={`panel-last-${activeKey}`} serviceKey={activeKey} onClose={handleClose} />
              )}
            </>
          );
        })}
      </div>
    </section>
  );
}