"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import "@/i18n";
import Preloader        from "@/components/ui/Preloader";
import CustomCursor     from "@/components/ui/CustomCursor";
import { ScrollToTop }  from "@/hooks/useReveal";
import Navbar           from "@/components/sections/Navbar";
import Hero             from "@/components/sections/Hero";
import Services         from "@/components/sections/Services";
import Work             from "@/components/sections/Work";
import Pricing          from "@/components/sections/Pricing";
import Testimonials     from "@/components/sections/Testimonials";
import Contact          from "@/components/sections/Contact";
import Footer           from "@/components/sections/Footer";
import { StatsSection, ProcessSection, ToolsSection } from "@/components/sections/NewSections";

// ─────────────────────────────────────────────────────────────────────────────
// VIGNETTE — subtle cinematic edge darkening
// ─────────────────────────────────────────────────────────────────────────────
function Vignette() {
  return (
    <div style={{
      position: "fixed", inset: 0, pointerEvents: "none", zIndex: 9,
      background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)",
    }} />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GLITCH FLASH — fires when crossing a section boundary
// ─────────────────────────────────────────────────────────────────────────────
function GlitchFlash({ trigger }: { trigger: number }) {
  const [phase, setPhase] = useState(0);
  const prev = useRef(trigger);

  useEffect(() => {
    if (trigger === prev.current) return;
    prev.current = trigger;

    // Three rapid flashes with different colors = edit cut feel
    setPhase(1);
    setTimeout(() => setPhase(2), 55);
    setTimeout(() => setPhase(3), 95);
    setTimeout(() => setPhase(0), 140);
  }, [trigger]);

  const colors = ["transparent", "rgba(123,47,255,0.12)", "rgba(201,169,110,0.08)", "rgba(240,238,246,0.05)"];

  return (
    <>
      {/* Color flash */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 10,
        background: colors[phase],
        transition: phase === 0 ? "background 0.2s ease" : "none",
      }} />
      {/* Horizontal glitch line */}
      {phase > 0 && (
        <div style={{
          position: "fixed",
          top: `${20 + Math.random() * 60}%`,
          left: 0, right: 0,
          height: `${1 + Math.random() * 3}px`,
          background: phase === 1 ? "rgba(123,47,255,0.5)" : "rgba(201,169,110,0.4)",
          pointerEvents: "none", zIndex: 11,
          transform: `translateX(${(Math.random() - 0.5) * 40}px)`,
        }} />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PARALLAX BACKGROUND — floating orbs that move at different scroll speeds
// ─────────────────────────────────────────────────────────────────────────────
function ParallaxBackground({ scrollY }: { scrollY: number }) {
  const orbs = [
    { x: "15%",  y: 300,  size: 600, speed: 0.08, color: "rgba(123,47,255,0.06)"  },
    { x: "75%",  y: 900,  size: 500, speed: 0.14, color: "rgba(201,169,110,0.05)" },
    { x: "40%",  y: 1800, size: 700, speed: 0.06, color: "rgba(123,47,255,0.04)"  },
    { x: "85%",  y: 2600, size: 450, speed: 0.18, color: "rgba(201,169,110,0.06)" },
    { x: "10%",  y: 3500, size: 550, speed: 0.1,  color: "rgba(168,85,247,0.05)"  },
    { x: "60%",  y: 4500, size: 650, speed: 0.07, color: "rgba(123,47,255,0.05)"  },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {orbs.map((orb, i) => (
        <div key={i} style={{
          position: "absolute",
          left: orb.x,
          top: orb.y - scrollY * orb.speed,
          width:  orb.size,
          height: orb.size,
          marginLeft: -orb.size / 2,
          marginTop:  -orb.size / 2,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          willChange: "transform",
        }} />
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION REVEAL WRAPPER — each section enters like an AE composition
// ─────────────────────────────────────────────────────────────────────────────
type RevealStyle = "slide-up" | "slide-left" | "slide-right" | "scale-in" | "glitch-in";

function SectionReveal({
  children,
  revealStyle = "slide-up",
  delay = 0,
}: {
  children: React.ReactNode;
  revealStyle?: RevealStyle;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [glitchFrames, setGlitchFrames] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (revealStyle === "glitch-in") {
            setGlitchFrames(true);
            setTimeout(() => { setGlitchFrames(false); setVisible(true); }, 180);
          } else {
            setVisible(true);
          }
          obs.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [revealStyle]);

  const getInitial = (): React.CSSProperties => {
    switch (revealStyle) {
      case "slide-left":  return { opacity: 0, transform: "translateX(-60px)" };
      case "slide-right": return { opacity: 0, transform: "translateX(60px)"  };
      case "scale-in":    return { opacity: 0, transform: "scale(0.94)"       };
      case "glitch-in":   return { opacity: 0, transform: "translateY(30px)"  };
      default:            return { opacity: 0, transform: "translateY(50px)"  };
    }
  };

  const getVisible = (): React.CSSProperties => ({
    opacity: 1, transform: "none",
  });

  const glitchStyle: React.CSSProperties = glitchFrames ? {
    opacity: 0.4,
    transform: `translateX(${(Math.random() - 0.5) * 20}px) skewX(${(Math.random() - 0.5) * 4}deg)`,
    filter: "hue-rotate(90deg)",
  } : {};

  return (
    <div ref={ref} style={{
      ...(visible ? getVisible() : getInitial()),
      ...glitchStyle,
      transition: visible
        ? `opacity 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}ms`
        : "none",
      willChange: "opacity, transform",
    }}>
      {children}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SCROLL PROGRESS BAR — thin line at top like a video timeline
// ─────────────────────────────────────────────────────────────────────────────
function ScrollProgress({ scrollY }: { scrollY: number }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    setProgress(total > 0 ? (scrollY / total) * 100 : 0);
  }, [scrollY]);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0,
      height: "2px", zIndex: 9999, pointerEvents: "none",
    }}>
      <div style={{
        height: "100%",
        width: `${progress}%`,
        background: "linear-gradient(90deg, #7B2FFF, #C9A96E)",
        boxShadow: "0 0 8px rgba(123,47,255,0.8)",
        transition: "width 0.1s linear",
      }} />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Home() {
  const [loaded, setLoaded]           = useState(false);
  const [scrollY, setScrollY]         = useState(0);
  const [cutTrigger, setCutTrigger]   = useState(0);
  const lastY  = useRef(0);
  const ticking = useRef(false);

  // Smooth scroll tracking with RAF
  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const y = window.scrollY;

          // Section crossing detection → glitch cut
          document.querySelectorAll("section").forEach(sec => {
            const top = (sec as HTMLElement).offsetTop;
            if ((lastY.current < top && y >= top) || (lastY.current > top && y <= top)) {
              setCutTrigger(t => t + 1);
            }
          });

          lastY.current = y;
          setScrollY(y);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <CustomCursor />
      <Preloader onComplete={() => setLoaded(true)} />

      {/* ── Persistent cinematic overlays ── */}
      <Vignette />
      <GlitchFlash trigger={cutTrigger} />
      <ParallaxBackground scrollY={scrollY} />
      {loaded && <ScrollProgress scrollY={scrollY} />}

      {/* ── Main content ── */}
      <main style={{
        background: "#0a0a0f",
        minHeight: "100vh",
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.7s ease 0.2s",
        position: "relative", zIndex: 1,
      }}>
        <Navbar />

        {/* Hero — no wrapper, has its own cinematic entrance */}
        <Hero />

        {/* Each section has a unique motion graphic entrance */}
        <SectionReveal revealStyle="slide-up">
          <Services />
        </SectionReveal>

        <SectionReveal revealStyle="scale-in" delay={50}>
          <StatsSection />
        </SectionReveal>

        <SectionReveal revealStyle="glitch-in" delay={0}>
          <Work />
        </SectionReveal>

        <SectionReveal revealStyle="slide-left" delay={80}>
          <ProcessSection />
        </SectionReveal>

        <SectionReveal revealStyle="slide-right" delay={60}>
          <Testimonials />
        </SectionReveal>

        <SectionReveal revealStyle="scale-in" delay={40}>
          <ToolsSection />
        </SectionReveal>

        <SectionReveal revealStyle="slide-up" delay={0}>
          <Pricing />
        </SectionReveal>

        <SectionReveal revealStyle="glitch-in" delay={30}>
          <Contact />
        </SectionReveal>

        <Footer />
        <ScrollToTop />
      </main>
    </>
  );
}