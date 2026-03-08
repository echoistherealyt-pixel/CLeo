"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";

// ── Types ─────────────────────────────────────────────────────────────────────
type DemoKey = "particles" | "glitch" | "liquid" | "tilt" | "morph" | "audio" | "typewriter" | "palette";

interface DemoConfig {
  key: DemoKey;
  icon: string;
  size?: "normal" | "wide";
}

// ── Demo configs (static, no text) ───────────────────────────────────────────
const DEMOS: DemoConfig[] = [
  { key: "particles", icon: "✦" },
  { key: "glitch",    icon: "◈" },
  { key: "liquid",    icon: "◉" },
  { key: "tilt",      icon: "⬡" },
  { key: "morph",     icon: "◎", size: "wide" },
  { key: "audio",     icon: "∿" },
  { key: "typewriter",icon: "Aa" },
  { key: "palette",   icon: "◐" },
];

// ── useReveal ─────────────────────────────────────────────────────────────────
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

// ══════════════════════════════════════════════════════════════════════════════
// DEMO COMPONENTS
// ══════════════════════════════════════════════════════════════════════════════

// ── 1. Particle Network ───────────────────────────────────────────────────────
function ParticleDemo({ active }: { active: boolean }) {
  const { t } = useTranslation("common");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width = canvas.offsetWidth;
    const H = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 120 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.6, vy: (Math.random() - 0.5) * 0.6,
      r: Math.random() * 2 + 1,
    }));

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mouse = mouseRef.current;
      particles.forEach(p => {
        const dx = mouse.x - p.x, dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { p.vx -= dx / dist * 0.3; p.vy -= dy / dist * 0.3; }
        p.vx *= 0.98; p.vy *= 0.98;
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123,47,255,${0.5 + p.r * 0.1})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 90) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(201,169,110,${(1 - d / 90) * 0.35})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); canvas.removeEventListener("mousemove", onMove); };
  }, [active]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.3em", color: "rgba(201,169,110,0.5)" }}>{t("work.moveYourCursor")}</div>
    </div>
  );
}

// ── 2. Glitch Typography ──────────────────────────────────────────────────────
function GlitchDemo({ active }: { active: boolean }) {
  const { t } = useTranslation("common");
  const [glitching, setGlitching] = useState(false);
  const word = "CLEO";

  const triggerGlitch = () => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 800);
  };

  return (
    <div onClick={triggerGlitch} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: "20px" }}>
      <div style={{ position: "relative", userSelect: "none" }}>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 8vw, 5rem)", fontStyle: "italic", color: "#F0EEF6", letterSpacing: "0.1em", display: "block", textShadow: glitching ? "3px 0 #7B2FFF, -3px 0 #C9A96E" : "none", animation: glitching ? "glitch 0.1s infinite" : "none" }}>{word}</span>
        {glitching && <>
          <span style={{ position: "absolute", inset: 0, fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 8vw, 5rem)", fontStyle: "italic", color: "#7B2FFF", opacity: 0.7, letterSpacing: "0.1em", clipPath: "inset(30% 0 50% 0)", transform: "translateX(-4px)", animation: "glitch2 0.15s infinite" }}>{word}</span>
          <span style={{ position: "absolute", inset: 0, fontFamily: "Georgia, serif", fontSize: "clamp(3rem, 8vw, 5rem)", fontStyle: "italic", color: "#C9A96E", opacity: 0.7, letterSpacing: "0.1em", clipPath: "inset(60% 0 10% 0)", transform: "translateX(4px)", animation: "glitch3 0.12s infinite" }}>{word}</span>
        </>}
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.35em", color: "rgba(240,238,246,0.3)" }}>{t("work.clickToGlitch")}</div>
      <style>{`
        @keyframes glitch { 0%,100%{transform:none} 25%{transform:translate(-2px,1px)} 75%{transform:translate(2px,-1px)} }
        @keyframes glitch2 { 0%,100%{clip-path:inset(30% 0 50% 0)} 50%{clip-path:inset(10% 0 70% 0)} }
        @keyframes glitch3 { 0%,100%{clip-path:inset(60% 0 10% 0)} 50%{clip-path:inset(75% 0 5% 0)} }
      `}</style>
    </div>
  );
}

