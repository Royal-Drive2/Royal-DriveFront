"use client";

import { useTranslations } from 'next-intl';

export default function AboutSection() {
  const t = useTranslations('about');

  return (
    <section id="about" className="section-padding bg-obsidian-900">
      <div className="max-w-4xl mx-auto text-center">

        <span className="section-label block mb-4">{t('label')}</span>
        <h2 className="section-title text-white mb-10 text-shadow-gold">
          {t('title')}
        </h2>

        <div className="gold-divider-wide mx-auto mb-10" />

        <h3
          className="text-gold-500 text-xl sm:text-2xl font-light mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {t('companyName')}
        </h3>

        <p className="text-white/60 text-sm sm:text-base leading-relaxed font-body mb-6 tracking-wide">
          {t('paragraph1')}
        </p>

        <p className="text-white/50 text-sm leading-relaxed font-body mb-14 tracking-wide">
          {t('paragraph2')}
        </p>

        <div className="gold-divider-wide mx-auto mb-14" />

        <div className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-20">
          {[
            { value: "500+", label: t('stats.transfers') },
            { value: "100%", label: t('stats.punctuality') },
            { value: "4.9/5", label: t('stats.rating') },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-gold-500 text-4xl sm:text-5xl font-light mb-2"
                style={{ fontFamily: "var(--font-display)" }}>
                {stat.value}
              </span>
              <span className="text-white/40 text-[10px] tracking-widest uppercase font-body">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}