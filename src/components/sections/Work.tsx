"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";

function useReveal(threshold = 0.08) {
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
// DEMO COMPONENTS — all new
// ══════════════════════════════════════════════════════════════════════════════

// ── 1. Constellation — click to add stars ────────────────────────────────────
function ConstellationDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef  = useRef<{ x: number; y: number; r: number; pulse: number }[]>([]);
  const animRef   = useRef<number>(0);
  const { t } = useTranslation("common");

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();

    // Seed stars
    for (let i = 0; i < 30; i++) {
      starsRef.current.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 + 0.5, pulse: Math.random() * Math.PI * 2 });
    }

    const onClick = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      for (let i = 0; i < 5; i++) {
        starsRef.current.push({ x: e.clientX - r.left + (Math.random()-0.5)*20, y: e.clientY - r.top + (Math.random()-0.5)*20, r: Math.random() * 2 + 0.8, pulse: Math.random() * Math.PI * 2 });
      }
      if (starsRef.current.length > 120) starsRef.current.splice(0, 5);
    };
    canvas.addEventListener("click", onClick);

    let t2 = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t2 += 0.02;
      starsRef.current.forEach(s => {
        s.pulse += 0.03;
        const brightness = 0.4 + Math.sin(s.pulse) * 0.3;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(240,238,246,${brightness})`;
        ctx.fill();
      });
      // Lines between close stars
      starsRef.current.forEach((a, i) => {
        starsRef.current.slice(i+1).forEach(b => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(123,47,255,${(1 - d/100) * 0.5})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        });
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); canvas.removeEventListener("click", onClick); };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "crosshair" }} />
      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.35em", color: "rgba(201,169,110,0.45)", whiteSpace: "nowrap" }}>
        {t("work.clickToAdd")}
      </div>
    </div>
  );
}

// ── 2. Neon Signature — draw with mouse ──────────────────────────────────────
function SignatureDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing   = useRef(false);
  const lastPos   = useRef({ x: 0, y: 0 });
  const hueRef    = useRef(270);
  const { t } = useTranslation("common");

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = "transparent";

    const getPos = (e: MouseEvent | TouchEvent) => {
      const r = canvas.getBoundingClientRect();
      const src = "touches" in e ? e.touches[0] : e;
      return { x: src.clientX - r.left, y: src.clientY - r.top };
    };

    const start = (e: MouseEvent | TouchEvent) => {
      drawing.current = true;
      lastPos.current = getPos(e);
    };
    const end = () => { drawing.current = false; };
    const move = (e: MouseEvent | TouchEvent) => {
      if (!drawing.current) return;
      const pos = getPos(e);
      hueRef.current = (hueRef.current + 1) % 360;
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = `hsl(${hueRef.current}, 90%, 65%)`;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";
      ctx.shadowBlur = 12;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.stroke();
      ctx.shadowBlur = 0;
      lastPos.current = pos;
    };

    canvas.addEventListener("mousedown", start);
    canvas.addEventListener("mouseup", end);
    canvas.addEventListener("mousemove", move);
    canvas.addEventListener("mouseleave", end);

    return () => {
      canvas.removeEventListener("mousedown", start);
      canvas.removeEventListener("mouseup", end);
      canvas.removeEventListener("mousemove", move);
      canvas.removeEventListener("mouseleave", end);
    };
  }, []);

  const clear = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "rgba(4,4,8,0.6)" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "crosshair" }} />
      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "16px", alignItems: "center" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.35em", color: "rgba(240,238,246,0.35)" }}>{t("work.drawHere")}</span>
        <button onClick={clear} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,238,246,0.4)", fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.2em", padding: "3px 10px", borderRadius: "2px", cursor: "pointer" }}>
          {t("work.clear")}
        </button>
      </div>
    </div>
  );
}

// ── 3. Gravity Orbs — drag and release ───────────────────────────────────────
function GravityDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const orbs = useRef<{ x: number; y: number; vx: number; vy: number; r: number; color: string; hue: number }[]>([]);
  const dragging = useRef<number | null>(null);
  const lastMouse = useRef({ x: 0, y: 0 });
  const { t } = useTranslation("common");

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    orbs.current = [
      { x: W*0.3, y: H*0.5, vx: 1.2, vy: -0.8, r: 28, color: "#7B2FFF", hue: 270 },
      { x: W*0.7, y: H*0.4, vx: -0.8, vy: 1.0, r: 22, color: "#C9A96E", hue: 40 },
      { x: W*0.5, y: H*0.6, vx: 0.5, vy: -1.2, r: 18, color: "#A855F7", hue: 290 },
    ];

    const getPos = (e: MouseEvent) => ({ x: e.offsetX, y: e.offsetY });

    const onDown = (e: MouseEvent) => {
      const p = getPos(e);
      orbs.current.forEach((o, i) => {
        const dx = p.x - o.x, dy = p.y - o.y;
        if (Math.sqrt(dx*dx + dy*dy) < o.r + 8) dragging.current = i;
      });
    };
    const onUp = (e: MouseEvent) => {
      if (dragging.current !== null) {
        const p = getPos(e);
        orbs.current[dragging.current].vx = (p.x - lastMouse.current.x) * 0.4;
        orbs.current[dragging.current].vy = (p.y - lastMouse.current.y) * 0.4;
      }
      dragging.current = null;
    };
    const onMove = (e: MouseEvent) => {
      const p = getPos(e);
      if (dragging.current !== null) {
        orbs.current[dragging.current].x = p.x;
        orbs.current[dragging.current].y = p.y;
        orbs.current[dragging.current].vx = 0;
        orbs.current[dragging.current].vy = 0;
      }
      lastMouse.current = p;
    };

    canvas.addEventListener("mousedown", onDown);
    canvas.addEventListener("mouseup",   onUp);
    canvas.addEventListener("mousemove", onMove);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      // Gravity + bounce
      orbs.current.forEach((o, i) => {
        if (i === dragging.current) return;
        // Attract to center gently
        o.vx += (W/2 - o.x) * 0.0002;
        o.vy += (H/2 - o.y) * 0.0002;
        // Orb-to-orb repulsion
        orbs.current.forEach((b, j) => {
          if (i === j) return;
          const dx = o.x - b.x, dy = o.y - b.y;
          const d  = Math.sqrt(dx*dx + dy*dy);
          if (d < (o.r + b.r + 10)) {
            o.vx += (dx / d) * 0.5;
            o.vy += (dy / d) * 0.5;
          }
        });
        o.vx *= 0.995; o.vy *= 0.995;
        o.x += o.vx; o.y += o.vy;
        if (o.x - o.r < 0) { o.x = o.r; o.vx *= -0.8; }
        if (o.x + o.r > W) { o.x = W - o.r; o.vx *= -0.8; }
        if (o.y - o.r < 0) { o.y = o.r; o.vy *= -0.8; }
        if (o.y + o.r > H) { o.y = H - o.r; o.vy *= -0.8; }
      });

      // Draw connections
      orbs.current.forEach((a, i) => {
        orbs.current.slice(i+1).forEach(b => {
          const dx = a.x-b.x, dy = a.y-b.y;
          const d = Math.sqrt(dx*dx + dy*dy);
          if (d < 180) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            const grad = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            grad.addColorStop(0, a.color + "66");
            grad.addColorStop(1, b.color + "66");
            ctx.strokeStyle = grad;
            ctx.lineWidth = (1 - d/180) * 3;
            ctx.stroke();
          }
        });
      });

      // Draw orbs
      orbs.current.forEach(o => {
        const grad = ctx.createRadialGradient(o.x - o.r*0.3, o.y - o.r*0.3, 0, o.x, o.y, o.r);
        grad.addColorStop(0, o.color + "ff");
        grad.addColorStop(1, o.color + "44");
        ctx.beginPath();
        ctx.arc(o.x, o.y, o.r, 0, Math.PI*2);
        ctx.fillStyle = grad;
        ctx.shadowBlur = 24;
        ctx.shadowColor = o.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousedown", onDown);
      canvas.removeEventListener("mouseup",   onUp);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "grab" }} />
      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.35em", color: "rgba(201,169,110,0.45)", whiteSpace: "nowrap" }}>
        {t("work.dragOrbs")}
      </div>
    </div>
  );
}

// ── 4. Waveform Synthesizer ──────────────────────────────────────────────────
function WaveDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const [freq,  setFreq ] = useState(2);
  const [amp,   setAmp  ] = useState(50);
  const [speed, setSpeed] = useState(1);
  const tRef = useRef(0);
  const { t } = useTranslation("common");

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const W = canvas.width, H = canvas.height;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      tRef.current += 0.03 * speed;

      // Grid
      ctx.strokeStyle = "rgba(123,47,255,0.06)";
      ctx.lineWidth = 1;
      for (let x = 0; x < W; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }

      // Center line
      ctx.strokeStyle = "rgba(240,238,246,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, H/2); ctx.lineTo(W, H/2); ctx.stroke();

      // Wave 1
      const grad1 = ctx.createLinearGradient(0, 0, W, 0);
      grad1.addColorStop(0,   "rgba(123,47,255,0)");
      grad1.addColorStop(0.3, "rgba(123,47,255,0.9)");
      grad1.addColorStop(0.7, "rgba(201,169,110,0.9)");
      grad1.addColorStop(1,   "rgba(201,169,110,0)");

      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const y = H/2 + Math.sin((x / W) * Math.PI * 2 * freq + tRef.current) * amp
                      + Math.sin((x / W) * Math.PI * 2 * freq * 2 + tRef.current * 1.3) * (amp * 0.3);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = grad1;
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 16;
      ctx.shadowColor = "#7B2FFF";
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Wave 2 (echo)
      ctx.beginPath();
      for (let x = 0; x <= W; x++) {
        const y = H/2 + Math.sin((x / W) * Math.PI * 2 * freq + tRef.current - 0.5) * (amp * 0.5)
                      + Math.sin((x / W) * Math.PI * 2 * freq * 1.5 + tRef.current * 0.7) * (amp * 0.2);
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "rgba(168,85,247,0.3)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [freq, amp, speed]);

  const Slider = ({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (v: number) => void }) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.2em", color: "rgba(240,238,246,0.35)" }}>{label}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", color: "#C9A96E" }}>{value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#7B2FFF", cursor: "pointer" }} />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%", height: "100%" }}>
      <div style={{ flex: 1, position: "relative" }}>
        <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block" }} />
      </div>
      <div style={{ display: "flex", gap: "16px", padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", background: "rgba(4,4,8,0.6)" }}>
        <Slider label={t("work.freq")} value={freq} min={1} max={8} step={0.5} onChange={setFreq} />
        <Slider label={t("work.amp")}  value={amp}  min={10} max={90} step={5}  onChange={setAmp} />
        <Slider label={t("work.spd")}  value={speed} min={0.2} max={4} step={0.2} onChange={setSpeed} />
      </div>
    </div>
  );
}

// ── 5. Glitch Portrait ───────────────────────────────────────────────────────
function GlitchDemo() {
  const [intensity, setIntensity] = useState(0);
  const [active, setActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const word = "CLEO";
  const { t } = useTranslation("common");

  const triggerGlitch = useCallback(() => {
    let count = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setIntensity(Math.random());
      count++;
      if (count > 20) { if (intervalRef.current) clearInterval(intervalRef.current); setIntensity(0); }
    }, 40);
  }, []);

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

  const slices = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div onMouseEnter={() => { setActive(true); triggerGlitch(); }} onMouseLeave={() => setActive(false)}
      onClick={triggerGlitch}
      style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative", overflow: "hidden" }}>

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        opacity: intensity * 0.8,
      }} />

      {/* RGB offset layers */}
      <div style={{ position: "relative", userSelect: "none" }}>
        {["#FF003C", "#00FFCC", "#7B2FFF"].map((color, i) => (
          <span key={i} style={{
            position: i === 0 ? "relative" : "absolute",
            inset: i === 0 ? undefined : 0,
            fontFamily: "Georgia, serif",
            fontSize: "clamp(3.5rem, 10vw, 6rem)",
            fontStyle: "italic",
            color: i === 0 ? "#F0EEF6" : color,
            opacity: i === 0 ? 1 : intensity * 0.6,
            letterSpacing: "0.08em",
            display: "block",
            transform: i === 1 ? `translate(${intensity * 8}px, ${intensity * -2}px)`
                      : i === 2 ? `translate(${intensity * -6}px, ${intensity * 3}px)`
                      : "none",
            mixBlendMode: i === 0 ? "normal" : "screen",
            transition: "none",
          }}>
            {word}
          </span>
        ))}

        {/* Glitch slices */}
        {intensity > 0.3 && slices.map(i => (
          <div key={i} style={{
            position: "absolute",
            top: `${i * 12.5}%`, left: 0, right: 0,
            height: `${Math.random() * 8 + 4}%`,
            background: "#F0EEF6",
            opacity: Math.random() * 0.05,
            transform: `translateX(${(Math.random()-0.5) * intensity * 30}px)`,
            mixBlendMode: "overlay",
            pointerEvents: "none",
          }} />
        ))}
      </div>

      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.4em", color: "rgba(240,238,246,0.3)", whiteSpace: "nowrap" }}>
        {t("work.hoverGlitch")}
      </div>
    </div>
  );
}

// ── 6. Typewriter (improved) ─────────────────────────────────────────────────
function TypewriterDemo() {
  const { t } = useTranslation("common");
  const phrases = t("work.typewriterPhrases", { returnObjects: true }) as string[];
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx,   setCharIdx  ] = useState(0);
  const [deleting,  setDeleting ] = useState(false);
  const [text,      setText     ] = useState("");
  const [blink,     setBlink    ] = useState(true);

  useEffect(() => {
    const phrase = phrases[phraseIdx];
    const delay  = deleting ? 35 : charIdx === phrase.length ? 1600 : 75;
    const t2 = setTimeout(() => {
      if (!deleting && charIdx < phrase.length) {
        setText(phrase.slice(0, charIdx + 1)); setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === phrase.length) {
        setDeleting(true);
      } else if (deleting && charIdx > 0) {
        setText(phrase.slice(0, charIdx - 1)); setCharIdx(c => c - 1);
      } else {
        setDeleting(false); setPhraseIdx(i => (i + 1) % phrases.length);
      }
    }, delay);
    return () => clearTimeout(t2);
  }, [charIdx, deleting, phraseIdx, phrases]);

  useEffect(() => {
    const b = setInterval(() => setBlink(v => !v), 530);
    return () => clearInterval(b);
  }, []);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", gap: "28px" }}>
      {/* Terminal window decoration */}
      <div style={{ width: "100%", maxWidth: "400px", border: "1px solid rgba(123,47,255,0.25)", borderRadius: "6px", overflow: "hidden" }}>
        <div style={{ background: "rgba(123,47,255,0.1)", padding: "10px 16px", display: "flex", gap: "6px", borderBottom: "1px solid rgba(123,47,255,0.15)" }}>
          {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
            <div key={c} style={{ width: "10px", height: "10px", borderRadius: "50%", background: c, opacity: 0.7 }} />
          ))}
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.2em", color: "rgba(240,238,246,0.2)", marginLeft: "auto" }}>cleo.studio</span>
        </div>
        <div style={{ padding: "20px 20px", background: "rgba(4,4,8,0.7)", minHeight: "80px", display: "flex", alignItems: "center" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.1em", color: "#7B2FFF", marginRight: "8px" }}>$</span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "15px", fontStyle: "italic", color: "#F0EEF6", lineHeight: 1.5 }}>{text}</span>
          <span style={{ display: "inline-block", width: "2px", height: "18px", background: "#7B2FFF", marginLeft: "2px", opacity: blink ? 1 : 0, transition: "opacity 0.1s" }} />
        </div>
      </div>

      {/* Phrase dots */}
      <div style={{ display: "flex", gap: "8px" }}>
        {phrases.map((_, i) => (
          <div key={i} onClick={() => { setPhraseIdx(i); setCharIdx(0); setDeleting(false); }}
            style={{ width: i === phraseIdx ? "22px" : "6px", height: "6px", borderRadius: "3px", background: i === phraseIdx ? "#7B2FFF" : "rgba(240,238,246,0.15)", transition: "all 0.4s", cursor: "pointer" }} />
        ))}
      </div>
    </div>
  );
}

// ── 7. Color Mixer ───────────────────────────────────────────────────────────
const PALETTES = [
  { name: "Void",   colors: ["#0A0A0F", "#1A1228", "#7B2FFF", "#A855F7", "#C9A96E"] },
  { name: "Ember",  colors: ["#100505", "#2A0F0F", "#FF4D2F", "#FF8C5A", "#FFD700"] },
  { name: "Ocean",  colors: ["#050A0F", "#0A2030", "#0EA5E9", "#38BDF8", "#7DD3FC"] },
  { name: "Forest", colors: ["#05100A", "#0A2518", "#16A34A", "#4ADE80", "#BBF7D0"] },
  { name: "Rose",   colors: ["#100508", "#2A0F1A", "#EC4899", "#F472B6", "#FBCFE8"] },
];

function ColorDemo() {
  const [idx, setIdx] = useState(0);
  const [prev, setPrev] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const { t } = useTranslation("common");

  const go = (next: number) => {
    if (transitioning) return;
    setPrev(idx); setIdx(next); setTransitioning(true);
    setTimeout(() => setTransitioning(false), 500);
  };

  const pal = PALETTES[idx];

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "20px", padding: "16px" }}>
      {/* Swatch row */}
      <div style={{ display: "flex", gap: "6px", alignItems: "flex-end", height: "100px" }}>
        {pal.colors.map((c, i) => (
          <div key={`${idx}-${i}`} style={{
            borderRadius: "20px",
            background: c,
            width: `clamp(28px, 6vw, 44px)`,
            height: `${60 + i * 8}px`,
            boxShadow: i >= 2 ? `0 0 20px ${c}66` : "none",
            transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
            transitionDelay: `${i * 0.05}s`,
          }} />
        ))}
      </div>

      {/* Name */}
      <div style={{ fontFamily: "Georgia, serif", fontSize: "18px", fontStyle: "italic", color: "rgba(240,238,246,0.7)", letterSpacing: "0.12em" }}>
        {pal.name}
      </div>

      {/* Dots nav */}
      <div style={{ display: "flex", gap: "10px" }}>
        {PALETTES.map((p, i) => (
          <button key={i} onClick={() => go(i)} style={{
            width: i === idx ? "24px" : "8px", height: "8px",
            borderRadius: "4px",
            background: i === idx ? p.colors[2] : "rgba(240,238,246,0.15)",
            border: "none", cursor: "pointer",
            boxShadow: i === idx ? `0 0 10px ${p.colors[2]}` : "none",
            transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
          }} />
        ))}
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.2)" }}>{t("work.clickDots")}</div>
    </div>
  );
}

// ── 8. Spotlight Follow ──────────────────────────────────────────────────────
function SpotlightDemo() {
  const [mouse, setMouse] = useState({ x: 50, y: 50 });
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMouse({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div ref={ref} onMouseMove={onMove} style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", cursor: "none" }}>
      {/* Dark overlay with spotlight hole */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(circle 120px at ${mouse.x}% ${mouse.y}%, transparent 0%, rgba(6,6,8,0.97) 100%)`,
        transition: "background 0.05s",
        zIndex: 2, pointerEvents: "none",
      }} />

      {/* Content behind */}
      <div style={{ position: "absolute", inset: 0, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gridTemplateRows: "1fr 1fr 1fr", gap: "2px", padding: "20px" }}>
        {["✦ Animation", "◈ Design", "⬡ Web", "◉ Motion", "∞ Custom", "◎ UI/UX", "✦ Brand", "◈ Story", "⬡ Build"].map((text, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.2em", color: "rgba(240,238,246,0.5)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "4px" }}>
            {text}
          </div>
        ))}
      </div>

      {/* Cursor dot */}
      <div style={{
        position: "absolute", zIndex: 3, pointerEvents: "none",
        left: `${mouse.x}%`, top: `${mouse.y}%`,
        transform: "translate(-50%, -50%)",
        width: "8px", height: "8px", borderRadius: "50%",
        background: "#C9A96E",
        boxShadow: "0 0 12px #C9A96E",
      }} />

      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.35em", color: "rgba(201,169,110,0.45)", whiteSpace: "nowrap", zIndex: 4 }}>
        {t("work.moveYourCursor")}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// DEMO REGISTRY
