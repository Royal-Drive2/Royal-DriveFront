"use client";

import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("how");

  const steps = [
    { number: "01", title: t("steps.step1.title"), description: t("steps.step1.description"),
       icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
        className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 
        21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg> },

    { number: "02", title: t("steps.step2.title"), description: t("steps.step2.description"), 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" 
      className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2
       4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
    { number: "03", title: t("steps.step3.title"), description: t("steps.step3.description"), 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" 
      className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 
      16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><circle 
      cx="12" cy="11" r="3" /></svg> },
      
    { number: "04", title: t("steps.step4.title"), description: t("steps.step4.description"), 
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"
       className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg> },
  ];

  return (
    <section id="how" className="section-padding bg-obsidian-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <span className="section-label block mb-4">{t("label")}</span>
          <h2 className="section-title text-white mb-4">
            {t("title")}{" "}
            <span className="text-gold-500 italic">{t("titleHighlight")}</span>
          </h2>
          <div className="gold-divider-wide mx-auto mt-6" />
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-gold-500/25 to-transparent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0">
            {steps.map((step, i) => (
              <div key={step.number} className="relative flex flex-col items-center text-center lg:px-8">
                <div className="relative mb-6">
                  <div className="w-24 h-24 rounded-full border border-gold-500/30 flex items-center justify-center bg-obsidian-800 relative z-10">
                    <div className="w-16 h-16 rounded-full border border-gold-500/20 flex items-center justify-center">
                      <span className="text-gold-500 text-2xl font-light" style={{ fontFamily: "var(--font-display)" }}>{step.number}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gold-500/5 blur-xl" />
                </div>
                <div className="text-gold-500/70 mb-4">{step.icon}</div>
                <h3 className="text-white text-xl font-light mb-3" style={{ fontFamily: "var(--font-display)" }}>{step.title}</h3>
                <div className="gold-divider mx-auto mb-4" />
                <p className="text-white/45 text-xs leading-relaxed font-body max-w-xs tracking-wide">{step.description}</p>
                {i < steps.length - 1 && <div className="sm:hidden mt-6 text-gold-500/30 text-2xl">↓</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}