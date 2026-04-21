export default function AboutSection() {
  return (
    <section id="about" className="section-padding bg-obsidian-900">
      <div className="max-w-4xl mx-auto text-center">

        <span className="section-label block mb-4">Notre Histoire</span>
        <h2 className="section-title text-white mb-10 text-shadow-gold">
          À propos
        </h2>

        <div className="gold-divider-wide mx-auto mb-10" />

        <h3
          className="text-gold-500 text-xl sm:text-2xl font-light mb-6"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Royal Drive Cameroun
        </h3>

        <p className="text-white/60 text-sm sm:text-base leading-relaxed font-body mb-6 tracking-wide">
          Née de la passion du service d&apos;excellence et de l&apos;hospitalité
          camerounaise, Royal Drive Cameroun est la référence en matière de
          transferts aéroportuaires premium à Douala et Yaoundé.
        </p>

        <p className="text-white/50 text-sm leading-relaxed font-body mb-14 tracking-wide">
          Notre promesse est simple : offrir à chaque voyageur un accueil digne
          de la royauté, du moment où il pose le pied à l&apos;aéroport
          jusqu&apos;à sa destination finale. Nos chauffeurs professionnels, nos
          véhicules impeccablement entretenus et notre engagement envers la
          ponctualité font de chaque trajet une expérience mémorable.
        </p>

        <div className="gold-divider-wide mx-auto mb-14" />

        {/* Stats */}
        <div className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-20">
          {[
            { value: "500+", label: "Transferts réalisés" },
            { value: "100%", label: "Ponctualité" },
            { value: "4.9/5", label: "Note clients" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span
                className="text-gold-500 text-4xl sm:text-5xl font-light mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
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