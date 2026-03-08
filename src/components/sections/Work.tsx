"use client";

import { useState, useRef, useEffect, useCallback } from "react";

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

// ── Demo 1: Particle Network (existing, improved) ────────────────────────────
function ParticleDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2, vy: (Math.random() - 0.5) * 1.2,
      size: Math.random() * 2.5 + 0.5,
      color: Math.random() > 0.5 ? "#7B2FFF" : "#C9A96E",
    }));

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.fillStyle = "rgba(6,6,8,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      particles.forEach((p, i) => {
        const dx = mx - p.x, dy = my - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { p.vx -= dx * 0.004; p.vy -= dy * 0.004; }
        p.x += p.vx; p.y += p.vy; p.vx *= 0.97; p.vy *= 0.97;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        particles.slice(i + 1).forEach(q => {
          const d = Math.sqrt((p.x - q.x) ** 2 + (p.y - q.y) ** 2);
          if (d < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(123,47,255,${0.25 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        });
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = 0.85; ctx.fill(); ctx.globalAlpha = 1;
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); canvas.removeEventListener("mousemove", onMove); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "crosshair" }} />;
}

// ── Demo 2: Glitch Text ───────────────────────────────────────────────────────
function GlitchDemo() {
  const [text, setText] = useState("CLEO");
  const [glitching, setGlitching] = useState(false);
  const chars = "!@#$%^&*<>?/|\\[]{}ΔΨΩαβγδ01";

  const trigger = useCallback(() => {
    if (glitching) return;
    setGlitching(true);
    let count = 0;
    const interval = setInterval(() => {
      setText("CLEO".split("").map(c => Math.random() > 0.4 ? chars[Math.floor(Math.random() * chars.length)] : c).join(""));
      if (++count > 14) { clearInterval(interval); setText("CLEO"); setGlitching(false); }
    }, 55);
  }, [glitching]);

  return (
    <div onClick={trigger} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", cursor: "pointer", background: "#060608" }}>
      <div style={{ position: "relative" }}>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(3.5rem, 9vw, 5.5rem)", fontStyle: "italic", background: "linear-gradient(135deg, #7B2FFF, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", filter: glitching ? "blur(1.5px)" : "none", transition: "filter 0.08s", userSelect: "none", letterSpacing: "0.05em" }}>{text}</div>
        {glitching && <>
          <div style={{ position: "absolute", inset: 0, fontFamily: "Georgia, serif", fontSize: "clamp(3.5rem, 9vw, 5.5rem)", fontStyle: "italic", color: "#7B2FFF", opacity: 0.6, transform: "translate(4px,-2px)", letterSpacing: "0.05em", pointerEvents: "none" }}>{text}</div>
          <div style={{ position: "absolute", inset: 0, fontFamily: "Georgia, serif", fontSize: "clamp(3.5rem, 9vw, 5.5rem)", fontStyle: "italic", color: "#C9A96E", opacity: 0.6, transform: "translate(-4px,2px)", letterSpacing: "0.05em", pointerEvents: "none" }}>{text}</div>
        </>}
      </div>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.35em", color: "rgba(240,238,246,0.25)" }}>CLICK TO GLITCH</span>
    </div>
  );
}

// ── Demo 3: Liquid Cursor ─────────────────────────────────────────────────────
function LiquidDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const trailRef = useRef<{ x: number; y: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight;

    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      trailRef.current.push({ ...mouseRef.current });
      if (trailRef.current.length > 50) trailRef.current.shift();
    };
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.fillStyle = "rgba(6,6,8,0.22)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      trailRef.current.forEach((p, i) => {
        const ratio = i / trailRef.current.length;
        const r = ratio * 22;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        g.addColorStop(0, `rgba(123,47,255,${ratio * 0.9})`);
        g.addColorStop(0.6, `rgba(168,85,247,${ratio * 0.35})`);
        g.addColorStop(1, "transparent");
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
      });
      const m = mouseRef.current;
      if (m.x) { ctx.beginPath(); ctx.arc(m.x, m.y, 5, 0, Math.PI * 2); ctx.fillStyle = "#C9A96E"; ctx.shadowBlur = 12; ctx.shadowColor = "#C9A96E"; ctx.fill(); ctx.shadowBlur = 0; }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); canvas.removeEventListener("mousemove", onMove); };
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "none" }} />
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.2)", whiteSpace: "nowrap" }}>MOVE YOUR CURSOR</div>
    </div>
  );
}

