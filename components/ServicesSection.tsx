"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

export default function ServicesSection() {
  const t = useTranslations("services");

  const services = [
    {
      id: "comfort",
      tier: t("comfort.tier"),
      tagline: t("comfort.tagline"),
      description: t("comfort.description"),
      image: "/images/packs/yaris.jpg",
      features: [t("comfort.features.0"), t("comfort.features.1"), t("comfort.features.2"), t("comfort.features.3")],
      badge: t("comfort.badge"),
      price: t("comfort.price"),
      highlight: false,
      cta: t("comfort.cta"),
    },
    {
      id: "comfort-plus",
      tier: t("comfortPlus.tier"),
      tagline: t("comfortPlus.tagline"),
      description: t("comfortPlus.description"),
      image: "/images/packs/mercedes.jpg",
      features: [t("comfortPlus.features.0"), t("comfortPlus.features.1"), t("comfortPlus.features.2"), t("comfortPlus.features.3")],
      badge: t("comfortPlus.badge"),
      price: t("comfortPlus.price"),
      highlight: true,
      cta: t("comfortPlus.cta"),
    },
  ];

  return (
    <section id="services" className="bg-obsidian-900 section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-20">
          <span className="section-label block mb-4">{t("label")}</span>
          <h2 className="section-title text-white mb-4">
            {t("title")}{" "}
            <span className="text-gold-500 italic">{t("titleHighlight")}</span>
          </h2>
          <div className="gold-divider-wide mx-auto mt-6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <article key={service.id}
              className={`relative group overflow-hidden card-luxury ${service.highlight ? "ring-1 ring-gold-500/40" : "ring-1 ring-white/5"}`}>
              {service.highlight && (
                <div className="absolute top-4 right-4 z-20 bg-gold-500 text-obsidian-900 text-[9px] tracking-widest uppercase px-3 py-1 font-body font-semibold">
                  {service.badge}
                </div>
              )}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <Image src={service.image} alt={service.tier} fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-800 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <span className="text-gold-500 text-3xl font-light" style={{ fontFamily: "var(--font-display)" }}>{service.tier}</span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <p className="text-white/40 text-[10px] tracking-widest uppercase mb-3 font-body">{service.tagline}</p>
                <p className="text-white/65 text-sm leading-relaxed font-body mb-5">{service.description}</p>
                <p className="text-gold-500 text-lg font-semibold mb-6 tracking-wide">{service.price}</p>
                <ul className="space-y-2 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-white/55 text-xs tracking-wide font-body">
                      <span className="w-1 h-1 rounded-full bg-gold-500 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <a href="#book"
                  className={`block text-center text-xs tracking-widest uppercase py-3.5 transition-all duration-300 ${service.highlight ? "btn-gold" : "btn-outline-gold"}`}>
                  {service.cta}
                </a>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}