// ══════════════════════════════════════════════════════════════════════════════
type DemoKey = "constellation" | "signature" | "gravity" | "wave" | "glitch" | "typewriter" | "colors" | "spotlight";

const DEMOS: { key: DemoKey; icon: string; color: string; wide?: boolean }[] = [
  { key: "constellation", icon: "✦", color: "#7B2FFF" },
  { key: "signature",     icon: "◎", color: "#C9A96E" },
  { key: "gravity",       icon: "◉", color: "#A855F7" },
  { key: "wave",          icon: "∿", color: "#7B2FFF", wide: true },
  { key: "glitch",        icon: "◈", color: "#F0EEF6" },
  { key: "typewriter",    icon: "Aa", color: "#7B2FFF" },
  { key: "colors",        icon: "◐", color: "#C9A96E" },
  { key: "spotlight",     icon: "⬡", color: "#A855F7" },
];

function renderDemo(key: DemoKey) {
  switch (key) {
    case "constellation": return <ConstellationDemo />;
    case "signature":     return <SignatureDemo />;
    case "gravity":       return <GravityDemo />;
    case "wave":          return <WaveDemo />;
    case "glitch":        return <GlitchDemo />;
    case "typewriter":    return <TypewriterDemo />;
    case "colors":        return <ColorDemo />;
    case "spotlight":     return <SpotlightDemo />;
  }
}