// ── Demo 4: 3D Card Tilt ──────────────────────────────────────────────────────
function TiltDemo() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  const onMove = (e: React.MouseEvent) => {
    const r = cardRef.current!.getBoundingClientRect();
    setTilt({ x: ((e.clientX - r.left) / r.width - 0.5) * 28, y: -((e.clientY - r.top) / r.height - 0.5) * 28 });
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#060608", perspective: "900px", flexDirection: "column", gap: "16px" }}>
      <div ref={cardRef} onMouseMove={onMove} onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ width: "180px", height: "240px", background: "rgba(15,15,22,0.9)", border: "1px solid rgba(123,47,255,0.3)", borderRadius: "14px", transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`, transition: tilt.x === 0 ? "transform 0.7s ease" : "transform 0.08s ease", cursor: "pointer", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 50px rgba(123,47,255,0.12)" }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(123,47,255,0.22), transparent 65%)`, transition: "background 0.08s" }} />
        <span style={{ fontSize: "32px", color: "#7B2FFF", filter: "drop-shadow(0 0 14px #7B2FFF)", position: "relative" }}>✦</span>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontStyle: "italic", color: "#F0EEF6", position: "relative" }}>Cleo</div>
        <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #7B2FFF, #C9A96E)", position: "relative" }} />
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.25em", color: "rgba(240,238,246,0.35)", position: "relative" }}>DIGITAL STUDIO</div>
      </div>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.18)" }}>HOVER THE CARD</span>
    </div>
  );
}

// ── Demo 5: NEW — Morphing Gradient ──────────────────────────────────────────
function MorphGradientDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const orbs = [
      { x: 0.3, y: 0.4, r: 0.35, vx: 0.0008, vy: 0.0012, color: "123,47,255" },
      { x: 0.7, y: 0.6, r: 0.28, vx: -0.0010, vy: 0.0007, color: "201,169,110" },
      { x: 0.5, y: 0.3, r: 0.22, vx: 0.0006, vy: -0.0009, color: "168,85,247" },
    ];

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#060608";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < 0.1 || orb.x > 0.9) orb.vx *= -1;
        if (orb.y < 0.1 || orb.y > 0.9) orb.vy *= -1;

        const gx = orb.x * canvas.width;
        const gy = orb.y * canvas.height;
        const gr = orb.r * Math.min(canvas.width, canvas.height);
        const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr);
        g.addColorStop(0, `rgba(${orb.color},0.55)`);
        g.addColorStop(0.5, `rgba(${orb.color},0.15)`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.globalCompositeOperation = "screen";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "source-over";
      });

      // Overlay noise vignette
      const vignette = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, canvas.width * 0.2,
        canvas.width / 2, canvas.height / 2, canvas.width * 0.7
      );
      vignette.addColorStop(0, "transparent");
      vignette.addColorStop(1, "rgba(6,6,8,0.7)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.2rem, 4vw, 2rem)", fontStyle: "italic", color: "rgba(240,238,246,0.8)", marginBottom: "8px" }}>Fluid Universe</div>
          <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, #7B2FFF, #C9A96E)", margin: "0 auto" }} />
        </div>
      </div>
      <div style={{ position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.2)", whiteSpace: "nowrap" }}>LIVE RENDER</div>
    </div>
  );
}

