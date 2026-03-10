"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const outerRef  = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);
  const [state, setState]     = useState<"default" | "hover" | "click">("default");
  const mouse   = useRef({ x: -200, y: -200 });
  const lagged  = useRef({ x: -200, y: -200 });
  const trail   = useRef<{ x: number; y: number; life: number }[]>([]);
  const raf     = useRef<number>(0);
  const angle   = useRef(0);
  const clickPos = useRef({ x: -200, y: -200 });
  const [showRipple, setShowRipple] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current!;
    const ctx    = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      setVisible(true);
      trail.current.push({ x: e.clientX, y: e.clientY, life: 1 });
      if (trail.current.length > 32) trail.current.shift();
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const onDown = (e: MouseEvent) => {
      clickPos.current = { x: e.clientX, y: e.clientY };
      setState("click");
      setShowRipple(true);
      setTimeout(() => setShowRipple(false), 520);
    };
    const onUp = () => setState(s => s === "click" ? "default" : s);

    const attachHover = () => {
      document.querySelectorAll("a, button, [data-cursor='hover'], input, textarea").forEach(el => {
        el.addEventListener("mouseenter", () => setState(s => s !== "click" ? "hover" : s));
        el.addEventListener("mouseleave", () => setState(s => s === "hover" ? "default" : s));
      });
    };
    setTimeout(attachHover, 700);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      const { x: mx, y: my } = mouse.current;

      // Dot snaps instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx}px, ${my}px)`;
      }

      // Outer ring lags + slowly rotates
      lagged.current.x = lerp(lagged.current.x, mx, 0.09);
      lagged.current.y = lerp(lagged.current.y, my, 0.09);
      angle.current   += 0.008;

      if (outerRef.current) {
        outerRef.current.style.transform =
          `translate(${lagged.current.x}px, ${lagged.current.y}px) rotate(${angle.current}rad)`;
      }

      // Trail — gold-to-purple gradient
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trail.current = trail.current
        .map(p => ({ ...p, life: p.life * 0.9 }))
        .filter(p => p.life > 0.02);

      for (let i = 1; i < trail.current.length; i++) {
        const a     = trail.current[i - 1];
        const b     = trail.current[i];
        const ratio = i / trail.current.length;
        // gold at start → purple at end
        const r   = Math.round(201 * (1 - ratio) + 123 * ratio);
        const g   = Math.round(169 * (1 - ratio) +  47 * ratio);
        const bv  = Math.round(110 * (1 - ratio) + 255 * ratio);
        const alpha = ratio * b.life * 0.28;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = `rgba(${r},${g},${bv},${alpha})`;
        ctx.lineWidth   = ratio * 4;
        ctx.lineCap     = "round";
        ctx.stroke();
      }

      // Soft glow at trail head
      const last = trail.current[trail.current.length - 1];
      if (last) {
        const grd = ctx.createRadialGradient(last.x, last.y, 0, last.x, last.y, 22);
        grd.addColorStop(0, "rgba(123,47,255,0.1)");
        grd.addColorStop(1, "rgba(123,47,255,0)");
        ctx.beginPath();
        ctx.arc(last.x, last.y, 22, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  const isHover = state === "hover";
  const isClick = state === "click";
  const ringSize = isHover ? 60 : isClick ? 20 : 44;

  return (
    <>
      {/* Trail canvas */}
      <canvas ref={canvasRef} style={{
        position: "fixed", inset: 0,
        pointerEvents: "none", zIndex: 99995,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s",
      }} />

      {/* ── Dot ── */}
      <div ref={dotRef} style={{
        position: "fixed", top: 0, left: 0,
        width:  isClick ? "5px" : isHover ? "8px" : "6px",
        height: isClick ? "5px" : isHover ? "8px" : "6px",
        marginLeft: isClick ? "-2.5px" : isHover ? "-4px" : "-3px",
        marginTop:  isClick ? "-2.5px" : isHover ? "-4px" : "-3px",
        borderRadius: "50%",
        background: isHover
          ? "radial-gradient(circle, #F5E6C8, #C9A96E)"
          : "#7B2FFF",
        boxShadow: isHover
          ? "0 0 12px rgba(201,169,110,1), 0 0 28px rgba(201,169,110,0.45)"
          : isClick
          ? "0 0 14px rgba(240,238,246,0.9)"
          : "0 0 10px rgba(123,47,255,0.95), 0 0 22px rgba(123,47,255,0.35)",
        pointerEvents: "none",
        zIndex: 99999,
        opacity: visible ? 1 : 0,
        willChange: "transform",
        transition: "opacity 0.3s, background 0.25s, box-shadow 0.25s, width 0.2s, height 0.2s, margin 0.2s",
        mixBlendMode: "screen",
      }} />

      {/* ── Outer ring ── */}
      <div ref={outerRef} style={{
        position: "fixed", top: 0, left: 0,
        width:  `${ringSize}px`,
        height: `${ringSize}px`,
        marginLeft: `-${ringSize / 2}px`,
        marginTop:  `-${ringSize / 2}px`,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 99998,
        opacity: visible ? 1 : 0,
        willChange: "transform",
        transition: "opacity 0.3s, width 0.45s cubic-bezier(0.16,1,0.3,1), height 0.45s cubic-bezier(0.16,1,0.3,1)",
        // Segmented conic ring — luxury watch bezel feel
        background: isHover
          ? `conic-gradient(
              #C9A96E 0deg 88deg,
              transparent 88deg 92deg,
              #C9A96E 92deg 178deg,
              transparent 178deg 182deg,
              #C9A96E 182deg 268deg,
              transparent 268deg 272deg,
              #C9A96E 272deg 358deg,
              transparent 358deg 360deg
            )`
          : `conic-gradient(
              rgba(123,47,255,0.75) 0deg 55deg,
              transparent 55deg 65deg,
              rgba(201,169,110,0.55) 65deg 120deg,
              transparent 120deg 130deg,
              rgba(123,47,255,0.65) 130deg 185deg,
              transparent 185deg 195deg,
              rgba(201,169,110,0.45) 195deg 250deg,
              transparent 250deg 260deg,
              rgba(123,47,255,0.55) 260deg 315deg,
              transparent 315deg 325deg,
              rgba(201,169,110,0.4) 325deg 358deg,
              transparent 358deg 360deg
            )`,
        // Hollow ring via mask
        WebkitMask: `radial-gradient(circle, transparent ${isHover ? "46%" : "44%"}, black ${isHover ? "47%" : "45%"})`,
        mask:       `radial-gradient(circle, transparent ${isHover ? "46%" : "44%"}, black ${isHover ? "47%" : "45%"})`,
        filter: isHover
          ? "drop-shadow(0 0 6px rgba(201,169,110,0.5))"
          : "drop-shadow(0 0 4px rgba(123,47,255,0.35))",
      }}>
        {/* Diamond at top on hover */}
        {isHover && (
          <div style={{
            position: "absolute",
            top: "-4px", left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
            width: "6px", height: "6px",
            background: "linear-gradient(135deg, #F5E6C8, #C9A96E)",
            boxShadow: "0 0 10px rgba(201,169,110,1)",
          }} />
        )}
      </div>

      {/* ── Click ripple ── */}
      {showRipple && (
        <div key={Date.now()} style={{
          position: "fixed",
          top:  clickPos.current.y,
          left: clickPos.current.x,
          width: "1px", height: "1px",
          pointerEvents: "none",
          zIndex: 99994,
        }}>
          <div style={{
            position: "absolute",
            width: "56px", height: "56px",
            marginLeft: "-28px", marginTop: "-28px",
            borderRadius: "50%",
            border: "1px solid rgba(201,169,110,0.7)",
            animation: "cursorRipple 0.52s cubic-bezier(0,0.6,0.4,1) forwards",
          }} />
          <div style={{
            position: "absolute",
            width: "30px", height: "30px",
            marginLeft: "-15px", marginTop: "-15px",
            borderRadius: "50%",
            border: "1px solid rgba(123,47,255,0.5)",
            animation: "cursorRipple 0.38s cubic-bezier(0,0.6,0.4,1) 0.05s forwards",
          }} />
        </div>
      )}

      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
        @keyframes cursorRipple {
          from { transform: scale(0.2); opacity: 0.9; }
          to   { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </>
  );
}