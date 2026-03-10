"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// DNA / HELIX PARTICLE SYSTEM
// ─────────────────────────────────────────────────────────────────────────────
function HelixParticles() {
  const ref  = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const time = useRef(0);

  const { positions, colors, sizes } = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const colors    = new Float32Array(count * 3);
    const sizes     = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 12;
      const radius = 2.2 + Math.sin(t * 0.5) * 0.4;
      // Two intertwined helices
      const strand = i % 2 === 0 ? 0 : Math.PI;
      positions[i*3]   = Math.cos(t + strand) * radius + (Math.random() - 0.5) * 1.2;
      positions[i*3+1] = (i / count - 0.5) * 18;
      positions[i*3+2] = Math.sin(t + strand) * radius + (Math.random() - 0.5) * 1.2;

      // Color: purple core → gold edges
      const core = Math.abs(Math.sin(t * 0.8));
      colors[i*3]   = 0.18 + core * 0.52 + (1 - core) * 0.79;  // R
      colors[i*3+1] = 0.05 + core * 0.12 + (1 - core) * 0.42;  // G
      colors[i*3+2] = 0.75 - core * 0.45;                       // B

      sizes[i] = Math.random() * 0.6 + 0.15;
    }
    return { positions, colors, sizes };
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta;
    ref.current.rotation.y  = mouse.x * 0.12 + time.current * 0.04;
    ref.current.rotation.x  = mouse.y * -0.06;
    ref.current.position.y  = Math.sin(time.current * 0.2) * 0.15;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color"    args={[colors, 3]}    />
      </bufferGeometry>
      <pointsMaterial
        size={0.022} vertexColors transparent opacity={0.85}
        sizeAttenuation depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FLOATING DIAMOND GEOMETRY
