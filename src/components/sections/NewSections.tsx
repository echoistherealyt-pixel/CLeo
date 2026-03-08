"use client";

import { useEffect, useRef, useState } from "react";

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

// ── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const { ref, visible } = useReveal(0.3);

  useEffect(() => {
    if (!visible) return;
    const duration = 1800;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setVal(Math.floor(eased * to));
      if (t < 1) requestAnimationFrame(tick);
      else setVal(to);
    };
    requestAnimationFrame(tick);
  }, [visible, to]);

  return (
    <span ref={ref}>
      {prefix}{val.toLocaleString()}{suffix}
    </span>
  );
}

// ── Stats Section ─────────────────────────────────────────────────────────────
const stats = [
  { value: 120, suffix: "+", label: "Projects Delivered", sub: "across 18 countries" },
  { value: 98, suffix: "%", label: "Client Satisfaction", sub: "from post-project surveys" },
  { value: 3, suffix: "M+", label: "Eyes Reached", sub: "through our client work" },
  { value: 4, suffix: " yrs", label: "In the Craft", sub: "building digital experiences" },
];

function StatsSection() {
  const { ref: headRef, visible: headVisible } = useReveal();

  return (
    <section style={{ padding: "120px 48px", background: "#060608", position: "relative", overflow: "hidden" }}>
      {/* Decorative line */}
      <div style={{
        position: "absolute", top: 0, left: "10%", right: "10%", height: "1px",
        background: "linear-gradient(90deg, transparent, rgba(123,47,255,0.2), rgba(201,169,110,0.2), transparent)",
      }} />

      <div ref={headRef} style={{
        textAlign: "center", marginBottom: "80px",
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.9s ease",
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#7B2FFF", marginBottom: "20px" }}>✦ BY THE NUMBERS ✦</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0, letterSpacing: "-0.02em" }}>
          The work <em style={{ color: "#C9A96E" }}>speaks.</em>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "2px", maxWidth: "1000px", margin: "0 auto", border: "1px solid rgba(123,47,255,0.1)", borderRadius: "4px", overflow: "hidden" }}>
        {stats.map((s, i) => (
          <StatCard key={i} stat={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function StatCard({ stat, index }: { stat: typeof stats[0]; index: number }) {
  const { ref, visible } = useReveal(0.2);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: "52px 40px",
        background: hovered ? "rgba(123,47,255,0.06)" : "rgba(10,10,14,0.8)",
        borderRight: index < stats.length - 1 ? "1px solid rgba(123,47,255,0.1)" : "none",
        transition: "background 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
        transitionDelay: `${index * 0.1}s`,
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}
    >
      {/* Top accent line on hover */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: "linear-gradient(90deg, transparent, #7B2FFF, #C9A96E, transparent)",
        opacity: hovered ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      <div style={{
        fontFamily: "Georgia, serif",
        fontSize: "clamp(2.5rem, 5vw, 3.8rem)",
        fontStyle: "italic",
        fontWeight: 300,
        background: "linear-gradient(135deg, #7B2FFF, #C9A96E)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        lineHeight: 1,
        marginBottom: "16px",
        letterSpacing: "-0.02em",
      }}>
        <Counter to={stat.value} suffix={stat.suffix} />
      </div>

      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", color: "#F0EEF6", marginBottom: "8px", textTransform: "uppercase" }}>
        {stat.label}
      </div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "12px", fontStyle: "italic", color: "rgba(240,238,246,0.3)" }}>
        {stat.sub}
      </div>
    </div>
  );
}

// ── Process Section ───────────────────────────────────────────────────────────
const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We start with a deep conversation — understanding your brand, your audience, and the feeling you want to create. No briefs. Just real dialogue.",
    color: "#7B2FFF",
    icon: "◉",
    duration: "1–2 days",
  },
  {
    num: "02",
    title: "Concepting",
    desc: "We sketch the universe. Moodboards, motion references, visual directions. You choose what resonates — then we go all in.",
    color: "#9B5FFF",
    icon: "◈",
    duration: "2–3 days",
  },
  {
    num: "03",
    title: "Creation",
    desc: "This is where the magic happens. Frame by frame, pixel by pixel, line by line — built with precision and obsession.",
    color: "#B87FFF",
    icon: "✦",
    duration: "3–7 days",
  },
  {
    num: "04",
    title: "Refinement",
    desc: "We iterate until it's exactly right. Your feedback shapes everything. We don't stop until it feels inevitable.",
    color: "#C9A96E",
    icon: "⬡",
    duration: "1–3 days",
  },
  {
    num: "05",
    title: "Delivery",
    desc: "Clean files, clear handoff, zero friction. And we stay available after — because great partnerships don't end at delivery.",
    color: "#E8C98E",
    icon: "∞",
    duration: "1 day",
  },
];

function ProcessSection() {
  const { ref: headRef, visible: headVisible } = useReveal();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <section style={{ padding: "140px 48px", background: "#0a0a0f", position: "relative", overflow: "hidden" }}>
      {/* Ambient */}
      <div style={{ position: "absolute", top: "40%", left: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(123,47,255,0.04), transparent 70%)", pointerEvents: "none" }} />

      <div ref={headRef} style={{
        textAlign: "center", marginBottom: "100px",
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.9s ease",
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#C9A96E", marginBottom: "24px" }}>✦ HOW WE WORK ✦</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0, marginBottom: "16px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          The process behind<br />
          <em style={{ background: "linear-gradient(135deg, #7B2FFF, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>the magic.</em>
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "rgba(240,238,246,0.35)", margin: "0 auto", fontStyle: "italic", maxWidth: "440px", lineHeight: 1.8 }}>
          Every project follows a ritual. Refined over hundreds of deliveries.
        </p>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "28px auto 0" }} />
      </div>

      {/* Steps */}
      <div style={{ maxWidth: "900px", margin: "0 auto", position: "relative" }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute", left: "calc(50% - 0.5px)", top: "24px", bottom: "24px",
          width: "1px",
          background: "linear-gradient(180deg, transparent, rgba(123,47,255,0.3) 10%, rgba(201,169,110,0.3) 90%, transparent)",
          pointerEvents: "none",
        }} />

        {steps.map((step, i) => (
          <ProcessStep key={i} step={step} index={i} isActive={activeStep === i} onHover={setActiveStep} />
        ))}
      </div>
    </section>
  );
}