// ── Demo 6: NEW — Audio Visualizer (fake/animated) ───────────────────────────
function AudioVisualizerDemo() {
  const [playing, setPlaying] = useState(false);
  const [bars] = useState(() => Array.from({ length: 32 }, (_, i) => ({ phase: Math.random() * Math.PI * 2, freq: 0.8 + Math.random() * 2 })));
  const animRef = useRef<number>(0);
 const barsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!playing) {
      barsRef.current.forEach(b => { if (b) b.style.height = "4px"; });
      return;
    }

    const animate = () => {
      const t = performance.now() / 1000;
      barsRef.current.forEach((b, i) => {
        if (!b) return;
        const bar = bars[i];
        const h = 8 + Math.abs(Math.sin(t * bar.freq + bar.phase)) * 80 + Math.abs(Math.sin(t * bar.freq * 0.5 + bar.phase)) * 30;
        b.style.height = `${h}px`;
      });
      animRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animRef.current);
  }, [playing]);

  return (
    <div onClick={() => setPlaying(p => !p)} style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "24px", cursor: "pointer", background: "#060608", userSelect: "none" }}>
      {/* Bars */}
      <div style={{ display: "flex", alignItems: "center", gap: "3px", height: "120px" }}>
        {bars.map((_, i) => (
          <div key={i} ref={el => { barsRef.current[i] = el; }} style={{
            width: "4px", height: "4px",
            borderRadius: "2px",
            background: `hsl(${250 + (i / bars.length) * 60}, 70%, ${50 + (i / bars.length) * 20}%)`,
            transition: playing ? "height 0.08s ease" : "height 0.4s ease",
            boxShadow: playing ? `0 0 6px hsl(${250 + (i / bars.length) * 60}, 70%, 60%)` : "none",
          }} />
        ))}
      </div>

      {/* Play button */}
      <div style={{
        width: "48px", height: "48px", borderRadius: "50%",
        border: "1px solid rgba(123,47,255,0.5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.3s",
        background: playing ? "rgba(123,47,255,0.2)" : "transparent",
        boxShadow: playing ? "0 0 20px rgba(123,47,255,0.4)" : "none",
      }}>
        {playing
          ? <div style={{ display: "flex", gap: "4px" }}><div style={{ width: "3px", height: "16px", background: "#7B2FFF", borderRadius: "1px" }} /><div style={{ width: "3px", height: "16px", background: "#7B2FFF", borderRadius: "1px" }} /></div>
          : <div style={{ width: 0, height: 0, borderTop: "8px solid transparent", borderBottom: "8px solid transparent", borderLeft: "14px solid #7B2FFF", marginLeft: "3px" }} />
        }
      </div>

      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.25)" }}>
        {playing ? "PLAYING — CLICK TO PAUSE" : "CLICK TO PLAY"}
      </span>
    </div>
  );
}

// ── Demo 7: NEW — Type Writer ─────────────────────────────────────────────────
function TypewriterDemo() {
  const phrases = [
    "We build experiences.",
    "Motion that captivates.",
    "Design that converts.",
    "Code that performs.",
    "Art that endures.",
  ];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);
 const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    const phrase = phrases[phraseIdx];

    if (typing) {
      if (displayed.length < phrase.length) {
        timeoutRef.current = setTimeout(() => setDisplayed(phrase.slice(0, displayed.length + 1)), 55);
      } else {
        timeoutRef.current = setTimeout(() => setTyping(false), 1800);
      }
    } else {
      if (displayed.length > 0) {
        timeoutRef.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 28);
      } else {
        setPhraseIdx(p => (p + 1) % phrases.length);
        setTyping(true);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [displayed, typing, phraseIdx]);

  const colorIdx = phraseIdx % 2 === 0 ? "#7B2FFF" : "#C9A96E";

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", background: "#060608", padding: "24px" }}>
      <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 3.5vw, 1.6rem)", fontStyle: "italic", textAlign: "center", lineHeight: 1.5, minHeight: "3.2em", display: "flex", alignItems: "center" }}>
        <span style={{ color: "rgba(240,238,246,0.7)" }}>{displayed}</span>
        <span style={{
          display: "inline-block", width: "2px", height: "1.1em",
          background: colorIdx, marginLeft: "2px",
          animation: "blink 0.8s step-end infinite",
          verticalAlign: "middle",
          boxShadow: `0 0 6px ${colorIdx}`,
        }} />
      </div>
      <div style={{ display: "flex", gap: "6px" }}>
        {phrases.map((_, i) => (
          <div key={i} style={{ width: i === phraseIdx ? "18px" : "5px", height: "2px", borderRadius: "1px", background: i === phraseIdx ? colorIdx : "rgba(255,255,255,0.15)", transition: "all 0.4s ease" }} />
        ))}
      </div>
      <style>{`@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }`}</style>
    </div>
  );
}