// ─────────────────────────────────────────────────────────────────────────────
function FloatingDiamond({ pos, speed, scale }: { pos: [number,number,number]; speed: number; scale: number }) {
  const ref  = useRef<THREE.Mesh>(null);
  const time = useRef(Math.random() * 100);
  useFrame((_, delta) => {
    if (!ref.current) return;
    time.current += delta * speed;
    ref.current.rotation.x = time.current * 0.4;
    ref.current.rotation.y = time.current * 0.6;
    ref.current.position.y = pos[1] + Math.sin(time.current * 0.5) * 0.3;
    (ref.current.material as THREE.MeshStandardMaterial).opacity =
      0.12 + Math.sin(time.current) * 0.04;
  });
  return (
    <mesh ref={ref} position={pos} scale={scale}>
      <octahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#7B2FFF" emissive="#4a0099" emissiveIntensity={0.8}
        transparent opacity={0.15} wireframe={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ENERGY RINGS
// ─────────────────────────────────────────────────────────────────────────────
function EnergyRings() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.rotation.x = t * 0.05;
    groupRef.current.rotation.z = t * 0.08;
  });

  const rings = [
    { r: 3.5, tube: 0.008, color: "#7B2FFF", opacity: 0.35, rot: [0, 0, 0]              as [number,number,number] },
    { r: 4.2, tube: 0.005, color: "#C9A96E", opacity: 0.2,  rot: [Math.PI/3, 0, 0]      as [number,number,number] },
    { r: 5.0, tube: 0.004, color: "#7B2FFF", opacity: 0.12, rot: [0, Math.PI/4, 0]      as [number,number,number] },
    { r: 5.8, tube: 0.003, color: "#C9A96E", opacity: 0.08, rot: [Math.PI/2, Math.PI/6, 0] as [number,number,number] },
  ];

  return (
    <group ref={groupRef}>
      {rings.map((ring, i) => (
        <mesh key={i} rotation={ring.rot}>
          <torusGeometry args={[ring.r, ring.tube, 8, 120]} />
          <meshBasicMaterial color={ring.color} transparent opacity={ring.opacity} />
        </mesh>
      ))}
    </group>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// LIGHT SCAN — moves diagonally across scene
// ─────────────────────────────────────────────────────────────────────────────
function LightScan() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * 0.25;
    ref.current.position.x = Math.sin(t) * 10;
    ref.current.position.y = Math.cos(t * 0.6) * 4;
    (ref.current.material as THREE.MeshBasicMaterial).opacity =
      0.06 + Math.sin(t * 2) * 0.02;
  });
  return (
    <mesh ref={ref} rotation={[0, 0, 0.4]}>
      <planeGeometry args={[0.04, 28]} />
      <meshBasicMaterial color="#C9A96E" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FULL 3D SCENE
// ─────────────────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[0,  3,  4]} intensity={2.0} color="#7B2FFF" />
      <pointLight position={[-6, -2, 2]} intensity={0.8} color="#C9A96E" />
      <pointLight position={[6,  4,  1]} intensity={0.5} color="#A855F7" />
      <HelixParticles />
      <EnergyRings />
      <FloatingDiamond pos={[-5,  1, -3]} speed={0.6} scale={0.55} />
      <FloatingDiamond pos={[ 5, -1, -4]} speed={0.4} scale={0.4}  />
      <FloatingDiamond pos={[-3, -3, -2]} speed={0.8} scale={0.3}  />
      <FloatingDiamond pos={[ 4,  3, -5]} speed={0.5} scale={0.65} />
      <LightScan />
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED WORD — letters stagger in one by one
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedWord({ text, delay = 0, gradient = false, italic = false, size = "inherit" }: {
  text: string; delay?: number; gradient?: boolean; italic?: boolean; size?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <span style={{ display: "inline-block", fontStyle: italic ? "italic" : "normal", fontSize: size }}>
      {text.split("").map((char, i) => (
        <span key={i} style={{
          display: "inline-block",
          opacity:   visible ? 1 : 0,
          transform: visible ? "translateY(0) rotateX(0deg)" : "translateY(24px) rotateX(-40deg)",
          transition: `opacity 0.6s ease ${(delay + i * 45)}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${(delay + i * 45)}ms`,
          ...(gradient ? {
            background: "linear-gradient(135deg, #7B2FFF, #C9A96E)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          } : { color: "#F0EEF6" }),
        }}>
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL INDICATOR
// ─────────────────────────────────────────────────────────────────────────────
function ScrollIndicator() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 2200); }, []);
  return (
    <div style={{
      position: "absolute", bottom: "44px", left: "50%",
      transform: "translateX(-50%)",
      display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
      opacity: visible ? 0.5 : 0,
      transition: "opacity 1s ease",
      pointerEvents: "none", zIndex: 10,
    }}>
      <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.4em", color: "#F0EEF6" }}>SCROLL</span>
      {/* Mouse icon */}
      <div style={{
        width: "22px", height: "34px", border: "1px solid rgba(240,238,246,0.4)",
        borderRadius: "11px", display: "flex", justifyContent: "center", paddingTop: "6px",
      }}>
        <div style={{
          width: "2px", height: "7px",
          background: "linear-gradient(to bottom, #7B2FFF, #C9A96E)",
          borderRadius: "1px",
          animation: "scrollDot 2s ease-in-out infinite",
        }} />
      </div>
      <style>{`
        @keyframes scrollDot {
          0%   { transform: translateY(0);   opacity: 1; }
          80%  { transform: translateY(9px); opacity: 0; }
          100% { transform: translateY(0);   opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HERO
// ─────────────────────────────────────────────────────────────────────────────
export default function Hero() {
  const { t }          = useTranslation("common");
  const [ctaHover, setCtaHover] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);
  const [subVisible,   setSubVisible]   = useState(false);
  const [ctaVisible,   setCtaVisible]   = useState(false);

  useEffect(() => {
    setTimeout(() => setBadgeVisible(true),  300);
    setTimeout(() => setSubVisible(true),   1400);
    setTimeout(() => setCtaVisible(true),   1800);
  }, []);

  return (
    <section style={{
      position: "relative", width: "100%", height: "100vh",
      background: "#060608", overflow: "hidden",
    }}>

      {/* ── 3D Canvas ── */}
      <Canvas
        camera={{ position: [0, 0, 8], fov: 65 }}
        style={{ position: "absolute", inset: 0 }}
        gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>

      {/* ── Radial vignette ── */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3,
        background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(6,6,8,0.92) 100%)",
      }} />

      {/* ── Side gradient bleeds ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 3,
        background: "linear-gradient(90deg, rgba(6,6,8,0.7) 0%, transparent 25%, transparent 75%, rgba(6,6,8,0.7) 100%)" }} />

      {/* ── Hero text ── */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        textAlign: "center", padding: "0 24px",
        perspective: "800px",
      }}>

        {/* Badge */}
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "9px", letterSpacing: "0.5em",
          color: "#C9A96E",
          border: "1px solid rgba(201,169,110,0.3)",
          background: "rgba(201,169,110,0.05)",
          padding: "7px 22px", borderRadius: "1px",
          marginBottom: "40px",
          opacity:   badgeVisible ? 1 : 0,
          transform: badgeVisible ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {t("hero.badge")}
        </div>

        {/* Main headline */}
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
          fontWeight: 300, lineHeight: 1.08,
          margin: "0 0 6px", letterSpacing: "-0.025em",
        }}>
          <AnimatedWord text={t("hero.line1")} delay={500} />
        </h1>

        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(2.4rem, 6.5vw, 5.5rem)",
          fontWeight: 300, lineHeight: 1.08,
          margin: "0 0 32px", letterSpacing: "-0.025em",
        }}>
          <AnimatedWord text={t("hero.line2")} delay={700} gradient italic />
        </h1>

        {/* Sub line */}
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "rgba(240,238,246,0.45)",
          margin: "0 0 56px", letterSpacing: "0.01em",
          opacity:   subVisible ? 1 : 0,
          transform: subVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)",
        }}>
          {t("hero.line3")}{" "}
          <em style={{ color: "#C9A96E", fontStyle: "italic" }}>{t("hero.line4")}</em>
        </p>

        {/* CTA */}
        <div style={{
          opacity:   ctaVisible ? 1 : 0,
          transform: ctaVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <a
            href="https://wa.me/message/DDNIUOL264WDB1"
            target="_blank" rel="noopener noreferrer"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{
              position: "relative",
              display: "inline-flex", alignItems: "center", gap: "14px",
              padding: "18px 56px",
              background: ctaHover
                ? "linear-gradient(135deg, #9B5FFF, #7B2FFF)"
                : "linear-gradient(135deg, #7B2FFF, #5a1fd1)",
              color: "#F0EEF6",
              fontFamily: "'Space Mono', monospace",
              fontSize: "11px", letterSpacing: "0.3em",
              textDecoration: "none", borderRadius: "2px",
              transition: "all 0.45s cubic-bezier(0.16,1,0.3,1)",
              transform: ctaHover ? "translateY(-5px) scale(1.03)" : "translateY(0) scale(1)",
              boxShadow: ctaHover
                ? "0 0 100px rgba(123,47,255,0.8), 0 24px 64px rgba(0,0,0,0.5)"
                : "0 0 40px rgba(123,47,255,0.4)",
              overflow: "hidden", cursor: "none",
            }}
          >
            {/* Shimmer sweep */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)",
              transform: ctaHover ? "translateX(150%)" : "translateX(-150%)",
              transition: "transform 0.6s ease",
            }} />
            {/* WhatsApp icon */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ position: "relative", flexShrink: 0 }}>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span style={{ position: "relative" }}>{t("hero.cta")}</span>
          </a>
        </div>

        {/* Stats strip */}
        <div style={{
          position: "absolute", bottom: "100px",
          display: "flex", gap: "48px", flexWrap: "wrap", justifyContent: "center",
          opacity:   ctaVisible ? 0.55 : 0,
          transition: "opacity 1s ease 0.4s",
        }}>
          {[["120+", "Projects"], ["98%", "Satisfaction"], ["3M+", "Eyes Reached"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)", fontStyle: "italic", background: "linear-gradient(135deg, #7B2FFF, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{num}</div>
              <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "7px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.3)", marginTop: "4px" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}