// ── 3. Liquid Cursor ──────────────────────────────────────────────────────────
function LiquidDemo({ active }: { active: boolean }) {
  const { t } = useTranslation("common");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailRef = useRef<{ x: number; y: number; a: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      trailRef.current.push({ x: mouseRef.current.x, y: mouseRef.current.y, a: 1 });
      if (trailRef.current.length > 60) trailRef.current.shift();
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trailRef.current = trailRef.current.map(p => ({ ...p, a: p.a * 0.94 })).filter(p => p.a > 0.01);
      trailRef.current.forEach((p, i) => {
        const size = (i / trailRef.current.length) * 18 + 2;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123,47,255,${p.a * 0.4})`;
        ctx.fill();
      });
      if (trailRef.current.length > 2) {
        ctx.beginPath();
        ctx.moveTo(trailRef.current[0].x, trailRef.current[0].y);
        trailRef.current.forEach(p => ctx.lineTo(p.x, p.y));
        ctx.strokeStyle = `rgba(201,169,110,0.3)`;
        ctx.lineWidth = 1.5; ctx.stroke();
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); canvas.removeEventListener("mousemove", onMove); };
  }, [active]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center", pointerEvents: "none" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "13px", fontStyle: "italic", color: "rgba(240,238,246,0.2)" }}>{t("work.moveYourCursor")}</div>
      </div>
    </div>
  );
}

// ── 4. 3D Card Tilt ───────────────────────────────────────────────────────────
function TiltDemo({ active }: { active: boolean }) {
  const { t } = useTranslation("common");
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setTilt({ x: ((e.clientY - r.top) / r.height - 0.5) * -30, y: ((e.clientX - r.left) / r.width - 0.5) * 30 });
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div ref={cardRef} onMouseMove={onMove} onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
        style={{ width: "200px", height: "260px", borderRadius: "16px", background: "linear-gradient(135deg, rgba(123,47,255,0.2), rgba(201,169,110,0.1))", border: "1px solid rgba(123,47,255,0.4)", cursor: "pointer", transition: hovered ? "none" : "transform 0.6s ease", transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, boxShadow: hovered ? "0 40px 100px rgba(0,0,0,0.7), 0 0 60px rgba(123,47,255,0.2)" : "0 10px 40px rgba(0,0,0,0.4)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", padding: "32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "100px", height: "100px", background: "radial-gradient(circle, rgba(201,169,110,0.15), transparent 70%)", borderRadius: "50%", transform: `translate(${tilt.y * 0.5}px, ${tilt.x * 0.5}px)`, transition: hovered ? "transform 0.05s" : "transform 0.6s" }} />
        <span style={{ fontSize: "36px", filter: "drop-shadow(0 0 12px #7B2FFF)" }}>⬡</span>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", color: "#C9A96E" }}>CLEO STUDIO</div>
        <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #7B2FFF, transparent)" }} />
        <div style={{ fontFamily: "Georgia, serif", fontSize: "11px", fontStyle: "italic", color: "rgba(240,238,246,0.5)", textAlign: "center", lineHeight: 1.6 }}>Digital Creative Studio</div>
      </div>
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.25)" }}>{t("work.hoverCard")}</div>
    </div>
  );
}

// ── 5. Morphing Gradient ──────────────────────────────────────────────────────
function MorphDemo({ active }: { active: boolean }) {
  const { t } = useTranslation("common");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const orbs = [
      { x: W * 0.3, y: H * 0.4, vx: 0.4, vy: 0.3, r: W * 0.35, color: "123,47,255" },
      { x: W * 0.7, y: H * 0.5, vx: -0.3, vy: 0.5, r: W * 0.3, color: "201,169,110" },
      { x: W * 0.5, y: H * 0.3, vx: 0.2, vy: -0.4, r: W * 0.25, color: "168,85,247" },
    ];

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      orbs.forEach(orb => {
        orb.x += orb.vx; orb.y += orb.vy;
        if (orb.x < 0 || orb.x > W) orb.vx *= -1;
        if (orb.y < 0 || orb.y > H) orb.vy *= -1;
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(${orb.color},0.25)`);
        grad.addColorStop(1, `rgba(${orb.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });
      t++;
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.3em", color: "rgba(201,169,110,0.4)" }}>{t("work.liveRender")}</div>
    </div>
  );
}

// ── 6. Audio Visualizer ───────────────────────────────────────────────────────
function AudioDemo({ active }: { active: boolean }) {
  const { t } = useTranslation("common");
  const [playing, setPlaying] = useState(false);
  const animRef = useRef<number>(0);
  const barsRef = useRef<(HTMLDivElement | null)[]>([]);
  const timeRef = useRef(0);

  useEffect(() => {
    if (!active || !playing) { cancelAnimationFrame(animRef.current); return; }
    const animate = () => {
      timeRef.current += 0.05;
      barsRef.current.forEach((bar, i) => {
        if (!bar) return;
        const h = 20 + Math.abs(Math.sin(timeRef.current * 1.5 + i * 0.4) * 60) + Math.abs(Math.sin(timeRef.current * 0.8 + i * 0.2) * 30);
        bar.style.height = `${h}px`;
        const ratio = h / 110;
        bar.style.background = `linear-gradient(180deg, rgb(${Math.round(123 + ratio * 78)},${Math.round(47 + ratio * 122)},255), #7B2FFF)`;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [active, playing]);

  return (
    <div onClick={() => setPlaying(p => !p)} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", cursor: "pointer" }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "4px", height: "110px" }}>
        {Array.from({ length: 32 }).map((_, i) => (
          <div key={i} ref={el => { barsRef.current[i] = el; }}
            style={{ width: "6px", height: "20px", background: "#7B2FFF", borderRadius: "3px 3px 0 0", transition: playing ? "none" : "height 0.5s ease", opacity: 0.8 }} />
        ))}
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.3)" }}>
        {playing ? t("work.playing") : t("work.clickToPlay")}
      </div>
    </div>
  );
}

// ── 7. Typewriter Effect ──────────────────────────────────────────────────────
function TypewriterDemo({ active }: { active: boolean }) {
  const { t } = useTranslation("common");
  const phrases = t("work.typewriterPhrases", { returnObjects: true }) as string[];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!active) return;
    const phrase = phrases[phraseIndex];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(phrase.slice(0, charIndex + 1));
        if (charIndex + 1 === phrase.length) { setTimeout(() => setDeleting(true), 1400); return; }
        setCharIndex(c => c + 1);
      } else {
        setText(phrase.slice(0, charIndex - 1));
        if (charIndex - 1 === 0) { setDeleting(false); setPhraseIndex(i => (i + 1) % phrases.length); setCharIndex(0); return; }
        setCharIndex(c => c - 1);
      }
    }, deleting ? 40 : 80);
    return () => clearTimeout(timeout);
  }, [active, charIndex, deleting, phraseIndex, phrases]);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1rem, 3vw, 1.6rem)", fontStyle: "italic", color: "#F0EEF6", minHeight: "2.5em", lineHeight: 1.5 }}>
          {text}<span style={{ borderRight: "2px solid #7B2FFF", marginLeft: "2px", animation: "blink 1s infinite" }} />
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "20px" }}>
          {phrases.map((_, i) => (
            <div key={i} onClick={() => { setPhraseIndex(i); setCharIndex(0); setDeleting(false); }}
              style={{ width: i === phraseIndex ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i === phraseIndex ? "#7B2FFF" : "rgba(240,238,246,0.2)", transition: "all 0.3s", cursor: "pointer" }} />
          ))}
        </div>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.25)", marginTop: "12px" }}>{t("work.clickDots")}</div>
      </div>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  );
}

