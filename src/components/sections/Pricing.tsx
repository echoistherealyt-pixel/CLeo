"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

function useReveal(threshold = 0.1) {
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

// ── Service ids (static, icons stay the same) ─────────────────────────────────
const SERVICE_IDS  = ["animation", "presentation", "background", "website", "uiux", "custom"] as const;
const SERVICE_ICONS: Record<string, string> = {
  animation: "✦", presentation: "◈", background: "◉",
  website: "⬡", uiux: "◎", custom: "∞",
};
const SERVICE_BASE: Record<string, number> = {
  animation: 150, presentation: 100, background: 80,
  website: 500, uiux: 200, custom: 0,
};
const SERVICE_COLORS: Record<string, string> = {
  animation: "#7B2FFF", presentation: "#C9A96E", background: "#A855F7",
  website: "#7B2FFF", uiux: "#C9A96E", custom: "#F0EEF6",
};

const PLAN_IDS    = ["basic", "pro", "custom"] as const;
const PLAN_COLORS: Record<string, string> = {
  basic: "#C9A96E", pro: "#7B2FFF", custom: "#A855F7",
};
const PLAN_FEATURED = "pro";

// ── Plan card ─────────────────────────────────────────────────────────────────
function PlanCard({ planId, index, visible, waLink }: {
  planId: string; index: number; visible: boolean; waLink: string;
}) {
  const { t } = useTranslation("common");
  const [hovered, setHovered] = useState(false);
  const color    = PLAN_COLORS[planId];
  const featured = planId === PLAN_FEATURED;
  const features = t(`pricing.plans.${planId}.features`, { returnObjects: true }) as string[];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", flex: "1", minWidth: "260px", maxWidth: "340px",
        padding: featured ? "48px 36px 40px" : "40px 32px",
        background: featured
          ? `linear-gradient(160deg, ${color}14, rgba(8,8,12,0.97))`
          : hovered
          ? "rgba(12,12,20,0.95)"
          : "rgba(10,10,15,0.7)",
        border: `1px solid ${featured ? color + "55" : hovered ? color + "35" : "rgba(255,255,255,0.05)"}`,
        borderRadius: "4px", overflow: "hidden",
        transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        transform: visible
          ? featured
            ? hovered ? "translateY(-14px)" : "translateY(-8px)"
            : hovered ? "translateY(-8px)" : "translateY(0)"
          : "translateY(60px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.12}s`,
        boxShadow: featured
          ? `0 0 60px ${color}18, 0 30px 80px rgba(0,0,0,0.4)`
          : hovered ? `0 20px 60px rgba(0,0,0,0.4), 0 0 30px ${color}10` : "none",
        cursor: "default",
      }}
    >
      {/* Featured badge */}
      {featured && (
        <div style={{
          position: "absolute", top: 0, left: "50%",
          transform: "translateX(-50%)",
          background: `linear-gradient(90deg, #7B2FFF, #C9A96E)`,
          padding: "5px 24px",
          fontFamily: "'Space Mono', monospace",
          fontSize: "7px", letterSpacing: "0.4em", color: "#F0EEF6",
          borderRadius: "0 0 4px 4px",
        }}>
          {t("pricing.popular")}
        </div>
      )}

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "2px",
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity: featured ? 1 : hovered ? 0.7 : 0.2,
        transition: "opacity 0.4s",
      }} />

      {/* Plan name */}
      <div style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "8px", letterSpacing: "0.45em",
        color, marginBottom: "16px", textTransform: "uppercase",
      }}>
        {t(`pricing.plans.${planId}.name`)}
      </div>

      <div style={{
        fontFamily: "Georgia, serif",
        fontSize: "26px", fontStyle: "italic", fontWeight: 300,
        color: "#F0EEF6", marginBottom: "8px", letterSpacing: "-0.01em",
      }}>
        {t(`pricing.plans.${planId}.name`)}
      </div>

      <div style={{
        fontFamily: "Georgia, serif",
        fontSize: "13px", fontStyle: "italic",
        color: "rgba(240,238,246,0.3)",
        marginBottom: "36px",
      }}>
        {t(`pricing.plans.${planId}.sub`)}
      </div>

      {/* Divider */}
      <div style={{
        height: "1px", marginBottom: "28px",
        background: `linear-gradient(90deg, transparent, ${color}33, transparent)`,
      }} />

      {/* Features */}
      <div style={{ marginBottom: "36px" }}>
        {(Array.isArray(features) ? features : []).map((f: string, i: number) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "12px",
            marginBottom: "14px",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-10px)",
            transition: `opacity 0.5s ease ${(index * 0.12) + (i * 0.05) + 0.3}s, transform 0.5s ease ${(index * 0.12) + (i * 0.05) + 0.3}s`,
          }}>
            <span style={{ color, fontSize: "8px", marginTop: "3px", flexShrink: 0 }}>✦</span>
            <span style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: "10px", letterSpacing: "0.1em",
              color: "rgba(240,238,246,0.5)", lineHeight: 1.6,
            }}>
              {f}
            </span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={waLink}
        target="_blank" rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          padding: "13px 24px",
          background: featured || hovered
            ? `linear-gradient(135deg, ${color}, ${color}bb)`
            : "transparent",
          border: `1px solid ${color}55`,
          color: "#F0EEF6",
          fontFamily: "'Space Mono', monospace",
          fontSize: "9px", letterSpacing: "0.25em",
          textDecoration: "none", borderRadius: "2px",
          transition: "all 0.35s ease",
          boxShadow: featured || hovered ? `0 0 24px ${color}33` : "none",
          cursor: "none",
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = `linear-gradient(135deg, ${color}, ${color}cc)`;
          el.style.boxShadow = `0 0 40px ${color}55`;
          el.style.transform = "translateY(-1px)";
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLAnchorElement;
          el.style.background = featured || hovered ? `linear-gradient(135deg, ${color}, ${color}bb)` : "transparent";
          el.style.boxShadow = featured || hovered ? `0 0 24px ${color}33` : "none";
          el.style.transform = "none";
        }}
      >
        {t(`pricing.plans.${planId}.cta`)}
        <span style={{ opacity: 0.6 }}>→</span>
      </a>
    </div>
  );
}

