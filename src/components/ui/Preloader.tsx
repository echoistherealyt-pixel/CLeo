"use client";

import { useEffect, useRef, useState } from "react";
import CleoLogo from "./CleoLogo";

interface PreloaderProps {
  onComplete: () => void;
}

interface Particle {
  width: number;
  height: number;
  left: string;
  top: string;
  opacity: number;
  color: string;
  duration: number;
  delay: number;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const generated: Particle[] = Array.from({ length: 40 }).map((_, i) => ({
      width: Math.random() * 3 + 1,
      height: Math.random() * 3 + 1,
      left: Math.random() * 100 + "%",
      top: Math.random() * 100 + "%",
      opacity: Math.random() * 0.6 + 0.1,
      color: i % 2 === 0 ? "#7B2FFF" : "#C9A96E",
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }));
    setParticles(generated);
  }, []);

  useEffect(() => {
    const duration = 2800;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const ratio = Math.min(elapsed / duration, 1);
      const eased = ratio < 0.5
        ? 2 * ratio * ratio
        : 1 - Math.pow(-2 * ratio + 2, 2) / 2;

      const current = Math.floor(eased * 100);
      if (percentRef.current) percentRef.current.textContent = `${current}%`;
      if (progressRef.current) progressRef.current.style.width = `${current}%`;

      if (ratio < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          if (containerRef.current) {
            containerRef.current.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            containerRef.current.style.opacity = "0";
            containerRef.current.style.transform = "scale(1.05)";
          }
          setTimeout(onComplete, 800);
        }, 400);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div ref={containerRef} style={{ position: "fixed", inset: 0, background: "#0a0a0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 9999, overflow: "hidden" }}>

      {/* Particles */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {particles.map((p, i) => (
          <div key={i} style={{ position: "absolute", width: p.width + "px", height: p.height + "px", borderRadius: "50%", background: p.color, left: p.left, top: p.top, opacity: p.opacity, animation: `float ${p.duration}s ease-in-out infinite alternate`, animationDelay: p.delay + "s" }} />
        ))}
      </div>

      {/* Logo — no rings since it's now a wordmark */}
      <div style={{ marginBottom: "48px", animation: "fadeIn 1s ease forwards" }}>
        <CleoLogo width={280} />
      </div>

      {/* Tagline */}
      <div style={{ fontFamily: "'Courier New', monospace", fontSize: "10px", color: "#7B2FFF", letterSpacing: "0.3em", marginBottom: "60px", opacity: 0, animation: "fadeIn 1s ease 0.5s forwards" }}>
        CRAFTING DIGITAL MAGIC
      </div>

      {/* Progress bar */}
      <div style={{ width: "240px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", fontFamily: "'Courier New', monospace", fontSize: "11px", color: "#F0EEF6", opacity: 0.5 }}>
          <span>Loading experience</span>
          <span ref={percentRef}>0%</span>
        </div>
        <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
          <div ref={progressRef} style={{ height: "100%", width: "0%", background: "linear-gradient(90deg, #7B2FFF, #C9A96E)", transition: "width 0.05s linear", boxShadow: "0 0 10px #7B2FFF" }} />
        </div>
      </div>

      <style>{`
        @keyframes float { from { transform: translateY(0px); } to { transform: translateY(-20px) translateX(10px); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 0.7; transform: translateY(0); } }
        @keyframes pulse-ring { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
      `}</style>
    </div>
  );
}