// ── Demo 8: NEW — Color Palette Generator ────────────────────────────────────
function PaletteDemo() {
  const palettes = [
    { name: "Midnight Luxury", colors: ["#060608", "#1a0a2e", "#7B2FFF", "#C9A96E", "#F0EEF6"] },
    { name: "Ocean Depth", colors: ["#040d1a", "#0a2040", "#1565c0", "#42a5f5", "#e3f2fd"] },
    { name: "Ember Glow", colors: ["#0d0500", "#2d0f00", "#bf360c", "#ff6d00", "#fff8e1"] },
    { name: "Forest Still", colors: ["#0a0f09", "#1b2e1a", "#2e7d32", "#81c784", "#f1f8e9"] },
    { name: "Rose Cipher", colors: ["#0f0507", "#2d0b14", "#880e4f", "#f06292", "#fce4ec"] },
  ];
  const [activeIdx, setActiveIdx] = useState(0);
  const palette = palettes[activeIdx];

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", background: "#060608", padding: "24px" }}>
      {/* Color swatches */}
      <div style={{ display: "flex", gap: "6px", borderRadius: "8px", overflow: "hidden" }}>
        {palette.colors.map((color, i) => (
          <div key={i} style={{
            width: "48px", height: "80px",
            background: color,
            borderRadius: i === 0 ? "8px 0 0 8px" : i === palette.colors.length - 1 ? "0 8px 8px 0" : "0",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            cursor: "pointer",
            position: "relative",
          }}>
            <div style={{
              position: "absolute", bottom: "-20px", left: "50%", transform: "translateX(-50%)",
              fontFamily: "'Space Mono', monospace", fontSize: "7px", color: "rgba(240,238,246,0.3)",
              whiteSpace: "nowrap", letterSpacing: "0.05em",
            }}>{color}</div>
          </div>
        ))}
      </div>

      <div style={{ fontFamily: "Georgia, serif", fontSize: "13px", fontStyle: "italic", color: "rgba(240,238,246,0.4)", marginTop: "16px" }}>{palette.name}</div>

      {/* Navigation dots */}
      <div style={{ display: "flex", gap: "8px" }}>
        {palettes.map((_, i) => (
          <button key={i} onClick={() => setActiveIdx(i)} style={{
            width: i === activeIdx ? "20px" : "6px",
            height: "6px", borderRadius: "3px",
            background: i === activeIdx ? "linear-gradient(90deg, #7B2FFF, #C9A96E)" : "rgba(255,255,255,0.15)",
            border: "none", cursor: "pointer",
            transition: "all 0.4s ease", padding: 0,
          }} />
        ))}
      </div>

      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.2)" }}>CLICK DOTS TO SWITCH</span>
    </div>
  );
}

// ── Projects Data ─────────────────────────────────────────────────────────────
const projects = [
  { id: 1, title: "Particle Network", category: "Animation", desc: "120 interactive particles react to your cursor — connecting and repelling in real time.", demo: "particles", color: "#7B2FFF", icon: "✦", size: "normal" },
  { id: 2, title: "Glitch Typography", category: "Motion Design", desc: "Text that breaks reality on command. Click and watch it dissolve.", demo: "glitch", color: "#C9A96E", icon: "◈", size: "normal" },
  { id: 3, title: "Liquid Cursor", category: "UI Effect", desc: "A fluid purple trail follows every move — like paint on dark water.", demo: "liquid", color: "#A855F7", icon: "◉", size: "normal" },
  { id: 4, title: "3D Card Tilt", category: "UI / UX", desc: "Cards with real depth — light shifts as you move, revealing dimension.", demo: "tilt", color: "#C9A96E", icon: "⬡", size: "normal" },
  { id: 5, title: "Morphing Gradient", category: "Visual Design", desc: "Organic fluid orbs drifting through each other — infinite and alive.", demo: "morph", color: "#7B2FFF", icon: "◎", size: "wide" },
  { id: 6, title: "Audio Visualizer", category: "Motion / Sound", desc: "32 bars that pulse with imaginary music. The rhythm is the design.", demo: "audio", color: "#A855F7", icon: "∿", size: "normal" },
  { id: 7, title: "Typewriter Effect", category: "Typography", desc: "Five phrases. One cursor. The poetry of appearing text.", demo: "typewriter", color: "#C9A96E", icon: "Aa", size: "normal" },
  { id: 8, title: "Color Palettes", category: "Brand Design", desc: "Five hand-crafted dark palettes. Each one a mood, a world, a story.", demo: "palette", color: "#E8C98E", icon: "◐", size: "normal" },
];