// ── Service toggle button ─────────────────────────────────────────────────────
function ServiceToggle({ serviceId, selected, onToggle, visible, index }: {
  serviceId: string; selected: boolean;
  onToggle: () => void; visible: boolean; index: number;
}) {
  const { t } = useTranslation("common");
  const [hovered, setHovered] = useState(false);
  const color = SERVICE_COLORS[serviceId];
  const label = t(`pricing.services.${serviceId}`);

  return (
    <button
      onClick={onToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex", alignItems: "center", gap: "12px",
        padding: "16px 20px",
        background: selected
          ? `${color}15`
          : hovered ? "rgba(12,12,18,0.9)" : "rgba(10,10,15,0.7)",
        border: `1px solid ${selected ? color + "60" : hovered ? color + "25" : "rgba(255,255,255,0.06)"}`,
        borderRadius: "3px",
        cursor: "none", width: "100%",
        transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
        transform: visible
          ? selected ? "scale(1.02)" : "scale(1)"
          : "translateY(20px)",
        opacity: visible ? 1 : 0,
        transitionDelay: `${index * 0.05}s`,
        boxShadow: selected ? `0 0 20px ${color}20` : "none",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Selected glow */}
      {selected && (
        <div style={{
          position: "absolute", inset: 0,
          background: `radial-gradient(ellipse at 0% 50%, ${color}10, transparent 60%)`,
          pointerEvents: "none",
        }} />
      )}

      {/* Checkbox */}
      <div style={{
        width: "18px", height: "18px", flexShrink: 0,
        border: `1px solid ${selected ? color : "rgba(255,255,255,0.15)"}`,
        borderRadius: "2px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: selected ? color : "transparent",
        transition: "all 0.3s ease",
      }}>
        {selected && (
          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
            <path d="M1 4l3 3 5-6" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>

      {/* Icon */}
      <span style={{
        fontSize: "16px", color: selected ? color : "rgba(240,238,246,0.25)",
        filter: selected ? `drop-shadow(0 0 6px ${color})` : "none",
        transition: "all 0.3s",
        flexShrink: 0,
      }}>
        {SERVICE_ICONS[serviceId]}
      </span>

      {/* Label */}
      <span style={{
        fontFamily: "'Space Mono', monospace",
        fontSize: "10px", letterSpacing: "0.15em",
        color: selected ? "#F0EEF6" : hovered ? "rgba(240,238,246,0.6)" : "rgba(240,238,246,0.35)",
        transition: "color 0.3s", textAlign: "left", flex: 1,
      }}>
        {label}
      </span>

      {/* Base price hint */}
      {SERVICE_BASE[serviceId] > 0 && (
        <span style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "8px", letterSpacing: "0.1em",
          color: selected ? color : "rgba(240,238,246,0.2)",
          transition: "color 0.3s", flexShrink: 0,
        }}>
          ${SERVICE_BASE[serviceId]}+
        </span>
      )}
    </button>
  );
}

