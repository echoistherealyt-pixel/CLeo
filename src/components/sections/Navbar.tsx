"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CleoLogo from "@/components/ui/CleoLogo";

const languages = [
  { code: "en", label: "English",    short: "EN", dir: "ltr" },
  { code: "ar", label: "العربية",    short: "AR", dir: "rtl" },
  { code: "fr", label: "Français",   short: "FR", dir: "ltr" },
  { code: "de", label: "Deutsch",    short: "DE", dir: "ltr" },
  { code: "es", label: "Español",    short: "ES", dir: "ltr" },
  { code: "it", label: "Italiano",   short: "IT", dir: "ltr" },
  { code: "ru", label: "Русский",    short: "RU", dir: "ltr" },
  { code: "sv", label: "Svenska",    short: "SV", dir: "ltr" },
  { code: "pt", label: "Português",  short: "PT", dir: "ltr" },
  { code: "zh", label: "中文",        short: "ZH", dir: "ltr" },
  { code: "ja", label: "日本語",      short: "JA", dir: "ltr" },
];

// ── Active link underline indicator ──────────────────────────────────────────
function NavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  const [active,  setActive ] = useState(false);

  useEffect(() => {
    const check = () => {
      if (href === "#") { setActive(window.scrollY < 80); return; }
      const el = document.querySelector(href) as HTMLElement | null;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      setActive(rect.top <= 120 && rect.bottom > 120);
    };
    window.addEventListener("scroll", check, { passive: true });
    check();
    return () => window.removeEventListener("scroll", check);
  }, [href]);

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        color: active ? "#C9A96E" : hovered ? "#F0EEF6" : "rgba(240,238,246,0.45)",
        textDecoration: "none",
        fontFamily: "'Space Mono', monospace",
        fontSize: "9px", letterSpacing: "0.3em",
        textTransform: "uppercase",
        transition: "color 0.3s ease",
        paddingBottom: "4px",
        cursor: "none",
      }}
    >
      {label}
      {/* Underline */}
      <span style={{
        position: "absolute", bottom: 0, left: 0,
        height: "1px",
        width: active ? "100%" : hovered ? "100%" : "0%",
        background: active
          ? "linear-gradient(90deg, #7B2FFF, #C9A96E)"
          : "rgba(240,238,246,0.4)",
        transition: "width 0.35s cubic-bezier(0.16,1,0.3,1)",
      }} />
    </a>
  );
}

