"use client";

import { useRef, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

function FilmGrain() {
  return (
    <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`, opacity: 0.04, pointerEvents: "none", animation: "grainShift 0.1s steps(1) infinite", zIndex: 5 }} />
  );
}

function CinematicBars() {
  return (
    <>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to bottom, #000, transparent)", zIndex: 4, pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, #000, transparent)", zIndex: 4, pointerEvents: "none" }} />
    </>
  );
}

function VideoParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();

  const { positions, colors, speeds } = useMemo(() => {
    const count = 4000;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      speeds[i] = Math.random() * 0.5 + 0.1;
      const r = Math.random();
      if (r < 0.6) { colors[i*3]=0.2+Math.random()*0.3; colors[i*3+1]=0.05+Math.random()*0.1; colors[i*3+2]=0.6+Math.random()*0.4; }
      else if (r < 0.85) { colors[i*3]=0.7+Math.random()*0.3; colors[i*3+1]=0.55+Math.random()*0.2; colors[i*3+2]=0.2+Math.random()*0.2; }
      else { const v=0.7+Math.random()*0.3; colors[i*3]=v; colors[i*3+1]=v; colors[i*3+2]=v; }
    }
    return { positions, colors, speeds };
  }, []);

  const posArray = useRef(positions.slice());

  useFrame(() => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < pos.length / 3; i++) {
      pos[i*3] += speeds[i] * 0.015;
      pos[i*3+1] += Math.sin(Date.now()*0.001 + i*0.1) * 0.002;
      if (pos[i*3] > 15) pos[i*3] = -15;
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
    meshRef.current.rotation.y = mouse.x * 0.05;
    meshRef.current.rotation.x = -mouse.y * 0.03;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[posArray.current, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} vertexColors transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

function MorphOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * 0.3;
    meshRef.current.rotation.x = t * 0.2;
    meshRef.current.rotation.y = t * 0.3;
    meshRef.current.scale.setScalar(1 + Math.sin(t) * 0.06);
  });
  return (
    <mesh ref={meshRef} position={[2, -0.5, -4]}>
      <icosahedronGeometry args={[2.2, 1]} />
      <meshStandardMaterial color="#7B2FFF" emissive="#3a0066" emissiveIntensity={0.5} transparent opacity={0.07} wireframe />
    </mesh>
  );
}

function LightStreak() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.x = Math.sin(t * 0.4) * 8;
    ref.current.position.y = Math.sin(t * 0.2) * 2;
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.04 + Math.sin(t) * 0.02;
  });
  return (
    <mesh ref={ref} rotation={[0, 0, Math.PI / 2]}>
      <planeGeometry args={[0.03, 20]} />
      <meshBasicMaterial color="#C9A96E" transparent opacity={0.05} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 3]} intensity={0.8} color="#7B2FFF" />
      <pointLight position={[-8, 3, 0]} intensity={0.3} color="#C9A96E" />
      <VideoParticles />
      <MorphOrb />
      <LightStreak />
    </>
  );
}

function HeroText() {
  const { t } = useTranslation("common");

  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 10 }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#C9A96E", marginBottom: "32px", animation: "heroFadeUp 1s ease 0.2s both", border: "1px solid rgba(201,169,110,0.25)", padding: "6px 20px", borderRadius: "1px", background: "rgba(201,169,110,0.05)" }}>
        {t("hero.badge")}
      </div>

      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2.2rem, 6vw, 5rem)", fontWeight: 400, color: "#F0EEF6", textAlign: "center", lineHeight: 1.1, margin: 0, marginBottom: "8px", animation: "heroFadeUp 1s ease 0.4s both", letterSpacing: "-0.02em" }}>
        {t("hero.line1")}
      </h1>
      <h1 style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "clamp(2.2rem, 6vw, 5rem)", fontWeight: 400, fontStyle: "italic", background: "linear-gradient(135deg, #7B2FFF, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", textAlign: "center", lineHeight: 1.1, margin: 0, marginBottom: "40px", animation: "heroFadeUp 1s ease 0.55s both", letterSpacing: "-0.02em" }}>
        {t("hero.line2")}
      </h1>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 3vw, 2rem)", fontWeight: 300, color: "rgba(240,238,246,0.5)", textAlign: "center", margin: 0, marginBottom: "60px", animation: "heroFadeUp 1s ease 0.7s both", fontStyle: "italic" }}>
        {t("hero.line3")} <em style={{ color: "#C9A96E" }}>{t("hero.line4")}</em>
      </h2>

      <div style={{ pointerEvents: "all", animation: "heroFadeUp 1s ease 0.9s both" }}>
        <a href="https://wa.me/message/DDNIUOL264WDB1" target="_blank" rel="noopener noreferrer"
          style={{ display: "inline-block", padding: "16px 48px", background: "linear-gradient(135deg, #7B2FFF, #5a1fd1)", color: "#F0EEF6", fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.25em", textDecoration: "none", borderRadius: "2px", transition: "transform 0.3s ease, box-shadow 0.3s ease", boxShadow: "0 0 30px rgba(123,47,255,0.4)" }}
          onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 60px rgba(123,47,255,0.7)"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(123,47,255,0.4)"; }}
        >{t("hero.cta")}</a>
      </div>

      <div style={{ position: "absolute", bottom: "40px", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", animation: "heroFadeUp 1s ease 1.2s both", opacity: 0.4 }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#F0EEF6" }}>SCROLL</span>
        <div style={{ width: "1px", height: "40px", background: "linear-gradient(to bottom, #F0EEF6, transparent)", animation: "scrollLine 2s ease-in-out infinite" }} />
      </div>

      <style>{`
        @keyframes heroFadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scrollLine { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes grainShift { 0% { transform: translate(0,0); } 25% { transform: translate(-2%,-1%); } 50% { transform: translate(1%,2%); } 75% { transform: translate(2%,-2%); } 100% { transform: translate(-1%,1%); } }
      `}</style>
    </div>
  );
}

export default function Hero() {
  return (
    <section style={{ position: "relative", width: "100%", height: "100vh", background: "#060608", overflow: "hidden" }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 70 }} style={{ position: "absolute", inset: 0 }} gl={{ antialias: true, alpha: false }}>
        <Scene />
      </Canvas>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 30% 60%, rgba(0,20,40,0.4) 0%, transparent 60%)", mixBlendMode: "multiply", pointerEvents: "none", zIndex: 2 }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)", pointerEvents: "none", zIndex: 3 }} />
      <FilmGrain />
      <CinematicBars />
      <HeroText />
    </section>
  );
}