// ── Demo Card — new horizontal layout ────────────────────────────────────────
function DemoCard({ demo, index }: { demo: typeof DEMOS[number]; index: number }) {
  const { t }    = useTranslation("common");
  const [open,   setOpen  ] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { ref, visible } = useReveal(0.08);

  return (
    <div ref={ref} style={{
      gridColumn: demo.wide ? "1 / -1" : "span 1",
      opacity:    visible ? 1 : 0,
      transform:  visible ? "translateY(0)" : "translateY(40px)",
      transition: `opacity 0.7s ease ${index * 0.07}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.07}s`,
    }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: open
            ? `linear-gradient(160deg, ${demo.color}10, rgba(6,6,10,0.98))`
            : hovered ? "rgba(10,10,16,0.9)" : "rgba(8,8,12,0.7)",
          border: `1px solid ${open ? demo.color + "44" : hovered ? demo.color + "22" : "rgba(255,255,255,0.05)"}`,
          borderRadius: "6px", overflow: "hidden",
          transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
          boxShadow: open ? `0 0 50px ${demo.color}12` : "none",
        }}
      >
        {/* ── Header row ── */}
        <div
          onClick={() => setOpen(o => !o)}
          style={{
            padding: "22px 28px",
            display: "flex", alignItems: "center", gap: "18px",
            cursor: "none",
            borderBottom: open ? `1px solid ${demo.color}20` : "1px solid transparent",
            transition: "border-color 0.3s",
          }}
        >
          {/* Icon box */}
          <div style={{
            width: "44px", height: "44px", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: open ? `${demo.color}18` : "rgba(255,255,255,0.03)",
            border: `1px solid ${open ? demo.color + "40" : "rgba(255,255,255,0.06)"}`,
            borderRadius: "8px", fontSize: "20px",
            color: open || hovered ? demo.color : "rgba(240,238,246,0.25)",
            filter: open ? `drop-shadow(0 0 8px ${demo.color})` : "none",
            transition: "all 0.4s",
          }}>
            {demo.icon}
          </div>

          {/* Text */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px", letterSpacing: "0.25em",
              color: open ? "#F0EEF6" : hovered ? "rgba(240,238,246,0.7)" : "rgba(240,238,246,0.45)",
              marginBottom: "5px", transition: "color 0.3s",
            }}>
              {t(`work.demos.${demo.key}.title`)}
            </div>
            <div style={{
              fontFamily: "Georgia, serif", fontSize: "12px", fontStyle: "italic",
              color: open ? demo.color : "rgba(240,238,246,0.25)",
              transition: "color 0.3s",
            }}>
              {t(`work.demos.${demo.key}.category`)}
            </div>
          </div>

          {/* Status + toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "5px",
              padding: "4px 10px",
              background: open ? `${demo.color}15` : "rgba(255,255,255,0.03)",
              border: `1px solid ${open ? demo.color + "35" : "rgba(255,255,255,0.06)"}`,
              borderRadius: "2px", transition: "all 0.3s",
            }}>
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: open ? demo.color : "rgba(240,238,246,0.2)", boxShadow: open ? `0 0 6px ${demo.color}` : "none", transition: "all 0.3s", animation: open ? "pulse 2s infinite" : "none" }} />
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.25em", color: open ? demo.color : "rgba(240,238,246,0.2)", transition: "color 0.3s" }}>
                {open ? "LIVE" : "IDLE"}
              </span>
            </div>
            <div style={{
              width: "26px", height: "26px", borderRadius: "50%",
              border: `1px solid ${open ? demo.color + "55" : "rgba(255,255,255,0.1)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: open ? `${demo.color}15` : "transparent",
              color: open ? demo.color : "rgba(240,238,246,0.3)",
              fontSize: "10px",
              transform: open ? "rotate(180deg)" : "none",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
            }}>
              ↓
            </div>
          </div>
        </div>

        {/* ── Demo canvas ── */}
        <div style={{
          height: open ? (demo.wide ? "320px" : "260px") : "0px",
          overflow: "hidden",
          transition: "height 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {open && (
            <div style={{ width: "100%", height: "100%" }}>
              {renderDemo(demo.key)}
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: open ? "14px 28px" : "0 28px",
          maxHeight: open ? "80px" : "0px",
          overflow: "hidden",
          transition: "all 0.4s ease",
          borderTop: open ? `1px solid rgba(255,255,255,0.04)` : "none",
        }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "12px", fontStyle: "italic", color: "rgba(240,238,246,0.3)", margin: 0, lineHeight: 1.7 }}>
            {t(`work.demos.${demo.key}.desc`)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Main Work Section ─────────────────────────────────────────────────────────
export default function Work() {
  const { t } = useTranslation("common");
  const { ref: headRef, visible: headVisible } = useReveal(0.08);

  return (
    <section id="work" style={{ padding: "160px 48px", background: "#060608", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "30%", right: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(201,169,110,0.03), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "20%", left: "-5%",  width: "400px", height: "400px", background: "radial-gradient(circle, rgba(123,47,255,0.04), transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <div ref={headRef} style={{
        textAlign: "center", marginBottom: "90px",
        opacity:   headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.5em", color: "#7B2FFF", marginBottom: "28px" }}>
          {t("work.label")}
        </div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 4rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: "0 0 18px", letterSpacing: "-0.025em", lineHeight: 1.1 }}>
          {t("work.title")}{" "}
          <em style={{ background: "linear-gradient(135deg, #7B2FFF, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            {t("work.titleAccent")}
          </em>
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", fontStyle: "italic", color: "rgba(240,238,246,0.32)", margin: "0 auto", maxWidth: "480px", lineHeight: 1.9 }}>
          {t("work.sub")}
        </p>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #7B2FFF, #C9A96E, transparent)", margin: "30px auto 0" }} />
      </div>

      {/* Demo grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))", gap: "14px", maxWidth: "1100px", margin: "0 auto 90px" }}>
        {DEMOS.map((demo, i) => <DemoCard key={demo.key} demo={demo} index={i} />)}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", opacity: 1 }}>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "17px", fontStyle: "italic", color: "rgba(240,238,246,0.4)", marginBottom: "28px" }}>
          {t("work.ctaSub")}{" "}
          <em style={{ color: "#C9A96E" }}>you.</em>
        </p>
        <a href="https://wa.me/message/DDNIUOL264WDB1" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 52px", background: "linear-gradient(135deg, #7B2FFF, #9B5FFF)", color: "#F0EEF6", fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.3em", textDecoration: "none", borderRadius: "2px", boxShadow: "0 0 50px rgba(123,47,255,0.35)", cursor: "none", transition: "all 0.4s ease" }}
          onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 0 90px rgba(123,47,255,0.6)"; }}
          onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.transform = "none"; el.style.boxShadow = "0 0 50px rgba(123,47,255,0.35)"; }}
        >
          {t("work.cta")}
        </a>
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
      `}</style>
    </section>
  );
}