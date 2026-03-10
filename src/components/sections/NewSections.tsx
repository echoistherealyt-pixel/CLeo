"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// ─────────────────────────────────────────────────────────────────────────────
// SHARED
// ─────────────────────────────────────────────────────────────────────────────
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

function SectionLabel({ text, color = "#7B2FFF" }: { text: string; color?: string }) {
  return (
    <div style={{
      fontFamily: "'Space Mono', monospace",
      fontSize: "9px", letterSpacing: "0.5em",
      color, marginBottom: "24px", textTransform: "uppercase",
    }}>
      {text}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS — horizontal ticker + big number cards
// ─────────────────────────────────────────────────────────────────────────────
function useCounter(to: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    const duration = 2000;
    const start    = performance.now();
    const tick = (now: number) => {
      const t     = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setVal(Math.floor(eased * to));
      if (t < 1) requestAnimationFrame(tick);
      else setVal(to);
    };
    requestAnimationFrame(tick);
  }, [active, to]);
  return val;
}

const STAT_DATA = [
  { value: 120, suffix: "+",   color: "#7B2FFF" },
  { value: 98,  suffix: "%",   color: "#C9A96E" },
  { value: 3,   suffix: "M+",  color: "#A855F7" },
  { value: 4,   suffix: " yrs",color: "#C9A96E" },
];

