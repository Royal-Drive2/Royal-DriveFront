"use client";

import { useEffect } from "react";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
};

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const DownloadIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

// ─── Composant lightbox ───────────────────────────────────────────────────────

export default function PhotoLightbox({ src, alt, onClose }: Props) {
  // Fermer avec Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    // Bloquer le scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = src;
    a.download = alt.replace(/\s+/g, "_") + ".jpg";
    a.click();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      {/* Boutons top */}
      <div className="absolute top-4 right-4 flex gap-2 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); handleDownload(); }}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition backdrop-blur-sm"
          title="Télécharger"
        >
          <DownloadIcon className="h-5 w-5" />
        </button>
        <button
          onClick={onClose}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition backdrop-blur-sm"
          title="Fermer (Échap)"
        >
          <XIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative max-w-lg w-full mx-6"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className="w-full rounded-2xl shadow-2xl object-cover"
          style={{ maxHeight: "80vh" }}
        />
        <p className="text-center text-xs opacity-40 mt-3">{alt} · Cliquez en dehors pour fermer</p>
      </div>
    </div>
  );
}