// ── 8. Color Palettes ─────────────────────────────────────────────────────────
const PALETTES = [
  { name: "Void", colors: ["#0A0A0F", "#12121A", "#1A1A28", "#7B2FFF", "#C9A96E"] },
  { name: "Ember", colors: ["#0F0A0A", "#1A0F0F", "#2A1515", "#FF4D2F", "#FFB347"] },
  { name: "Ocean", colors: ["#050F15", "#0A1F2A", "#0F3045", "#0EA5E9", "#38BDF8"] },
  { name: "Forest", colors: ["#050F08", "#0A1F0F", "#0F3018", "#22C55E", "#86EFAC"] },
  { name: "Rose",  colors: ["#0F050A", "#200A15", "#350F20", "#EC4899", "#F9A8D4"] },
];

function PaletteDemo({ active }: { active: boolean }) {
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState(0);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", padding: "20px" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        {PALETTES[selected].colors.map((c, i) => (
          <div key={i} style={{ width: "clamp(30px, 7vw, 48px)", height: "clamp(70px, 15vw, 100px)", borderRadius: "24px", background: c, boxShadow: i === 3 ? `0 0 20px ${c}66` : "none", transition: "all 0.5s ease" }} />
        ))}
      </div>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "15px", fontStyle: "italic", color: "rgba(240,238,246,0.6)", letterSpacing: "0.1em" }}>{PALETTES[selected].name}</div>
      <div style={{ display: "flex", gap: "8px" }}>
        {PALETTES.map((p, i) => (
          <div key={i} onClick={() => setSelected(i)}
            style={{ width: "10px", height: "10px", borderRadius: "50%", background: p.colors[3], cursor: "pointer", transform: i === selected ? "scale(1.5)" : "scale(1)", transition: "transform 0.3s", boxShadow: i === selected ? `0 0 10px ${p.colors[3]}` : "none" }} />
        ))}
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.25)" }}>{t("work.clickDots")}</div>
    </div>
  );
}

