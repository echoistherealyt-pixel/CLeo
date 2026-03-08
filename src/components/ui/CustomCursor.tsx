"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState<"default" | "hover" | "click" | "text">("default");
  const [isVisible, setIsVisible] = useState(false);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const trailRef = useRef<{ x: number; y: number; opacity: number }[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Only on desktop
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      trailRef.current.push({ x: e.clientX, y: e.clientY, opacity: 1 });
      if (trailRef.current.length > 18) trailRef.current.shift();
    };

    const onEnter = () => setIsVisible(true);
    const onLeave = () => setIsVisible(false);
    const onDown = () => setCursorState("click");
    const onUp = () => setCursorState("default");

    // Detect hoverable elements
    const addHoverListeners = () => {
      const hoverEls = document.querySelectorAll("a, button, [data-cursor='hover']");
      const textEls = document.querySelectorAll("p, h1, h2, h3, span");

      hoverEls.forEach(el => {
        el.addEventListener("mouseenter", () => setCursorState("hover"));
        el.addEventListener("mouseleave", () => setCursorState("default"));
      });
    };

    setTimeout(addHoverListeners, 500);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Lerp animation loop
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      // Dot snaps fast
      if (dotRef.current) {
        const dx = mouse.current.x;
        const dy = mouse.current.y;
        dotRef.current.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
      }

      // Ring lags behind
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x - 20}px, ${ring.current.y - 20}px)`;
      }

      // Trail canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      trailRef.current.forEach((p, i) => {
        const ratio = i / trailRef.current.length;
        const r = ratio * 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, r), 0, Math.PI * 2);
        const alpha = ratio * 0.35;
        ctx.fillStyle = `rgba(123,47,255,${alpha})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = "#7B2FFF";
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const isHover = cursorState === "hover";
  const isClick = cursorState === "click";

  return (
    <>
      {/* Trail canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed", inset: 0,
          pointerEvents: "none", zIndex: 99997,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s",
        }}
      />

      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: "8px", height: "8px",
          borderRadius: "50%",
          background: isHover
            ? "linear-gradient(135deg, #C9A96E, #7B2FFF)"
            : isClick
            ? "#C9A96E"
            : "#7B2FFF",
          pointerEvents: "none",
          zIndex: 99999,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s, background 0.2s, transform 0.05s",
          boxShadow: isHover
            ? "0 0 12px rgba(201,169,110,0.8)"
            : "0 0 8px rgba(123,47,255,0.9)",
          transform: isClick ? "scale(0.6)" : "scale(1)",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />

      {/* Ring */}
      <div
        ref={ringRef}
        style={{
          position: "fixed", top: 0, left: 0,
          width: isHover ? "52px" : isClick ? "28px" : "40px",
          height: isHover ? "52px" : isClick ? "28px" : "40px",
          borderRadius: "50%",
          border: isHover
            ? "1px solid rgba(201,169,110,0.7)"
            : "1px solid rgba(123,47,255,0.5)",
          pointerEvents: "none",
          zIndex: 99998,
          opacity: isVisible ? 1 : 0,
          transition: "opacity 0.3s, width 0.35s cubic-bezier(0.16,1,0.3,1), height 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s",
          willChange: "transform",
          background: isHover ? "rgba(201,169,110,0.04)" : "transparent",
        }}
      >
        {/* Inner cross on hover */}
        {isHover && (
          <>
            <div style={{
              position: "absolute", top: "50%", left: "8px", right: "8px",
              height: "1px", background: "rgba(201,169,110,0.4)",
              transform: "translateY(-50%)",
            }} />
            <div style={{
              position: "absolute", left: "50%", top: "8px", bottom: "8px",
              width: "1px", background: "rgba(201,169,110,0.4)",
              transform: "translateX(-50%)",
            }} />
          </>
        )}
      </div>

      {/* Hide default cursor globally */}
      <style>{`
        @media (pointer: fine) {
          *, *::before, *::after { cursor: none !important; }
        }
      `}</style>
    </>
  );
}