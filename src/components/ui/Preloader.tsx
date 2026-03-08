"use client";

import { useEffect, useRef, useState } from "react";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"counting" | "reveal" | "done">("counting");
  const [progress, setProgress] = useState(0);
  const [letterVisible, setLetterVisible] = useState([false, false, false, false]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  // Canvas particle burst
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }[] = [];
    let started = false;

    const spawnBurst = () => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      for (let i = 0; i < 120; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8 + 2;
        particles.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color: Math.random() > 0.5 ? "#7B2FFF" : "#C9A96E",
          size: Math.random() * 3 + 1,
        });
      }
      started = true;
    };

    const draw = () => {
      ctx.fillStyle = "rgba(6,6,8,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (started) {
        particles.forEach((p, i) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12;
          p.vx *= 0.98;
          p.life -= 0.018;

          ctx.globalAlpha = Math.max(0, p.life);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 6;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.shadowBlur = 0;
        });
        ctx.globalAlpha = 1;
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Expose burst trigger
    (window as any).__preloaderBurst = spawnBurst;
    return () => {
      cancelAnimationFrame(animRef.current);
      delete (window as any).__preloaderBurst;
    };
  }, []);

  // Progress counter
  useEffect(() => {
    const duration = 2200;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);
      const eased = raw < 0.5 ? 2 * raw * raw : -1 + (4 - 2 * raw) * raw;
      const val = Math.floor(eased * 100);
      setProgress(val);

      // Stagger letter reveals
      if (val >= 20) setLetterVisible(p => [true, p[1], p[2], p[3]]);
      if (val >= 45) setLetterVisible(p => [p[0], true, p[2], p[3]]);
      if (val >= 68) setLetterVisible(p => [p[0], p[1], true, p[3]]);
      if (val >= 88) setLetterVisible(p => [p[0], p[1], p[2], true]);

      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Trigger burst
        setTimeout(() => {
          (window as any).__preloaderBurst?.();
          setPhase("reveal");
        }, 180);
        setTimeout(() => {
          setPhase("done");
          onComplete();
        }, 1100);
      }
    };

    requestAnimationFrame(tick);
  }, [onComplete]);

  if (phase === "done") return null;

  const letters = ["C", "L", "E", "O"];
  const letterColors = ["#7B2FFF", "#9B4FFF", "#B87FFF", "#C9A96E"];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 9999,
      background: "#060608",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      opacity: phase === "reveal" ? 0 : 1,
      transform: phase === "reveal" ? "scale(1.04)" : "scale(1)",
      transition: phase === "reveal" ? "opacity 0.75s ease, transform 0.75s ease" : "none",
      pointerEvents: phase === "reveal" ? "none" : "all",
    }}>
      {/* Canvas for particles */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} />

      {/* Ambient glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "600px", height: "600px",
        background: "radial-gradient(ellipse, rgba(123,47,255,0.08), transparent 65%)",
        pointerEvents: "none",
        animation: "preloaderPulse 2s ease-in-out infinite",
      }} />

      {/* Logo letters */}
      <div style={{
        position: "relative", zIndex: 1,
        display: "flex", gap: "4px", marginBottom: "60px",
      }}>
        {letters.map((letter, i) => (
          <span key={i} style={{
            fontFamily: "'Palatino Linotype', Georgia, serif",
            fontSize: "clamp(4rem, 12vw, 8rem)",
            fontWeight: 400,
            color: letterColors[i],
            letterSpacing: "0.08em",
            filter: letterVisible[i] ? `drop-shadow(0 0 24px ${letterColors[i]}88)` : "none",
            opacity: letterVisible[i] ? 1 : 0,
            transform: letterVisible[i] ? "translateY(0) scale(1)" : "translateY(20px) scale(0.92)",
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.05}s`,
            display: "inline-block",
          }}>
            {letter}
          </span>
        ))}
      </div>

      {/* Progress bar */}
      <div style={{ position: "relative", zIndex: 1, width: "clamp(200px, 40vw, 340px)" }}>
        {/* Track */}
        <div style={{
          width: "100%", height: "1px",
          background: "rgba(255,255,255,0.06)",
          borderRadius: "1px", overflow: "hidden",
          marginBottom: "20px",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #7B2FFF, #C9A96E)",
            transition: "width 0.08s linear",
            boxShadow: "0 0 8px rgba(123,47,255,0.6)",
          }} />
        </div>

        {/* Counter + label */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px", letterSpacing: "0.35em",
            color: "rgba(240,238,246,0.25)",
          }}>LOADING EXPERIENCE</span>
          <span style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px", letterSpacing: "0.1em",
            background: "linear-gradient(90deg, #7B2FFF, #C9A96E)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>{progress}<span style={{ fontSize: "8px", opacity: 0.7 }}>%</span></span>
        </div>
      </div>

      {/* Decorative diamonds */}
      <div style={{
        position: "absolute", bottom: "48px",
        display: "flex", gap: "10px", alignItems: "center",
        zIndex: 1,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: "5px", height: "5px",
            background: i === 1 ? "linear-gradient(135deg, #7B2FFF, #C9A96E)" : "rgba(255,255,255,0.1)",
            transform: "rotate(45deg)",
            transition: `all 0.4s ease ${i * 0.15}s`,
            opacity: progress > 30 + i * 20 ? 1 : 0,
          }} />
        ))}
      </div>

      {/* Cinematic scan line */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <style>{`
        @keyframes preloaderPulse {
          0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }
      `}</style>
    </div>
  );
}