"use client";

import { useState, useRef, useEffect, useCallback } from "react";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ── Particle Demo ──────────────────────────────────────────────────────────────
function ParticleDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -999, y: -999 });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();

    const particles = Array.from({ length: 100 }, () => ({
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
      ctx.fillStyle = "rgba(6,6,8,0.18)";
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
            ctx.strokeStyle = `rgba(123,47,255,${0.2 * (1 - d / 90)})`;
            ctx.lineWidth = 0.5; ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
          }
        });
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color; ctx.globalAlpha = 0.8; ctx.fill(); ctx.globalAlpha = 1;
      });
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); canvas.removeEventListener("mousemove", onMove); };
  }, []);

  return <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "crosshair" }} />;
}

// ── Glitch Demo ────────────────────────────────────────────────────────────────
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
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.35em", color: "rgba(240,238,246,0.25)" }}>CLICK TO GLITCH</span>
        <div style={{ width: "30px", height: "1px", background: "linear-gradient(90deg, #7B2FFF, #C9A96E)" }} />
      </div>
    </div>
  );
}

// ── Liquid Demo ────────────────────────────────────────────────────────────────
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

// ── Tilt Demo ──────────────────────────────────────────────────────────────────
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
        style={{
          width: "200px", height: "270px", background: "rgba(15,15,22,0.9)",
          border: "1px solid rgba(123,47,255,0.3)", borderRadius: "14px",
          transform: `rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: tilt.x === 0 ? "transform 0.7s ease" : "transform 0.08s ease",
          cursor: "pointer", position: "relative", overflow: "hidden",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px",
          boxShadow: `0 40px 100px rgba(0,0,0,0.7), 0 0 50px rgba(123,47,255,0.12)`,
        }}>
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(123,47,255,0.22), transparent 65%)`, transition: "background 0.08s" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)` }} />
        <span style={{ fontSize: "36px", color: "#7B2FFF", filter: "drop-shadow(0 0 14px #7B2FFF)", position: "relative" }}>✦</span>
        <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontStyle: "italic", color: "#F0EEF6", position: "relative" }}>Cleo</div>
        <div style={{ width: "36px", height: "1px", background: "linear-gradient(90deg, #7B2FFF, #C9A96E)", position: "relative" }} />
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.25em", color: "rgba(240,238,246,0.35)", position: "relative" }}>DIGITAL STUDIO</div>
      </div>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.18)" }}>HOVER THE CARD</span>
    </div>
  );
}

// ── Projects ───────────────────────────────────────────────────────────────────
const projects = [
  { id: 1, title: "Particle Network", category: "Animation", desc: "120 interactive particles that react to your cursor — connecting and repelling in real time.", demo: "particles", color: "#7B2FFF", icon: "✦" },
  { id: 2, title: "Glitch Typography", category: "Motion Design", desc: "Text that breaks reality on command. Click and watch it dissolve.", demo: "glitch", color: "#C9A96E", icon: "◈" },
  { id: 3, title: "Liquid Cursor", category: "UI Effect", desc: "A fluid purple trail that follows every move — like paint on dark water.", demo: "liquid", color: "#A855F7", icon: "◉" },
  { id: 4, title: "3D Card Tilt", category: "UI / UX", desc: "Cards with real depth — light shifts as you move, revealing dimension.", demo: "tilt", color: "#C9A96E", icon: "⬡" },
];

// ── Main Work Section ──────────────────────────────────────────────────────────
export default function Work() {
  const [active, setActive] = useState<number | null>(null);
  const { ref: headRef, visible: headVisible } = useReveal();

  return (
    <section id="work" style={{ padding: "140px 48px", background: "#060608", position: "relative", overflow: "hidden" }}>

      {/* Ambient */}
      <div style={{ position: "absolute", top: "30%", right: "-5%", width: "500px", height: "500px", background: "radial-gradient(circle, rgba(201,169,110,0.04), transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", left: "-5%", width: "400px", height: "400px", background: "radial-gradient(circle, rgba(123,47,255,0.05), transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <div ref={headRef} style={{ textAlign: "center", marginBottom: "90px", opacity: headVisible ? 1 : 0, transform: headVisible ? "translateY(0)" : "translateY(30px)", transition: "all 0.9s ease" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#C9A96E", marginBottom: "24px" }}>✦ INTERACTIVE SHOWCASE ✦</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0, marginBottom: "20px", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
          Don't just look.<br />
          <em style={{ background: "linear-gradient(135deg, #7B2FFF, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Experience.</em>
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "rgba(240,238,246,0.35)", margin: "0 auto", fontStyle: "italic", maxWidth: "480px", lineHeight: 1.7 }}>
          These aren't screenshots. Click any card to launch a live demo — built with the same craft we bring to every project.
        </p>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #C9A96E, transparent)", margin: "28px auto 0" }} />
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "20px", maxWidth: "1100px", margin: "0 auto" }}>
        {projects.map((project, i) => {
          const isActive = active === project.id;
          return (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              isActive={isActive}
              onToggle={() => setActive(isActive ? null : project.id)}
            />
          );
        })}
      </div>

      {/* CTA */}
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

  return (
    <div ref={ref} onClick={onToggle} style={{
      border: `1px solid ${isActive ? project.color + "66" : project.color + "18"}`,
      borderRadius: "10px", overflow: "hidden", cursor: "pointer",
      transition: "border-color 0.4s, box-shadow 0.4s, transform 0.4s",
      boxShadow: isActive ? `0 0 50px ${project.color}18` : "none",
      background: "#060608",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(40px)",
      transitionDelay: `${index * 0.1}s`,
    }}>
      {/* Demo area */}
      <div style={{ height: isActive ? "340px" : "200px", transition: "height 0.5s cubic-bezier(0.4,0,0.2,1)", position: "relative", background: "#060608" }}>
        {!isActive ? (
          <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "14px" }}>
            <div style={{ width: "64px", height: "64px", border: `1px solid ${project.color}30`, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
              <span style={{ fontSize: "28px", color: project.color, opacity: 0.5, filter: `drop-shadow(0 0 8px ${project.color})` }}>{project.icon}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
              <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.2)" }}>CLICK TO LAUNCH</span>
              <div style={{ width: "20px", height: "1px", background: `linear-gradient(90deg, transparent, ${project.color}55, transparent)` }} />
            </div>
          </div>
        ) : (
          <div style={{ width: "100%", height: "100%" }}>
            {project.demo === "particles" && <ParticleDemo />}
            {project.demo === "glitch" && <GlitchDemo />}
            {project.demo === "liquid" && <LiquidDemo />}
            {project.demo === "tilt" && <TiltDemo />}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ padding: "20px 24px", borderTop: `1px solid rgba(255,255,255,0.04)` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.25em", color: project.color }}>{project.category}</span>
          <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", color: isActive ? "#C9A96E" : "rgba(240,238,246,0.15)", transition: "color 0.3s", display: "flex", alignItems: "center", gap: "5px" }}>
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