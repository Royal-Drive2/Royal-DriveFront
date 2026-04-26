"use client";

import { useTranslations } from "next-intl";

export default function CTASection() {
  const t = useTranslations("contact");
  const tWa = useTranslations("whatsapp");

  //  message WhatsApp amélioré
  const whatsappMessage = encodeURIComponent(
    `${tWa("message")}\n\n${t("form.name")}: ...\n${t("form.email")}: ...`
  );

  return (
    <section id="contact" className="relative overflow-hidden">
      {/* Borders */}
      <div className="absolute inset-4 sm:inset-8 lg:inset-12 border border-gold-500/15 pointer-events-none z-10" />
      <div className="absolute inset-6 sm:inset-10 lg:inset-14 border border-gold-500/5 pointer-events-none z-10" />

      <div className="relative z-20 px-5 sm:px-8 md:px-12 lg:px-20 xl:px-28 py-16 sm:py-20 lg:py-24">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="text-center mb-10 sm:mb-12 lg:mb-14">
            <span className="section-label block mb-3 sm:mb-4">
              {t("label")}
            </span>

            <h2 className="section-title text-white mb-3 sm:mb-4 text-shadow-gold text-2xl sm:text-3xl lg:text-4xl">
              {t("title")}
            </h2>

            <div className="gold-divider-wide mx-auto mt-3 sm:mt-4" />

            <p className="text-white/40 text-xs sm:text-sm mt-4 sm:mt-6 font-body tracking-wide max-w-md mx-auto">
              {t("subtitle")}
            </p>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-20">

            {/* FORM */}
            <div className="flex flex-col gap-4 sm:gap-5">

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/40 text-[10px] tracking-widest uppercase font-body">
                  {t("form.name")}
                </label>
                <input
                  type="text"
                  placeholder={t("form.namePlaceholder")}
                  className="bg-obsidian-700 border border-white/10 text-white text-sm font-body px-4 py-3.5 outline-none focus:border-gold-500/50 transition-colors placeholder:text-white/20 w-full"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/40 text-[10px] tracking-widest uppercase font-body">
                  {t("form.email")}
                </label>
                <input
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  className="bg-obsidian-700 border border-white/10 text-white text-sm font-body px-4 py-3.5 outline-none focus:border-gold-500/50 transition-colors placeholder:text-white/20 w-full"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-white/40 text-[10px] tracking-widest uppercase font-body">
                  {t("form.message")}
                </label>
                <textarea
                  rows={4}
                  placeholder={t("form.messagePlaceholder")}
                  className="bg-obsidian-700 border border-white/10 text-white text-sm font-body px-4 py-3.5 outline-none focus:border-gold-500/50 transition-colors placeholder:text-white/20 w-full resize-none"
                />
              </div>

              {/* CTA */}
              <a
                href={`https://wa.me/237683180957?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp contact"
                className="btn-gold w-full px-6 sm:px-8 py-3.5 text-xs sm:text-sm text-center mt-2"
              >
                {t("form.send")}
              </a>
            </div>

            {/* CONTACT INFOS */}
            <div className="flex flex-col gap-6 sm:gap-8">

              <div className="flex flex-col gap-5 sm:gap-6">

                {/* Phone */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-gold-500 mt-0.5">
                    <PhoneIcon />
                  </div>
                  <div>
                    <p className="text-white text-sm font-body font-medium mb-0.5">
                      {t("info.phone")}
                    </p>
                    <a href="tel:+237683180957" className="text-white/50 text-sm hover:text-gold-500 transition-colors">
                      +237 683 180 957
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-gold-500 mt-0.5">
                    <EmailIcon />
                  </div>
                  <div>
                    <p className="text-white text-sm font-body font-medium mb-0.5">
                      {t("info.email")}
                    </p>
                    <a href="mailto:contact@royaldrivecameroun.com" className="text-white/50 text-sm hover:text-gold-500 transition-colors">
                      contact@royaldrivecameroun.com
                    </a>
                  </div>
                </div>

                {/* Address (FIX HYDRATION) */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="text-gold-500 mt-0.5">
                    <MapIcon />
                  </div>
                  <div>
                    <p className="text-white text-sm font-body font-medium mb-0.5">
                      {t("info.address")}
                    </p>
                    <p className="text-white/50 text-sm leading-relaxed whitespace-pre-line">
                      {t("info.addressValue")}
                    </p>
                  </div>
                </div>

              </div>

              {/* Map */}
              <div className="w-full h-48 sm:h-56 md:h-64 border border-gold-500/15 overflow-hidden rounded-sm">
                <iframe
                  src="https://www.google.com/maps?q=Douala,Cameroon&output=embed"
                  width="100%"
                  height="100%"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ICONS */

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
    </svg>
  );
}

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
      <circle cx="12" cy="11" r="3"/>
    </svg>
  );
}