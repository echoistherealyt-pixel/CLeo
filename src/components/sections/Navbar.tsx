"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import CleoLogo from "@/components/ui/CleoLogo";

const languages = [
  { code: "en", label: "English", short: "EN", dir: "ltr" },
  { code: "ar", label: "العربية", short: "AR", dir: "rtl" },
  { code: "fr", label: "Français", short: "FR", dir: "ltr" },
  { code: "de", label: "Deutsch", short: "DE", dir: "ltr" },
  { code: "es", label: "Español", short: "ES", dir: "ltr" },
  { code: "it", label: "Italiano", short: "IT", dir: "ltr" },
  { code: "ru", label: "Русский", short: "RU", dir: "ltr" },
  { code: "sv", label: "Svenska", short: "SV", dir: "ltr" },
  { code: "pt", label: "Português", short: "PT", dir: "ltr" },
  { code: "zh", label: "中文", short: "ZH", dir: "ltr" },
  { code: "ja", label: "日本語", short: "JA", dir: "ltr" },
];

export default function Navbar() {
  const { t, i18n } = useTranslation("common");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const activeLang = languages.find(l => l.code === i18n.language) || languages[0];

  const changeLang = (lang: typeof languages[0]) => {
    i18n.changeLanguage(lang.code);
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = lang.code;
    setLangOpen(false);
  };

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { key: "services", href: "#services" },
    { key: "work", href: "#work" },
    { key: "pricing", href: "#pricing" },
    { key: "contact", href: "#contact" },
  ];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: scrolled ? "12px 48px" : "20px 48px",
        background: scrolled ? "rgba(10,10,15,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(123,47,255,0.12)" : "1px solid transparent",
        transition: "all 0.4s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(-12px)",
      }}>
        <a href="#" style={{ textDecoration: "none" }}><CleoLogo width={110} /></a>

        <div style={{ display: "flex", gap: "36px" }} className="desktop-nav">
          {navLinks.map(link => (
            <a key={link.key} href={link.href} style={{ color: "rgba(240,238,246,0.5)", textDecoration: "none", fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", transition: "color 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,238,246,0.5)")}
            >{t(`nav.${link.key}`)}</a>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Language switcher */}
          <div ref={langRef} style={{ position: "relative" }}>
            <button onClick={() => setLangOpen(!langOpen)} style={{
              background: "none", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", gap: "8px", padding: "6px 0",
              color: "rgba(240,238,246,0.5)", fontFamily: "'Space Mono', monospace",
              fontSize: "10px", letterSpacing: "0.2em", transition: "color 0.3s ease",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,238,246,0.5)")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20M2 12h20"/></svg>
              {activeLang.short}
              <svg width="8" height="8" viewBox="0 0 10 6" fill="currentColor" style={{ transition: "transform 0.3s ease", transform: langOpen ? "rotate(180deg)" : "rotate(0deg)" }}><path d="M0 0l5 6 5-6z"/></svg>
            </button>

            {langOpen && (
              <div style={{ position: "absolute", top: "calc(100% + 12px)", right: 0, background: "#0d0d14", border: "1px solid rgba(123,47,255,0.2)", borderTop: "2px solid #7B2FFF", backdropFilter: "blur(24px)", borderRadius: "4px", overflow: "hidden", minWidth: "160px", animation: "dropIn 0.2s ease", boxShadow: "0 20px 60px rgba(0,0,0,0.6)" }}>
                {languages.map(lang => (
                  <button key={lang.code} onClick={() => changeLang(lang)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    width: "100%", padding: "11px 18px", background: "none",
                    border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)",
                    color: activeLang.code === lang.code ? "#C9A96E" : "rgba(240,238,246,0.55)",
                    fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em",
                    cursor: "pointer", textAlign: "left", transition: "all 0.2s ease", position: "relative",
                  }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(123,47,255,0.08)"; (e.currentTarget as HTMLButtonElement).style.color = "#F0EEF6"; (e.currentTarget as HTMLButtonElement).style.paddingLeft = "22px"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "none"; (e.currentTarget as HTMLButtonElement).style.color = activeLang.code === lang.code ? "#C9A96E" : "rgba(240,238,246,0.55)"; (e.currentTarget as HTMLButtonElement).style.paddingLeft = "18px"; }}
                  >
                    <span>{lang.label}</span>
                    <span style={{ opacity: 0.35, fontSize: "9px" }}>{lang.short}</span>
                    {activeLang.code === lang.code && <span style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "2px", background: "linear-gradient(180deg, #7B2FFF, #C9A96E)" }} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <a href="https://wa.me/message/DDNIUOL264WDB1" target="_blank" rel="noopener noreferrer"
            style={{ padding: "9px 22px", background: "linear-gradient(135deg, #7B2FFF, #5a1fd1)", color: "#F0EEF6", fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.2em", textDecoration: "none", borderRadius: "2px", transition: "all 0.3s ease", boxShadow: "0 0 20px rgba(123,47,255,0.25)", whiteSpace: "nowrap" }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 35px rgba(123,47,255,0.55)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(123,47,255,0.25)"; (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(0)"; }}
          >{t("nav.start")}</a>

          <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-menu-btn"
            style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px", padding: "4px" }}>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ display: "block", width: "22px", height: "1px", background: "#F0EEF6", transition: "all 0.3s ease", transform: menuOpen ? i === 0 ? "rotate(45deg) translateY(6px)" : i === 2 ? "rotate(-45deg) translateY(-6px)" : "scaleX(0)" : "none" }} />
            ))}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 999, background: "rgba(10,10,15,0.97)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "32px", animation: "fadeInMenu 0.3s ease" }}>
          {navLinks.map(link => (
            <a key={link.key} href={link.href} onClick={() => setMenuOpen(false)} style={{ color: "#F0EEF6", textDecoration: "none", fontFamily: "'Space Mono', monospace", fontSize: "13px", letterSpacing: "0.4em", textTransform: "uppercase" }}>{t(`nav.${link.key}`)}</a>
          ))}
          <a href="https://wa.me/message/DDNIUOL264WDB1" target="_blank" rel="noopener noreferrer" style={{ marginTop: "20px", padding: "14px 40px", background: "linear-gradient(135deg, #7B2FFF, #5a1fd1)", color: "#F0EEF6", fontFamily: "'Space Mono', monospace", fontSize: "11px", letterSpacing: "0.3em", textDecoration: "none", borderRadius: "2px" }}>{t("nav.start")}</a>
        </div>
      )}

      <style>{`
        @keyframes dropIn { from { opacity:0; transform:translateY(-8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes fadeInMenu { from { opacity:0; } to { opacity:1; } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } .mobile-menu-btn { display: flex !important; } }
      `}</style>
    </>
  );
}