function StatItem({ item, stat, index, active }: {
  item: { label: string; sub: string };
  stat: typeof STAT_DATA[0];
  index: number;
  active: boolean;
}) {
  const val = useCounter(stat.value, active);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "1", minWidth: "200px",
        position: "relative", padding: "52px 40px 44px",
        background: hovered ? "rgba(10,10,15,0.95)" : "rgba(8,8,11,0.6)",
        border: `1px solid ${hovered ? stat.color + "30" : "rgba(255,255,255,0.04)"}`,
        overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        transform: active
          ? hovered ? "translateY(-8px)" : "translateY(0)"
          : "translateY(40px)",
        opacity: active ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        cursor: "default",
      }}
    >
      {/* Top accent */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)`,
        opacity: hovered ? 1 : 0.3,
        transition: "opacity 0.4s",
      }} />

      {/* Big number */}
      <div style={{
        fontFamily: "Georgia, serif",
        fontSize: "clamp(3rem, 6vw, 5rem)",
        fontWeight: 300, fontStyle: "italic",
        lineHeight: 1, marginBottom: "20px",
        color: stat.color,
        filter: hovered ? `drop-shadow(0 0 20px ${stat.color}66)` : "none",
        transition: "filter 0.4s",
        letterSpacing: "-0.03em",
      }}>
        {val.toLocaleString()}{stat.suffix}
      </div>

      {/* Label */}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "9px", letterSpacing: "0.3em",
        color: "#F0EEF6", marginBottom: "8px",
        textTransform: "uppercase",
        opacity: 0.8,
      }}>
        {item.label}
      </div>

      {/* Sub */}
      <div style={{
        fontFamily: "Georgia, serif",
        fontSize: "12px", fontStyle: "italic",
        color: "rgba(240,238,246,0.28)",
      }}>
        {item.sub}
      </div>

      {/* Corner decoration */}
      <div style={{
        position: "absolute", bottom: "16px", right: "20px",
        fontFamily: "Georgia, serif", fontSize: "48px", fontStyle: "italic",
        color: stat.color, opacity: hovered ? 0.06 : 0.03,
        lineHeight: 1, transition: "opacity 0.4s",
        userSelect: "none", pointerEvents: "none",
      }}>
        {index + 1}
      </div>
    </div>
  );
}

export function StatsSection() {
  const { t } = useTranslation("common");
  const { ref: headRef,  visible: headVisible  } = useReveal(0.1);
  const { ref: statsRef, visible: statsVisible } = useReveal(0.1);
  const items = t("stats.items", { returnObjects: true }) as { label: string; sub: string }[];

  return (
    <section style={{
      padding: "140px 48px", background: "#060608",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background grid lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(123,47,255,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(123,47,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      {/* Header */}
      <div ref={headRef} style={{
        textAlign: "center", marginBottom: "80px",
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <SectionLabel text={t("stats.label")} />
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "#F0EEF6", margin: 0, letterSpacing: "-0.02em",
        }}>
          {t("stats.title")}{" "}
          <em style={{ color: "#C9A96E" }}>{t("stats.titleAccent")}</em>
        </h2>
      </div>

      {/* Cards */}
      <div ref={statsRef} style={{
        display: "flex", flexWrap: "wrap", gap: "2px",
        maxWidth: "1100px", margin: "0 auto",
      }}>
        {items.map((item, i) => (
          <StatItem key={i} item={item} stat={STAT_DATA[i]} index={i} active={statsVisible} />
        ))}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROCESS — horizontal scrolling steps with connecting line
// ─────────────────────────────────────────────────────────────────────────────
const STEP_CONFIG = [
  { icon: "◉", color: "#7B2FFF" },
  { icon: "◈", color: "#9B5FFF" },
  { icon: "✦", color: "#B87FFF" },
  { icon: "⬡", color: "#C9A96E" },
  { icon: "∞", color: "#E8C98E" },
];

function ProcessCard({ step, config, index, active }: {
  step: { title: string; desc: string; duration: string };
  config: typeof STEP_CONFIG[0];
  index: number;
  active: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: "0 0 300px",
        position: "relative",
        padding: "40px 32px 36px",
        background: hovered
          ? `linear-gradient(160deg, ${config.color}10, rgba(8,8,12,0.95))`
          : "rgba(10,10,15,0.7)",
        border: `1px solid ${hovered ? config.color + "44" : "rgba(255,255,255,0.05)"}`,
        borderRadius: "4px",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        transform: active
          ? hovered ? "translateY(-10px)" : "translateY(0)"
          : "translateY(50px)",
        opacity: active ? 1 : 0,
        transitionDelay: `${index * 0.1}s`,
        cursor: "default",
        overflow: "hidden",
      }}
    >
      {/* Step number — large watermark */}
      <div style={{
        position: "absolute", top: "12px", right: "20px",
        fontFamily: "'Space Mono', monospace",
        fontSize: "72px", letterSpacing: "-0.05em",
        color: config.color,
        opacity: hovered ? 0.08 : 0.04,
        lineHeight: 1, userSelect: "none",
        transition: "opacity 0.4s",
      }}>
        {num}
      </div>

      {/* Icon */}
      <div style={{
        fontSize: "28px", color: config.color,
        filter: hovered ? `drop-shadow(0 0 12px ${config.color})` : `drop-shadow(0 0 4px ${config.color}66)`,
        marginBottom: "24px",
        transition: "filter 0.4s",
        lineHeight: 1,
      }}>
        {config.icon}
      </div>

      {/* Step label */}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "8px", letterSpacing: "0.35em",
        color: config.color, marginBottom: "12px",
        opacity: 0.7,
      }}>
        STEP {num}
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: "Georgia, serif",
        fontSize: "20px", fontStyle: "italic", fontWeight: 300,
        color: "#F0EEF6", margin: "0 0 14px",
        letterSpacing: "-0.01em",
      }}>
        {step.title}
      </h3>

      {/* Desc */}
      <p style={{
        fontFamily: "Georgia, serif",
        fontSize: "13px", fontStyle: "italic",
        color: "rgba(240,238,246,0.45)",
        margin: "0 0 24px", lineHeight: 1.85,
      }}>
        {step.desc}
      </p>

      {/* Duration badge */}
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "5px 12px",
        background: `${config.color}12`,
        border: `1px solid ${config.color}25`,
        borderRadius: "2px",
      }}>
        <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: config.color }} />
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "8px", letterSpacing: "0.2em",
          color: config.color, opacity: 0.8,
        }}>
          {step.duration}
        </span>
      </div>

      {/* Bottom line on hover */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "1px",
        background: `linear-gradient(90deg, transparent, ${config.color}, transparent)`,
        opacity: hovered ? 0.6 : 0,
        transition: "opacity 0.4s",
      }} />
    </div>
  );
}

export function ProcessSection() {
  const { t } = useTranslation("common");
  const { ref: headRef,    visible: headVisible    } = useReveal(0.1);
  const { ref: stepsRef,   visible: stepsVisible   } = useReveal(0.05);
  const steps = t("process.steps", { returnObjects: true }) as { title: string; desc: string; duration: string }[];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft ] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -320 : 320, behavior: "smooth" });
  };

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <section style={{
      padding: "140px 0", background: "#0a0a0f",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "40%", right: "-5%",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(201,169,110,0.04), transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div ref={headRef} style={{
        textAlign: "center", marginBottom: "80px", padding: "0 48px",
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <SectionLabel text={t("process.label")} color="#C9A96E" />
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 3.8rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "#F0EEF6", margin: "0 0 16px",
          letterSpacing: "-0.02em", lineHeight: 1.15,
        }}>
          {t("process.title")}<br />
          <em style={{
            background: "linear-gradient(135deg, #7B2FFF, #C9A96E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            {t("process.titleAccent")}
          </em>
        </h2>
        <p style={{
          fontFamily: "Georgia, serif", fontSize: "15px",
          fontStyle: "italic", color: "rgba(240,238,246,0.35)",
          margin: "0 auto", maxWidth: "440px", lineHeight: 1.8,
        }}>
          {t("process.sub")}
        </p>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "28px auto 0" }} />
      </div>

      {/* Scroll arrows */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 48px", marginBottom: "24px", gap: "10px" }}>
        {[["←", "left"], ["→", "right"]].map(([arrow, dir]) => (
          <button
            key={dir}
            onClick={() => scroll(dir as "left" | "right")}
            style={{
              width: "36px", height: "36px", borderRadius: "50%",
              background: "transparent",
              border: `1px solid ${(dir === "left" ? canLeft : canRight) ? "rgba(123,47,255,0.4)" : "rgba(255,255,255,0.08)"}`,
              color: (dir === "left" ? canLeft : canRight) ? "#F0EEF6" : "rgba(240,238,246,0.2)",
              fontFamily: "'Space Mono', monospace", fontSize: "14px",
              cursor: "none", transition: "all 0.3s ease",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(123,47,255,0.12)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; }}
          >
            {arrow}
          </button>
        ))}
      </div>

      {/* Horizontal scroll container */}
      <div
        ref={stepsRef}
        style={{
          opacity: stepsVisible ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <div
          ref={scrollRef}
          style={{
            display: "flex", gap: "16px",
            padding: "0 48px 24px",
            overflowX: "auto", scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {steps.map((step, i) => (
            <ProcessCard key={i} step={step} config={STEP_CONFIG[i]} index={i} active={stepsVisible} />
          ))}
        </div>
      </div>

      <style>{`.process-scroll::-webkit-scrollbar { display: none; }`}</style>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// TOOLS — masonry-style with animated reveal
// ─────────────────────────────────────────────────────────────────────────────
const tools = [
  { name: "After Effects", cat: "Motion",     icon: "Ae", color: "#9B59B6" },
  { name: "Figma",         cat: "Design",     icon: "Fi", color: "#F24E1E" },
  { name: "Next.js",       cat: "Web",        icon: "Nx", color: "#F0EEF6" },
  { name: "Three.js",      cat: "3D/WebGL",   icon: "3J", color: "#7B2FFF" },
  { name: "Framer",        cat: "Prototype",  icon: "Fr", color: "#0055FF" },
  { name: "GSAP",          cat: "Animation",  icon: "GS", color: "#88CE02" },
  { name: "Lottie",        cat: "Animation",  icon: "Lo", color: "#C9A96E" },
  { name: "Blender",       cat: "3D",         icon: "Bl", color: "#F5792A" },
  { name: "Premiere Pro",  cat: "Video",      icon: "Pr", color: "#EA77FF" },
  { name: "Tailwind",      cat: "Styling",    icon: "Tw", color: "#38BDF8" },
  { name: "React",         cat: "Web",        icon: "Re", color: "#61DAFB" },
  { name: "Spline",        cat: "3D/Web",     icon: "Sp", color: "#C9A96E" },
];

function ToolCard({ tool, index, active }: { tool: typeof tools[0]; index: number; active: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        display: "flex", alignItems: "center", gap: "14px",
        padding: "14px 20px",
        background: hovered ? `${tool.color}0E` : "rgba(10,10,15,0.7)",
        border: `1px solid ${hovered ? tool.color + "35" : "rgba(255,255,255,0.05)"}`,
        borderRadius: "3px",
        cursor: "default",
        transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
        transform: active
          ? hovered ? "translateY(-5px) scale(1.02)" : "translateY(0) scale(1)"
          : "translateY(30px) scale(0.95)",
        opacity: active ? 1 : 0,
        transitionDelay: `${index * 0.04}s`,
        boxShadow: hovered ? `0 12px 40px rgba(0,0,0,0.4), 0 0 20px ${tool.color}12` : "none",
        overflow: "hidden",
      }}
    >
      {/* Left accent line */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: "2px",
        background: tool.color,
        opacity: hovered ? 0.7 : 0,
        transition: "opacity 0.3s",
      }} />

      {/* Icon box */}
      <div style={{
        width: "36px", height: "36px", flexShrink: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        background: hovered ? `${tool.color}18` : "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? tool.color + "30" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "4px",
        fontFamily: "'Space Mono', monospace",
        fontSize: "9px", letterSpacing: "0.05em",
        color: hovered ? tool.color : "rgba(240,238,246,0.3)",
        fontWeight: "bold",
        transition: "all 0.3s",
        filter: hovered ? `drop-shadow(0 0 6px ${tool.color}66)` : "none",
      }}>
        {tool.icon}
      </div>

      {/* Text */}
      <div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "10px", letterSpacing: "0.15em",
          color: hovered ? "#F0EEF6" : "rgba(240,238,246,0.55)",
          transition: "color 0.3s", marginBottom: "3px",
        }}>
          {tool.name}
        </div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: "10px", fontStyle: "italic",
          color: hovered ? tool.color : "rgba(240,238,246,0.2)",
          transition: "color 0.3s",
        }}>
          {tool.cat}
        </div>
      </div>
    </div>
  );
}

export function ToolsSection() {
  const { t } = useTranslation("common");
  const { ref: headRef,  visible: headVisible  } = useReveal(0.1);
  const { ref: toolsRef, visible: toolsVisible } = useReveal(0.05);

  return (
    <section style={{
      padding: "140px 48px", background: "#060608",
      position: "relative", overflow: "hidden",
    }}>
      {/* Ambient */}
      <div style={{
        position: "absolute", bottom: "-10%", left: "50%",
        transform: "translateX(-50%)",
        width: "900px", height: "400px",
        background: "radial-gradient(ellipse, rgba(201,169,110,0.04), transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Header */}
      <div ref={headRef} style={{
        textAlign: "center", marginBottom: "80px",
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <SectionLabel text={t("tools.label")} />
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(2rem, 4vw, 3.2rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "#F0EEF6", margin: 0, letterSpacing: "-0.02em",
        }}>
          {t("tools.title")}{" "}
          <em style={{ color: "#C9A96E" }}>{t("tools.titleAccent")}</em>
        </h2>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #7B2FFF, #C9A96E, transparent)", margin: "28px auto 0" }} />
      </div>

      {/* Tools grid */}
      <div ref={toolsRef} style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
        gap: "10px",
        maxWidth: "1000px", margin: "0 auto",
      }}>
        {tools.map((tool, i) => (
          <ToolCard key={i} tool={tool} index={i} active={toolsVisible} />
        ))}
      </div>
    </section>
  );
}