function ProcessStep({ step, index, isActive, onHover }: {
  step: typeof steps[0];
  index: number;
  isActive: boolean;
  onHover: (i: number | null) => void;
}) {
  const { ref, visible } = useReveal(0.25);
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} style={{
      display: "flex",
      justifyContent: isLeft ? "flex-start" : "flex-end",
      marginBottom: "60px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : `translateX(${isLeft ? "-40px" : "40px"})`,
      transition: `all 0.8s ease ${index * 0.12}s`,
      position: "relative",
    }}>
      {/* Center dot */}
      <div style={{
        position: "absolute", left: "50%", top: "28px",
        transform: "translate(-50%, -50%)",
        width: isActive ? "14px" : "8px",
        height: isActive ? "14px" : "8px",
        borderRadius: "50%",
        background: isActive ? `linear-gradient(135deg, ${step.color}, #C9A96E)` : step.color,
        boxShadow: isActive ? `0 0 20px ${step.color}88` : `0 0 8px ${step.color}44`,
        transition: "all 0.4s ease",
        zIndex: 2,
      }} />

      <div
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        style={{
          width: "44%",
          padding: "32px 36px",
          background: isActive ? `rgba(${step.color === "#7B2FFF" ? "123,47,255" : "201,169,110"},0.07)` : "rgba(12,12,18,0.8)",
          border: `1px solid ${isActive ? step.color + "44" : step.color + "18"}`,
          borderRadius: "8px",
          cursor: "pointer",
          transition: "all 0.4s ease",
          boxShadow: isActive ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${step.color}12` : "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: step.color, opacity: 0.7 }}>{step.num}</span>
          <span style={{ fontSize: "18px", color: step.color, filter: `drop-shadow(0 0 6px ${step.color})` }}>{step.icon}</span>
        </div>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontStyle: "italic", color: "#F0EEF6", margin: "0 0 12px", letterSpacing: "-0.01em" }}>{step.title}</h3>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(240,238,246,0.5)", margin: "0 0 20px", lineHeight: 1.8, fontStyle: "italic" }}>{step.desc}</p>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "16px", height: "1px", background: step.color }} />
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", color: step.color, opacity: 0.6 }}>{step.duration}</span>
        </div>
      </div>
    </div>
  );
}

// ── Tools & Stack ─────────────────────────────────────────────────────────────
const tools = [
  { name: "After Effects", cat: "Motion", icon: "Ae" },
  { name: "Figma", cat: "Design", icon: "Fi" },
  { name: "Next.js", cat: "Web", icon: "Nx" },
  { name: "Three.js", cat: "3D/WebGL", icon: "3J" },
  { name: "Framer", cat: "Prototyping", icon: "Fr" },
  { name: "GSAP", cat: "Animation", icon: "GS" },
  { name: "Lottie", cat: "Animation", icon: "Lo" },
  { name: "Blender", cat: "3D", icon: "Bl" },
  { name: "Premiere Pro", cat: "Video", icon: "Pr" },
  { name: "Tailwind CSS", cat: "Styling", icon: "Tw" },
  { name: "React", cat: "Web", icon: "Re" },
  { name: "Spline", cat: "3D/Web", icon: "Sp" },
];

function ToolsSection() {
  const { ref: headRef, visible: headVisible } = useReveal();

  return (
    <section style={{ padding: "120px 48px 140px", background: "#060608", position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "800px", height: "300px",
        background: "radial-gradient(ellipse, rgba(201,169,110,0.04), transparent 70%)",
        pointerEvents: "none",
      }} />

      <div ref={headRef} style={{
        textAlign: "center", marginBottom: "72px",
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(30px)",
        transition: "all 0.9s ease",
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#7B2FFF", marginBottom: "20px" }}>✦ THE ARSENAL ✦</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.8rem, 4vw, 3rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0, letterSpacing: "-0.02em" }}>
          Built with <em style={{ color: "#C9A96E" }}>the best.</em>
        </h2>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "center", maxWidth: "900px", margin: "0 auto" }}>
        {tools.map((tool, i) => (
          <ToolBadge key={i} tool={tool} index={i} />
        ))}
      </div>
    </section>
  );
}

function ToolBadge({ tool, index }: { tool: typeof tools[0]; index: number }) {
  const { ref, visible } = useReveal(0.1);
  const [hovered, setHovered] = useState(false);

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        padding: "12px 20px",
        background: hovered ? "rgba(123,47,255,0.1)" : "rgba(12,12,18,0.8)",
        border: `1px solid ${hovered ? "rgba(123,47,255,0.4)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "4px",
        cursor: "default",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.4), 0 0 20px rgba(123,47,255,0.12)" : "none",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.04}s`,
      }}
    >
      <div style={{
        width: "28px", height: "28px", borderRadius: "4px",
        background: hovered ? "linear-gradient(135deg, #7B2FFF22, #C9A96E22)" : "rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.05em",
        color: hovered ? "#C9A96E" : "rgba(240,238,246,0.4)",
        fontWeight: "bold",
        transition: "all 0.3s",
        border: `1px solid ${hovered ? "rgba(201,169,110,0.3)" : "rgba(255,255,255,0.04)"}`,
      }}>
        {tool.icon}
      </div>
      <div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: hovered ? "#F0EEF6" : "rgba(240,238,246,0.6)", transition: "color 0.3s" }}>
          {tool.name}
        </div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "10px", fontStyle: "italic", color: "rgba(240,238,246,0.25)", marginTop: "2px" }}>
          {tool.cat}
        </div>
      </div>
    </div>
  );
}

// ── Export all ────────────────────────────────────────────────────────────────
export { StatsSection, ProcessSection, ToolsSection };