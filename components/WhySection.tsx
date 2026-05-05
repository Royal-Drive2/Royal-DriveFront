"use client";

import { useTranslations } from "next-intl";

export default function WhySection() {
  const t = useTranslations("why");

  const pillars = [
    { key: "drivers",      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },

    { key: "tracking",     icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg> },

    { key: "availability", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
      <circle cx="12" cy="12" r="10" /><path strokeLinecap="round" d="M12 6v6l4 2" /></svg> },

    { key: "luxury",       icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969
       0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 
       2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg> },
  ];

  return (
    <section id="why" className="relative section-padding overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)" }}>
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: "repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 1px, transparent 0px, transparent 50%)", backgroundSize: "24px 24px" }} />
      <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <span className="section-label block mb-4">{t("label")}</span>
          <h2 className="section-title text-white mb-4">
            {t("title")}{" "}
            <span className="text-gold-500 italic">{t("titleHighlight")}</span>
          </h2>
          <div className="gold-divider-wide mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map(({ key, icon }, i) => (
            <div key={key} className="group relative p-6 sm:p-7 card-luxury hover:border-gold-500/30 transition-all duration-500">
              <span className="absolute top-4 right-5 text-6xl font-light text-white/[0.03] select-none pointer-events-none"
                style={{ fontFamily: "var(--font-display)" }}>{String(i + 1).padStart(2, "0")}</span>
              <div className="text-gold-500 mb-5 transition-transform duration-300 group-hover:-translate-y-1">{icon}</div>
              <div className="gold-divider mb-5 transition-all duration-300 group-hover:w-full" />
              <h3 className="text-white text-xl font-light mb-3 leading-snug"
                style={{ fontFamily: "var(--font-display)" }}>{t(`pillars.${key}.title`)}</h3>
              <p className="text-white/45 text-xs leading-relaxed font-body tracking-wide">{t(`pillars.${key}.description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}