export default function WorkEnhanced() {
  const [active, setActive] = useState<number | null>(null);
  const { ref: headRef, visible: headVisible } = useReveal();

  return (
    <section id="work" style={{ padding: "140px 48px", background: "#060608", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", right: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(201,169,110,0.04), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(123,47,255,0.05), transparent 70%)", pointerEvents: "none" }} />

      <div ref={headRef} style={{ textAlign: "center", marginBottom: "90px", opacity: headVisible ? 1 : 0, transform: headVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#C9A96E", marginBottom: "24px" }}>✦ INTERACTIVE SHOWCASE ✦</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0, marginBottom: "20px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Don't just look.<br />
          <em style={{ background: "linear-gradient(135deg, #7B2FFF, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Experience.</em>
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "rgba(240,238,246,0.35)", margin: "0 auto", fontStyle: "italic", maxWidth: "480px", lineHeight: 1.7 }}>
          Eight live demos. Built with the same obsession we bring to every client project.
        </p>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "28px auto 0" }} />
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "20px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            isActive={active === project.id}
            onToggle={() => setActive(active === project.id ? null : project.id)}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", marginTop: "80px" }}>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "rgba(240,238,246,0.3)", fontStyle: "italic", marginBottom: "28px" }}>
          Imagine this — but built for <em style={{ color: "#C9A96E" }}>you.</em>
        </p>
        <a href="https://wa.me/message/DDNIUOL264WDB1" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", padding: "14px 44px", border: "1px solid rgba(123,47,255,0.4)", color: "#F0EEF6", fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", textDecoration: "none", borderRadius: "2px", transition: "all 0.3s ease" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "rgba(123,47,255,0.15)"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "#7B2FFF"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(123,47,255,0.2)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(123,47,255,0.4)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none"; }}
        >START YOUR PROJECT →</a>
      </div>
    </section>
  );
}

function ProjectCard({ project, index, isActive, onToggle }: { project: typeof projects[0]; index: number; isActive: boolean; onToggle: () => void }) {
  const { ref, visible } = useReveal();
  const isWide = project.size === "wide";

  return (
    <div
      ref={ref}
      onClick={onToggle}
      style={{
        border: `1px solid ${isActive ? project.color + "66" : project.color + "18"}`,
        borderRadius: "10px", overflow: "hidden", cursor: "pointer",
        transition: "border-color 0.4s, box-shadow 0.4s",
        boxShadow: isActive ? `0 0 50px ${project.color}18` : "none",
        background: "#060608",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transitionDelay: `${(index % 4) * 0.08}s`,
        gridColumn: isWide ? "span 2" : "span 1",
      }}
    >
      <div style={{ height: isActive ? "340px" : "200px", transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)", position: "relative", background: "#060608" }}>
        {!isActive ? (
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
            <div style={{ width: "56px", height: "56px", border: `1px solid ${project.color}28`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "22px", color: project.color, opacity: 0.6, filter: `drop-shadow(0 0 8px ${project.color})` }}>{project.icon}</span>
            </div>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.2)" }}>CLICK TO LAUNCH</span>
          </div>
        ) : (
          <div style={{ width: "100%", height: "100%" }}>
            {project.demo === "particles" && <ParticleDemo />}
            {project.demo === "glitch" && <GlitchDemo />}
            {project.demo === "liquid" && <LiquidDemo />}
            {project.demo === "tilt" && <TiltDemo />}
            {project.demo === "morph" && <MorphGradientDemo />}
            {project.demo === "audio" && <AudioVisualizerDemo />}
            {project.demo === "typewriter" && <TypewriterDemo />}
            {project.demo === "palette" && <PaletteDemo />}
          </div>
        )}
      </div>
      <div style={{ padding: "20px 24px", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", color: project.color }}>{project.category}</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: isActive ? "#C9A96E" : "rgba(240,238,246,0.15)", display: "flex", alignItems: "center", gap: "5px", transition: "color 0.3s" }}>
            <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: isActive ? "#C9A96E" : "rgba(240,238,246,0.15)", display: "inline-block", boxShadow: isActive ? "0 0 8px #C9A96E" : "none", transition: "all 0.3s" }} />
            {isActive ? "LIVE" : "INACTIVE"}
          </span>
        </div>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: "20px", fontStyle: "italic", color: "#F0EEF6", margin: "0 0 8px" }}>{project.title}</h3>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(240,238,246,0.35)", margin: 0, fontStyle: "italic", lineHeight: 1.7 }}>{project.desc}</p>
      </div>
    </div>
  );
}