// ── Main Pricing ──────────────────────────────────────────────────────────────
export default function Pricing() {
  const { t } = useTranslation("common");
  const [selected, setSelected] = useState<string[]>([]);
  const { ref: headRef,  visible: headVisible  } = useReveal(0.1);
  const { ref: plansRef, visible: plansVisible } = useReveal(0.08);
  const { ref: calcRef,  visible: calcVisible  } = useReveal(0.08);

  const toggle = (id: string) =>
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const estimatedMin = selected.reduce((acc, id) => acc + (SERVICE_BASE[id] || 0), 0);
  const hasCustom    = selected.includes("custom");
  const hasSelected  = selected.length > 0;

  const waMsg = hasSelected
    ? `Hello! I'm interested in: ${selected.map(id => t(`pricing.services.${id}`)).join(", ")}. Can we discuss pricing?`
    : `Hello! I'd like to discuss a project with Cleo.`;
  const waLink = `https://wa.me/message/DDNIUOL264WDB1?text=${encodeURIComponent(waMsg)}`;

  return (
    <section id="pricing" style={{
      padding: "160px 48px", background: "#0a0a0f",
      position: "relative", overflow: "hidden",
    }}>
      {/* Bg glow */}
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "800px", height: "500px", background: "radial-gradient(ellipse, rgba(123,47,255,0.06), transparent 65%)", pointerEvents: "none" }} />

      {/* ── Header ── */}
      <div ref={headRef} style={{
        textAlign: "center", marginBottom: "90px",
        opacity: headVisible ? 1 : 0,
        transform: headVisible ? "translateY(0)" : "translateY(40px)",
        transition: "all 1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: "9px", letterSpacing: "0.5em",
          color: "#7B2FFF", marginBottom: "28px",
        }}>
          {t("pricing.label")}
        </div>
        <h2 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(2rem, 5vw, 4rem)",
          fontWeight: 300, fontStyle: "italic",
          color: "#F0EEF6", margin: "0 0 18px",
          letterSpacing: "-0.02em", lineHeight: 1.15,
        }}>
          {t("pricing.title")}{" "}
          <em style={{ color: "#C9A96E" }}>{t("pricing.titleAccent")}</em>
        </h2>
        <p style={{
          fontFamily: "Georgia, serif", fontSize: "15px",
          fontStyle: "italic", color: "rgba(240,238,246,0.35)",
          margin: "0 auto", maxWidth: "460px", lineHeight: 1.9,
        }}>
          {t("pricing.sub")}
        </p>
        <div style={{ width: "60px", height: "1px", background: "linear-gradient(90deg, transparent, #7B2FFF, #C9A96E, transparent)", margin: "30px auto 0" }} />
      </div>

      {/* ── Plans ── */}
      <div ref={plansRef} style={{
        display: "flex", flexWrap: "wrap", gap: "20px",
        justifyContent: "center", maxWidth: "1060px",
        margin: "0 auto 120px",
      }}>
        {PLAN_IDS.map((id, i) => (
          <PlanCard key={id} planId={id} index={i} visible={plansVisible} waLink={waLink} />
        ))}
      </div>

      {/* ── Calculator ── */}
      <div ref={calcRef} style={{
        maxWidth: "780px", margin: "0 auto",
        opacity: calcVisible ? 1 : 0,
        transform: calcVisible ? "translateY(0)" : "translateY(50px)",
        transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
      }}>
        {/* Calc header */}
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <div style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "9px", letterSpacing: "0.5em",
            color: "#C9A96E", marginBottom: "20px",
          }}>
            {t("pricing.buildLabel")}
          </div>
          <h3 style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.5rem, 4vw, 2.6rem)",
            fontWeight: 300, fontStyle: "italic",
            color: "#F0EEF6", margin: 0, letterSpacing: "-0.02em",
          }}>
            {t("pricing.buildTitle")}
          </h3>
        </div>

        {/* Service grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "10px", marginBottom: "40px",
        }}>
          {SERVICE_IDS.map((id, i) => (
            <ServiceToggle
              key={id}
              serviceId={id}
              selected={selected.includes(id)}
              onToggle={() => toggle(id)}
              visible={calcVisible}
              index={i}
            />
          ))}
        </div>

        {/* Result box */}
        <div style={{
          padding: "36px 44px",
          background: "rgba(8,8,12,0.9)",
          border: "1px solid rgba(123,47,255,0.15)",
          borderRadius: "4px", position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "28px",
          transition: "border-color 0.4s",
          borderColor: hasSelected ? "rgba(123,47,255,0.3)" : "rgba(123,47,255,0.1)",
        }}>
          {/* Top accent */}
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(123,47,255,0.4), rgba(201,169,110,0.4), transparent)",
            opacity: hasSelected ? 1 : 0.3, transition: "opacity 0.4s",
          }} />

          {/* Price display */}
          <div>
            {!hasSelected ? (
              <p style={{
                fontFamily: "Georgia, serif", fontSize: "16px",
                fontStyle: "italic", color: "rgba(240,238,246,0.25)", margin: 0,
              }}>
                {t("pricing.selectPrompt")}
              </p>
            ) : hasCustom || estimatedMin === 0 ? (
              <>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "8px", letterSpacing: "0.35em",
                  color: "#7B2FFF", marginBottom: "10px",
                }}>
                  {t("pricing.customProject")}
                </div>
                <div style={{
                  fontFamily: "Georgia, serif", fontSize: "26px",
                  fontStyle: "italic", color: "#F0EEF6",
                }}>
                  {t("pricing.talkScope")} ✦
                </div>
              </>
            ) : (
              <>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "8px", letterSpacing: "0.35em",
                  color: "#7B2FFF", marginBottom: "10px",
                }}>
                  {t("pricing.startingFrom")}
                </div>
                <div style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  fontStyle: "italic", fontWeight: 300,
                  color: "#F0EEF6", letterSpacing: "-0.02em",
                  lineHeight: 1,
                }}>
                  ${estimatedMin.toLocaleString()}
                  <span style={{
                    fontSize: "14px",
                    color: "rgba(240,238,246,0.3)",
                    marginLeft: "10px",
                    fontFamily: "'Space Mono', monospace",
                    letterSpacing: "0.1em",
                  }}>
                    USD
                  </span>
                </div>
                <div style={{
                  fontFamily: "'Space Mono', monospace",
                  fontSize: "8px", letterSpacing: "0.15em",
                  color: "rgba(240,238,246,0.22)", marginTop: "10px",
                }}>
                  {selected.length} {selected.length === 1 ? t("pricing.selected") : t("pricing.selectedPlural")} · {t("pricing.varies")}
                </div>
              </>
            )}
          </div>

          {/* CTA */}
          <a
            href={hasSelected ? waLink : "#"}
            target={hasSelected ? "_blank" : undefined}
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              padding: "15px 36px",
              background: hasSelected
                ? "linear-gradient(135deg, #7B2FFF, #5a1fd1)"
                : "rgba(255,255,255,0.04)",
              border: `1px solid ${hasSelected ? "transparent" : "rgba(255,255,255,0.07)"}`,
              color: hasSelected ? "#F0EEF6" : "rgba(240,238,246,0.2)",
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px", letterSpacing: "0.3em",
              textDecoration: "none", borderRadius: "2px",
              transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
              boxShadow: hasSelected ? "0 0 40px rgba(123,47,255,0.35)" : "none",
              pointerEvents: hasSelected ? "all" : "none",
              cursor: hasSelected ? "none" : "default",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              if (!hasSelected) return;
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "translateY(-3px)";
              el.style.boxShadow = "0 0 70px rgba(123,47,255,0.6)";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.transform = "none";
              el.style.boxShadow = hasSelected ? "0 0 40px rgba(123,47,255,0.35)" : "none";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t("pricing.getQuote")}
          </a>
        </div>
      </div>
    </section>
  );
}