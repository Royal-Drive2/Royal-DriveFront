"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function HeroSection() {
  const t = useTranslations("hero");
  const tWa = useTranslations("whatsapp");

  const message = encodeURIComponent(tWa("message"));

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/images/hero-bg.jpg" alt="Luxury chauffeur car"
          fill priority className="object-cover object-center" sizes="200vw" />
        <div className="absolute inset-0 overlay-dark" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-obsidian-900 to-transparent" />
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 z-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-px bg-gradient-to-l from-gold-500/60 to-transparent" />
        <div className="absolute top-0 right-0 h-full w-px bg-gradient-to-b from-gold-500/60 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-32 w-full flex flex-col items-center text-center">
        <div className="flex items-center gap-4 mb-6 animate-fade-in" style={{ animationDelay: "0.2s", opacity: 0 }}>
          <div className="gold-divider" />
          <span className="section-label">{t("label")}</span>
          <div className="gold-divider" />
        </div>

        <h1 className="section-title text-white text-shadow-gold mb-6 max-w-3xl animate-float-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}>
          {t("title")}{" "}
          <em className="text-gold-500 not-italic">{t("titleHighlight")}</em>
          <br />{t("titleSuffix")}
        </h1>

        <p className="font-body text-white/55 text-sm sm:text-base max-w-lg leading-relaxed mb-10 tracking-wide animate-float-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}>
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-float-up"
          style={{ animationDelay: "0.8s", opacity: 0 }}>
          <a href="#book" className="btn-gold px-8 py-4 text-xs text-center">
            {t("ctaBook")}
          </a>
          <a href="#services"
            className="btn-outline-gold px-8 py-4 text-xs text-center flex items-center justify-center gap-3">
            {t("ctaServices")}
          </a>
        </div>

        <div className="flex gap-8 sm:gap-12 mt-16 pt-8 border-t border-white/10 animate-fade-in"
          style={{ animationDelay: "1.1s", opacity: 0 }}>
          {[
            { value: "24/7", label: t("stats.availability") },
            { value: "2",    label: t("stats.cities") },
            { value: "100%", label: t("stats.fleet") },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-gold-500 text-xl sm:text-2xl font-light"
                style={{ fontFamily: "var(--font-display)" }}>{stat.value}</div>
              <div className="text-white/40 text-[10px] tracking-widest uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}