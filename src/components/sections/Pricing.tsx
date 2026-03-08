"use client";

import { useState } from "react";

const services = [
  { id: "animation", label: "Animation", icon: "✦", base: 150 },
  { id: "presentation", label: "Presentation", icon: "◈", base: 100 },
  { id: "background", label: "Animated Background", icon: "◉", base: 80 },
  { id: "website", label: "Full Website", icon: "⬡", base: 500 },
  { id: "uiux", label: "UI / UX Design", icon: "◎", base: 200 },
  { id: "custom", label: "Something Custom", icon: "∞", base: 0 },
];

const plans = [
  {
    id: "basic",
    name: "Basic",
    sub: "For individuals & small projects",
    color: "#C9A96E",
    features: ["1 deliverable", "2 revision rounds", "5-day delivery", "Source files included"],
    cta: "Start Basic",
  },
  {
    id: "pro",
    name: "Pro",
    sub: "For brands that want to stand out",
    color: "#7B2FFF",
    featured: true,
    features: ["Up to 3 deliverables", "Unlimited revisions", "Priority delivery", "Source files included", "Post-delivery support"],
    cta: "Start Pro",
  },
  {
    id: "custom",
    name: "Custom",
    sub: "Full creative partnership",
    color: "#A855F7",
    features: ["Unlimited scope", "Dedicated workflow", "Direct line of contact", "Everything in Pro", "Long-term retainer option"],
    cta: "Let's Talk",
  },
];

