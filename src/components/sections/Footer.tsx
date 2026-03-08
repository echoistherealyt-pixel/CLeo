"use client";

import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation("common");
  const navLinks = ["services", "work", "pricing", "contact"];

  return (
    <footer style={{ background: "#060608", borderTop: "1px solid rgba(123,47,255,0.1)", padding: "48px 48px 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "40px", maxWidth: "1100px", margin: "0 auto", marginBottom: "48px" }}>

        <div style={{ flex: "1", minWidth: "200px" }}>
          <div style={{ fontFamily: "Georgia, serif", fontSize: "28px", fontStyle: "italic", background: "linear-gradient(135deg, #7B2FFF, #C9A96E)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "12px", letterSpacing: "0.05em" }}>Cleo</div>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "13px", color: "rgba(240,238,246,0.3)", margin: 0, fontStyle: "italic", lineHeight: 1.6 }}>
            {t("footer.tagline").split("\n").map((line: string, i: number) => <span key={i}>{line}{i === 0 && <br />}</span>)}
          </p>
        </div>

        <div style={{ display: "flex", gap: "60px", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#7B2FFF", marginBottom: "20px" }}>{t("footer.navigate")}</div>
            {navLinks.map(link => (
              <a key={link} href={`#${link}`} style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(240,238,246,0.35)", textDecoration: "none", marginBottom: "12px", transition: "color 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,238,246,0.35)")}
              >{t(`nav.${link}`)}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.3em", color: "#7B2FFF", marginBottom: "20px" }}>{t("footer.contact")}</div>
            {[
              { label: "WhatsApp", href: "https://wa.me/message/DDNIUOL264WDB1" },
              { label: "cleothewep@gmail.com", href: "mailto:cleothewep@gmail.com" },
              { label: "01558255525", href: "tel:01558255525" },
            ].map(item => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" style={{ display: "block", fontFamily: "'Space Mono', monospace", fontSize: "10px", letterSpacing: "0.15em", color: "rgba(240,238,246,0.35)", textDecoration: "none", marginBottom: "12px", transition: "color 0.3s ease" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#C9A96E")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(240,238,246,0.35)")}
              >{item.label}</a>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", height: "1px", background: "linear-gradient(90deg, transparent, rgba(123,47,255,0.2), rgba(201,169,110,0.2), transparent)", marginBottom: "28px" }} />

      <div style={{ maxWidth: "1100px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: "9px", letterSpacing: "0.2em", color: "rgba(240,238,246,0.2)" }}>
          © {new Date().getFullYear()} CLEO. {t("footer.rights")}
        </span>
        <span style={{ fontFamily: "Georgia, serif", fontSize: "11px", fontStyle: "italic", color: "rgba(240,238,246,0.15)" }}>
          {t("footer.magic")}
        </span>
      </div>
    </footer>
  );
}