// ── Language switcher ─────────────────────────────────────────────────────────
function LangSwitcher() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = languages.find(l => l.code === i18n.language) || languages[0];

  const change = (lang: typeof languages[0]) => {
    i18n.changeLanguage(lang.code);
    document.documentElement.dir  = lang.dir;
    document.documentElement.lang = lang.code;
    setOpen(false);
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "flex", alignItems: "center", gap: "7px",
          background: open ? "rgba(123,47,255,0.12)" : "transparent",
          border: `1px solid ${open ? "rgba(123,47,255,0.4)" : "rgba(255,255,255,0.08)"}`,
          borderRadius: "2px", padding: "7px 12px",
          color: open ? "#C9A96E" : "rgba(240,238,246,0.45)",
          fontFamily: "'Space Mono', monospace",
          fontSize: "9px", letterSpacing: "0.2em",
          cursor: "none", transition: "all 0.3s ease",
        }}
        onMouseEnter={e => { if (!open) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(123,47,255,0.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#F0EEF6"; }}}
        onMouseLeave={e => { if (!open) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,238,246,0.45)"; }}}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20M2 12h20"/>
        </svg>
        {active.short}
        <svg width="7" height="5" viewBox="0 0 10 6" fill="currentColor" style={{ transition: "transform 0.3s", transform: open ? "rotate(180deg)" : "none" }}>
          <path d="M0 0l5 6 5-6z"/>
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 10px)", right: 0,
          background: "rgba(10,10,15,0.98)",
          border: "1px solid rgba(123,47,255,0.2)",
          borderTop: "2px solid #7B2FFF",
          backdropFilter: "blur(28px)",
          borderRadius: "2px",
          minWidth: "170px", overflow: "hidden",
          boxShadow: "0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(123,47,255,0.08)",
          animation: "dropIn 0.22s cubic-bezier(0.16,1,0.3,1)",
          zIndex: 100,
        }}>
          {/* Search-style header */}
          <div style={{
            padding: "10px 16px 8px",
            fontFamily: "'Space Mono', monospace",
            fontSize: "7px", letterSpacing: "0.4em",
            color: "rgba(123,47,255,0.6)",
            borderBottom: "1px solid rgba(255,255,255,0.04)",
          }}>
            SELECT LANGUAGE
          </div>

          {/* Two-column grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(255,255,255,0.03)" }}>
            {languages.map(lang => {
              const isActive = active.code === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => change(lang)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 14px",
                    background: isActive ? "rgba(123,47,255,0.12)" : "rgba(10,10,15,0.95)",
                    border: "none", cursor: "none",
                    color: isActive ? "#C9A96E" : "rgba(240,238,246,0.5)",
                    fontFamily: "'Space Mono', monospace",
                    fontSize: "9px", letterSpacing: "0.12em",
                    transition: "all 0.2s ease", textAlign: "left",
                    position: "relative",
                  }}
                  onMouseEnter={e => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.background = "rgba(123,47,255,0.1)";
                    b.style.color = "#F0EEF6";
                  }}
                  onMouseLeave={e => {
                    const b = e.currentTarget as HTMLButtonElement;
                    b.style.background = isActive ? "rgba(123,47,255,0.12)" : "rgba(10,10,15,0.95)";
                    b.style.color = isActive ? "#C9A96E" : "rgba(240,238,246,0.5)";
                  }}
                >
                  {isActive && (
                    <span style={{
                      position: "absolute", left: 0, top: 0, bottom: 0,
                      width: "2px",
                      background: "linear-gradient(180deg, #7B2FFF, #C9A96E)",
                    }} />
                  )}
                  <span>{lang.label}</span>
                  <span style={{ opacity: 0.3, fontSize: "8px" }}>{lang.short}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Mobile fullscreen menu ────────────────────────────────────────────────────
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t, i18n } = useTranslation("common");
  const navLinks = [
    { key: "services", href: "#services" },
    { key: "work",     href: "#work"     },
    { key: "pricing",  href: "#pricing"  },
    { key: "contact",  href: "#contact"  },
  ];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 998,
      background: "#0a0a0f",
      display: "flex", flexDirection: "column",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "all" : "none",
      transition: "opacity 0.4s ease",
    }}>
      {/* Top gradient bar */}
      <div style={{ height: "2px", background: "linear-gradient(90deg, #7B2FFF, #C9A96E, #7B2FFF)" }} />

      {/* Ambient orb */}
      <div style={{
        position: "absolute", top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px", height: "500px",
        background: "radial-gradient(circle, rgba(123,47,255,0.08), transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "0px",
        padding: "80px 40px 40px",
      }}>
        {/* Nav links */}
        {navLinks.map((link, i) => (
          <a
            key={link.key}
            href={link.href}
            onClick={onClose}
            style={{
              width: "100%", maxWidth: "320px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "22px 0",
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              color: "#F0EEF6",
              textDecoration: "none",
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.4rem, 6vw, 2rem)",
              fontStyle: "italic", fontWeight: 300,
              letterSpacing: "-0.01em",
              opacity: open ? 1 : 0,
              transform: open ? "translateX(0)" : "translateX(-30px)",
              transition: `opacity 0.5s ease ${i * 0.08 + 0.15}s, transform 0.5s cubic-bezier(0.16,1,0.3,1) ${i * 0.08 + 0.15}s`,
              cursor: "none",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#C9A96E"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "#F0EEF6"; }}
          >
            <span>{t(`nav.${link.key}`)}</span>
            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "rgba(240,238,246,0.2)" }}>
              0{i + 1}
            </span>
          </a>
        ))}

        {/* CTA */}
        <a
          href="https://wa.me/message/DDNIUOL264WDB1"
          target="_blank" rel="noopener noreferrer"
          onClick={onClose}
          style={{
            marginTop: "40px",
            display: "inline-flex", alignItems: "center", gap: "12px",
            padding: "16px 44px",
            background: "linear-gradient(135deg, #7B2FFF, #5a1fd1)",
            color: "#F0EEF6",
            fontFamily: "'Space Mono', monospace",
            fontSize: "11px", letterSpacing: "0.3em",
            textDecoration: "none", borderRadius: "2px",
            boxShadow: "0 0 40px rgba(123,47,255,0.35)",
            opacity: open ? 1 : 0,
            transform: open ? "translateY(0)" : "translateY(20px)",
            transition: `opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s`,
            cursor: "none",
          }}
        >
          {t("nav.start")}
        </a>

        {/* Lang options in mobile */}
        <div style={{
          display: "flex", flexWrap: "wrap", gap: "8px",
          justifyContent: "center", marginTop: "32px", maxWidth: "320px",
          opacity: open ? 0.6 : 0, transition: "opacity 0.5s ease 0.55s",
        }}>
          {languages.map(lang => (
            <button
              key={lang.code}
              onClick={() => { i18n.changeLanguage(lang.code); document.documentElement.dir = lang.dir; document.documentElement.lang = lang.code; }}
              style={{
                background: i18n.language === lang.code ? "rgba(123,47,255,0.2)" : "transparent",
                border: `1px solid ${i18n.language === lang.code ? "rgba(123,47,255,0.5)" : "rgba(255,255,255,0.1)"}`,
                color: i18n.language === lang.code ? "#C9A96E" : "rgba(240,238,246,0.4)",
                fontFamily: "'Space Mono', monospace", fontSize: "8px", letterSpacing: "0.15em",
                padding: "5px 10px", borderRadius: "2px", cursor: "none",
                transition: "all 0.2s ease",
              }}
            >
              {lang.short}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Navbar ───────────────────────────────────────────────────────────────
export default function Navbar() {
  const { t } = useTranslation("common");
  const [scrolled,  setScrolled ] = useState(false);
  const [menuOpen,  setMenuOpen ] = useState(false);
  const [visible,   setVisible  ] = useState(false);

  const navLinks = [
    { key: "services", href: "#services" },
    { key: "work",     href: "#work"     },
    { key: "pricing",  href: "#pricing"  },
    { key: "contact",  href: "#contact"  },
  ];

  useEffect(() => { setTimeout(() => setVisible(true), 200); }, []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "14px 48px" : "22px 48px",
        background: scrolled
          ? "rgba(8,8,12,0.92)"
          : "linear-gradient(180deg, rgba(6,6,8,0.7) 0%, transparent 100%)",
        backdropFilter: scrolled ? "blur(28px)" : "none",
        transition: "padding 0.4s ease, background 0.4s ease, backdrop-filter 0.4s ease",
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-16px)",
        // Smooth entry
        transitionProperty: "padding, background, backdrop-filter, opacity, transform",
        transitionDuration: "0.4s, 0.4s, 0.4s, 0.7s, 0.7s",
        transitionTimingFunction: "ease",
      }}>

        {/* Bottom border — only when scrolled */}
        {scrolled && (
          <div style={{
            position: "absolute", bottom: 0, left: "5%", right: "5%",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(123,47,255,0.2), rgba(201,169,110,0.15), transparent)",
            pointerEvents: "none",
          }} />
        )}

        {/* Logo */}
        <a href="#" style={{ textDecoration: "none", cursor: "none" }}>
          <CleoLogo width={108} />
        </a>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "38px" }} className="desktop-nav">
          {navLinks.map(l => (
            <NavLink key={l.key} href={l.href} label={t(`nav.${l.key}`)} />
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="desktop-nav">
            <LangSwitcher />
          </div>

          {/* CTA */}
          <a
            href="https://wa.me/message/DDNIUOL264WDB1"
            target="_blank" rel="noopener noreferrer"
            className="desktop-nav"
            style={{
              position: "relative", overflow: "hidden",
              display: "inline-flex", alignItems: "center", gap: "8px",
              padding: "9px 22px",
              background: "transparent",
              border: "1px solid rgba(123,47,255,0.5)",
              color: "#F0EEF6",
              fontFamily: "'Space Mono', monospace",
              fontSize: "9px", letterSpacing: "0.25em",
              textDecoration: "none", borderRadius: "2px",
              transition: "all 0.35s ease",
              cursor: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "rgba(123,47,255,0.15)";
              el.style.borderColor = "rgba(123,47,255,0.8)";
              el.style.boxShadow = "0 0 24px rgba(123,47,255,0.3)";
              el.style.color = "#C9A96E";
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.background = "transparent";
              el.style.borderColor = "rgba(123,47,255,0.5)";
              el.style.boxShadow = "none";
              el.style.color = "#F0EEF6";
            }}
          >
            <span style={{ color: "#7B2FFF", fontSize: "8px" }}>✦</span>
            {t("nav.start")}
          </a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="mobile-menu-btn"
            style={{
              display: "none", background: "none", border: "none",
              cursor: "none", padding: "6px", flexDirection: "column", gap: "5px",
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", height: "1px",
                background: menuOpen ? "#C9A96E" : "#F0EEF6",
                transition: "all 0.35s cubic-bezier(0.16,1,0.3,1)",
                width: i === 1 ? (menuOpen ? "14px" : "22px") : "22px",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(4px, 4px)"
                  : i === 2 ? "rotate(-45deg) translate(4px, -4px)"
                  : "scaleX(0) translateX(8px)"
                  : "none",
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <style>{`
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
        }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}