export default function Pricing() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleService = (id: string) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const estimatedMin = selected.reduce((acc, id) => {
    const s = services.find(s => s.id === id);
    return acc + (s?.base || 0);
  }, 0);

  const waMsg = selected.length
    ? `Hello! I'm interested in: ${selected.map(id => services.find(s => s.id === id)?.label).join(", ")}. Can we discuss pricing?`
    : `Hello! I'd like to discuss a project with Cleo.`;

  const waLink = `https://wa.me/message/DDNIUOL264WDB1?text=${encodeURIComponent(waMsg)}`;

  return (
    <section id="pricing" style={{ padding: "120px 48px", background: "#0a0a0f", position: "relative", overflow: "hidden" }}>

      {/* Bg glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: "700px", height: "400px", background: "radial-gradient(ellipse, rgba(123,47,255,0.06), transparent 70%)", pointerEvents: "none" }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: "80px" }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#7B2FFF", marginBottom: "20px" }}>✦ INVESTMENT ✦</div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0, marginBottom: "16px", letterSpacing: "-0.02em" }}>
          What's your <em style={{ color: "#C9A96E" }}>vision worth?</em>
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "15px", color: "rgba(240,238,246,0.35)", margin: 0, fontStyle: "italic" }}>
          Every project is unique. Pick a plan or build your own.
        </p>
      </div>

      {/* ── Plans ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "24px", maxWidth: "900px", margin: "0 auto 100px" }}>
        {plans.map(plan => (
          <div key={plan.id} style={{
            position: "relative",
            padding: "40px 32px",
            background: plan.featured ? `linear-gradient(160deg, rgba(123,47,255,0.12), rgba(10,10,15,0.95))` : "rgba(12,12,18,0.8)",
            border: `1px solid ${plan.featured ? plan.color + "55" : plan.color + "22"}`,
            borderRadius: "8px",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            boxShadow: plan.featured ? `0 0 40px rgba(123,47,255,0.12)` : "none",
            transform: plan.featured ? "translateY(-8px)" : "none",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = plan.featured ? "translateY(-12px)" : "translateY(-4px)")}
          onMouseLeave={e => (e.currentTarget.style.transform = plan.featured ? "translateY(-8px)" : "none")}
          >
            {plan.featured && (
              <div style={{
                position: "absolute", top: "-1px", left: "50%", transform: "translateX(-50%)",
                background: "linear-gradient(90deg, #7B2FFF, #C9A96E)",
                padding: "4px 20px", borderRadius: "0 0 6px 6px",
                fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.3em", color: "#F0EEF6",
              }}>MOST POPULAR</div>
            )}

            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: plan.color, marginBottom: "12px" }}>{plan.name.toUpperCase()}</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "22px", fontStyle: "italic", color: "#F0EEF6", marginBottom: "8px" }}>{plan.name}</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: "12px", color: "rgba(240,238,246,0.35)", fontStyle: "italic", marginBottom: "32px" }}>{plan.sub}</div>

            <div style={{ marginBottom: "36px" }}>
              {plan.features.map(f => (
                <div key={f} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                  <span style={{ color: plan.color, fontSize: "10px" }}>✦</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.1em", color: "rgba(240,238,246,0.55)" }}>{f}</span>
                </div>
              ))}
            </div>

            <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
              display: "block", textAlign: "center",
              padding: "12px 24px",
              background: plan.featured ? `linear-gradient(135deg, #7B2FFF, #5a1fd1)` : "transparent",
              border: `1px solid ${plan.color}55`,
              color: "#F0EEF6",
              fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em",
              textDecoration: "none", borderRadius: "2px",
              transition: "all 0.3s ease",
              boxShadow: plan.featured ? "0 0 20px rgba(123,47,255,0.3)" : "none",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = `linear-gradient(135deg, ${plan.color}, ${plan.color}aa)`;
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 30px ${plan.color}44`;
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = plan.featured ? "linear-gradient(135deg, #7B2FFF, #5a1fd1)" : "transparent";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = plan.featured ? "0 0 20px rgba(123,47,255,0.3)" : "none";
            }}
            >{plan.cta} →</a>
          </div>
        ))}
      </div>

      {/* ── Calculator ── */}
      <div style={{ maxWidth: "720px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.4em", color: "#C9A96E", marginBottom: "16px" }}>✦ BUILD YOUR OWN ✦</div>
          <h3 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 300, fontStyle: "italic", color: "#F0EEF6", margin: 0 }}>
            Pick what you need
          </h3>
        </div>

        {/* Service toggles */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "48px" }}>
          {services.map(s => {
            const isOn = selected.includes(s.id);
            return (
              <button key={s.id} onClick={() => toggleService(s.id)} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "16px 20px",
                background: isOn ? "rgba(123,47,255,0.15)" : "rgba(12,12,18,0.8)",
                border: `1px solid ${isOn ? "#7B2FFF" : "rgba(255,255,255,0.08)"}`,
                borderRadius: "6px", cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: isOn ? "0 0 20px rgba(123,47,255,0.15)" : "none",
              }}>
                <span style={{ fontSize: "18px", color: isOn ? "#7B2FFF" : "rgba(240,238,246,0.3)", transition: "color 0.3s" }}>{s.icon}</span>
                <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: isOn ? "#F0EEF6" : "rgba(240,238,246,0.4)", transition: "color 0.3s", textAlign: "left" }}>{s.label}</span>
                {isOn && <span style={{ marginLeft: "auto", color: "#C9A96E", fontSize: "12px" }}>✓</span>}
              </button>
            );
          })}
        </div>

        {/* Result */}
        <div style={{
          padding: "32px 40px",
          background: "rgba(12,12,18,0.9)",
          border: "1px solid rgba(123,47,255,0.2)",
          borderRadius: "8px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "24px",
        }}>
          <div>
            {selected.length === 0 ? (
              <div style={{ fontFamily: "Georgia, serif", fontSize: "16px", fontStyle: "italic", color: "rgba(240,238,246,0.3)" }}>Select services to get a quote</div>
            ) : selected.includes("custom") || estimatedMin === 0 ? (
              <>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: "#7B2FFF", marginBottom: "8px" }}>CUSTOM PROJECT</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "24px", fontStyle: "italic", color: "#F0EEF6" }}>Let's talk scope ✦</div>
              </>
            ) : (
              <>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", color: "#7B2FFF", marginBottom: "8px" }}>STARTING FROM</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: "36px", fontStyle: "italic", color: "#F0EEF6" }}>
                  ${estimatedMin.toLocaleString()}
                  <span style={{ fontSize: "16px", color: "rgba(240,238,246,0.3)", marginLeft: "8px" }}>USD</span>
                </div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", color: "rgba(240,238,246,0.25)", marginTop: "8px" }}>
                  {selected.length} service{selected.length > 1 ? "s" : ""} selected • Final price varies by complexity
                </div>
              </>
            )}
          </div>

          <a href={waLink} target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "10px",
            padding: "14px 32px",
            background: selected.length ? "linear-gradient(135deg, #7B2FFF, #5a1fd1)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${selected.length ? "transparent" : "rgba(255,255,255,0.08)"}`,
            color: selected.length ? "#F0EEF6" : "rgba(240,238,246,0.3)",
            fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em",
            textDecoration: "none", borderRadius: "2px",
            transition: "all 0.3s ease",
            boxShadow: selected.length ? "0 0 30px rgba(123,47,255,0.3)" : "none",
            pointerEvents: selected.length ? "auto" : "none",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            GET QUOTE →
          </a>
        </div>
      </div>
    </section>
  );
}