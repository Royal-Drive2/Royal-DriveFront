"use client";

import { useState, useRef, useEffect } from "react";

// Icônes en composants séparés — évite le mismatch SSR/CSR
function FlagFR() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 15" width="20" height="15" style={{ borderRadius: "2px" }}>
      <rect width="20" height="15" fill="#ED2939" />
      <rect width="13.33" height="15" fill="#fff" />
      <rect width="6.67" height="15" fill="#002395" />
    </svg>
  );
}

function FlagEN() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="15" style={{ borderRadius: "2px" }}>
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#fff" strokeWidth="6" />
      <path d="M0 0l60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
      <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

const LANGUAGES = [
  { code: "fr", label: "Français", Flag: FlagFR },
  { code: "en", label: "English",  Flag: FlagEN },
];

export default function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = useState<"fr" | "en">("fr");
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/);
    if (match) setCurrentLang(match[1] as "fr" | "en");
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const switchLocale = (code: "fr" | "en") => {
    document.cookie = `NEXT_LOCALE=${code}; path=/; max-age=31536000`;
    setCurrentLang(code);
    setOpen(false);
    window.location.reload();
  };

  // Bloque le rendu côté serveur entièrement
  if (!mounted) return null;

  const current = LANGUAGES.find((l) => l.code === currentLang);
  const CurrentFlag = current?.Flag ?? FlagFR;

  return (
    <>
      <style>{`
        @keyframes lang-pulse-shadow {
          0%, 100% { box-shadow: 0 4px 24px rgba(212,175,55,0.3), 0 0 0 0 rgba(212,175,55,0.4); }
          50%       { box-shadow: 0 4px 32px rgba(212,175,55,0.5), 0 0 0 8px rgba(212,175,55,0); }
        }
        .lang-btn-pulse { animation: lang-pulse-shadow 2.4s ease-in-out infinite; }
        .lang-menu {
          position: absolute;
          bottom: calc(100% + 12px);
          right: 0;
          background: #111111;
          border: 1px solid rgba(212,175,55,0.25);
          border-radius: 6px;
          overflow: hidden;
          min-width: 168px;
          box-shadow: 0 -8px 32px rgba(0,0,0,0.6);
          z-index: 60;
        }
        .lang-header {
          padding: 8px 14px 7px;
          font-size: 9px;
          letter-spacing: 0.15em;
          color: rgba(212,175,55,0.5);
          text-transform: uppercase;
          font-weight: 600;
          border-bottom: 1px solid rgba(212,175,55,0.1);
        }
        .lang-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 14px;
          cursor: pointer;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.5);
          transition: background 0.15s, color 0.15s;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }
        .lang-option:hover { background: rgba(212,175,55,0.08); color: #D4AF37; }
        .lang-option.active { color: #D4AF37; background: rgba(212,175,55,0.05); }
        .lang-option + .lang-option { border-top: 1px solid rgba(212,175,55,0.08); }
        .lang-dot { margin-left: auto; width: 5px; height: 5px; border-radius: 50%; background: #D4AF37; flex-shrink: 0; }
      `}</style>

      <div ref={ref} className="fixed z-50" style={{ bottom: "96px", right: "20px" }}>

        {open && (
          <div className="lang-menu">
            <div className="lang-header">Language</div>
            {LANGUAGES.map(({ code, label, Flag }) => (
              <button
                key={code}
                className={`lang-option ${currentLang === code ? "active" : ""}`}
                onClick={() => switchLocale(code as "fr" | "en")}
              >
                <span style={{ borderRadius: "2px", overflow: "hidden", display: "flex", flexShrink: 0 }}>
                  <Flag />
                </span>
                {label}
                {currentLang === code && <span className="lang-dot" />}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={() => setOpen((o) => !o)}
          aria-label="Changer de langue"
          className="lang-btn-pulse relative w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300"
          style={{
            background: open
              ? "linear-gradient(135deg, #b8962e 0%, #8a6e1f 100%)"
              : "linear-gradient(135deg, #D4AF37 0%, #a07820 100%)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          <div className="absolute inset-1.5 rounded-full border border-white/20 pointer-events-none" />
          <span className="relative z-10" style={{ borderRadius: "2px", overflow: "hidden", display: "flex", boxShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
            <CurrentFlag />
          </span>
        </button>
      </div>
    </>
  );
}