// ── Demo renderer ─────────────────────────────────────────────────────────────
function renderDemo(key: DemoKey, active: boolean) {
  switch (key) {
    case "particles":   return <ParticleDemo active={active} />;
    case "glitch":      return <GlitchDemo active={active} />;
    case "liquid":      return <LiquidDemo active={active} />;
    case "tilt":        return <TiltDemo active={active} />;
    case "morph":       return <MorphDemo active={active} />;
    case "audio":       return <AudioDemo active={active} />;
    case "typewriter":  return <TypewriterDemo active={active} />;
    case "palette":     return <PaletteDemo active={active} />;
  }
}

// ── Demo Card ─────────────────────────────────────────────────────────────────
function DemoCard({ demo, index }: { demo: DemoConfig; index: number }) {
  const { t } = useTranslation("common");
  const [active, setActive] = useState(false);
  const { ref, visible } = useReveal(0.1);

  const title    = t(`work.demos.${demo.key}.title`);
  const category = t(`work.demos.${demo.key}.category`);
  const desc     = t(`work.demos.${demo.key}.desc`);

  return (
    <div ref={ref} style={{
      gridColumn: demo.size === "wide" ? "span 2" : "span 1",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: `opacity 0.7s ease ${index * 0.08}s, transform 0.7s ease ${index * 0.08}s`,
    }}>
      <div style={{
        background: "rgba(10,10,15,0.8)",
        border: `1px solid ${active ? "rgba(123,47,255,0.5)" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "8px", overflow: "hidden",
        transition: "border-color 0.4s",
        boxShadow: active ? "0 0 40px rgba(123,47,255,0.1)" : "none",
      }}>
        {/* Header */}
        <div onClick={() => setActive(a => !a)}
          style={{ padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", borderBottom: `1px solid ${active ? "rgba(123,47,255,0.2)" : "rgba(255,255,255,0.04)"}`, transition: "border-color 0.3s" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <span style={{ fontSize: "20px", color: "#7B2FFF", filter: active ? "drop-shadow(0 0 8px #7B2FFF)" : "none", transition: "filter 0.3s" }}>{demo.icon}</span>
            <div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.2em", color: "#F0EEF6", marginBottom: "3px" }}>{title}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.2em", color: active ? "#C9A96E" : "rgba(240,238,246,0.3)", transition: "color 0.3s" }}>{category}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.25em", color: active ? "#7B2FFF" : "rgba(240,238,246,0.2)", border: `1px solid ${active ? "#7B2FFF44" : "rgba(255,255,255,0.08)"}`, padding: "3px 8px", borderRadius: "2px", transition: "all 0.3s" }}>
              {active ? t("work.live") : t("work.inactive")}
            </span>
            <div style={{ width: "24px", height: "24px", borderRadius: "50%", border: `1px solid ${active ? "#7B2FFF" : "rgba(255,255,255,0.12)"}`, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", background: active ? "rgba(123,47,255,0.2)" : "transparent" }}>
              <div style={{ width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `6px solid ${active ? "#7B2FFF" : "rgba(240,238,246,0.3)"}`, marginLeft: active ? "2px" : "2px", transform: active ? "rotate(90deg)" : "none", transition: "transform 0.3s" }} />
            </div>
          </div>
        </div>

        {/* Demo area */}
        {!active && (
          <div onClick={() => setActive(true)} style={{ height: "80px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", gap: "10px", opacity: 0.4 }}>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#F0EEF6" }}>{t("work.launch")}</span>
          </div>
        )}
        {active && (
          <div style={{ height: demo.size === "wide" ? "320px" : "260px", position: "relative" }}>
            {renderDemo(demo.key, active)}
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "14px 24px", borderTop: `1px solid rgba(255,255,255,0.04)` }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", fontStyle: "italic", color: "rgba(240,238,246,0.35)", margin: 0, lineHeight: 1.7 }}>{desc}</p>
        </div>
      </div>
    </div>
  );
}

// ── Main Work Section ─────────────────────────────────────────────────────────
export default function Work() {
  const { t } = useTranslation("common");
  const { ref: headRef, visible: headVisible } = useReveal();

  return (
    <section id="work" style={{ padding: "140px 48px", background: "#060608", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", right: "-8%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(123,47,255,0.04), transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <div ref={headRef} style={{ textAlign: "center", marginBottom: "80px", opacity: headVisible ? 1 : 0, transform: headVisible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.9s ease, transform 0.9s ease" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#7B2FFF", marginBottom: "24px" }}>{t("work.label")}</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.8rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0, marginBottom: "16px", lineHeight: 1.2, letterSpacing: "-0.02em" }}>
          {t("work.title")} <em style={{ color: "#C9A96E" }}>{t("work.titleAccent")}</em>
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "rgba(240,238,246,0.35)", margin: "0 auto", fontStyle: "italic", maxWidth: "500px", lineHeight: 1.8 }}>{t("work.sub")}</p>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #7B2FFF, #C9A96E, transparent)", margin: "28px auto 0" }} />
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px", maxWidth: "1100px", margin: "0 auto 80px" }}>
        {DEMOS.map((demo, i) => <DemoCard key={demo.key} demo={demo} index={i} />)}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontStyle: "italic", color: "rgba(240,238,246,0.5)", marginBottom: "24px" }}>
          {t("work.ctaSub")} <em style={{ color: "#C9A96E" }}>you.</em>
        </p>
        <a href="https://wa.me/message/DDNIUOL264WDB1" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", padding: "16px 48px", background: "linear-gradient(135deg, #7B2FFF, #9B5FFF)", color: "#F0EEF6", fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", textDecoration: "none", borderRadius: "2px", boxShadow: "0 0 40px rgba(123,47,255,0.3)" }}>
          {t("work.cta")}
        </a>
      </div>
    </section>
  );
}