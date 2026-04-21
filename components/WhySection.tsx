const pillars = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    title: "Chauffeurs Professionnels",
    description:
      "Chaque chauffeur est rigoureusement sélectionné, formé au protocole VIP et engagé à respecter votre discrétion.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
      </svg>
    ),
    title: "Suivi des transfert en Temps Réel",
    description:
      "Nous surveillons votre transfert en direct. Retard ou avance — nous nous adaptons pour que vous n'attendiez jamais.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Disponible 24h/24 7j/7",
    description:
      "Jour et nuit, toute l'année. Que ce soit pour une arrivée tardive ou un départ à l'aube, nous sommes toujours là.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
    title: "Une Expérience de Luxe Incomparable",
    description:
      "De l'eau fraîche à la climatisation parfaite, chaque détail est soigné pour que votre trajet soit aussi exceptionnel que votre destination.",
  },
];

export default function WhySection() {
  return (
    <section
      id="why"
      className="relative section-padding overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #111111 50%, #0a0a0a 100%)",
      }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, #D4AF37 0px, #D4AF37 1px, transparent 0px, transparent 50%)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Gold side accent */}
      <div className="absolute left-0 top-1/4 bottom-1/4 w-px bg-gradient-to-b from-transparent via-gold-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="section-label block mb-4">Notre Engagement</span>
          <h2 className="section-title text-white mb-4">
            Pourquoi Choisir{" "}
            <span className="text-gold-500 italic">Royal Drive</span>
          </h2>
          <div className="gold-divider-wide mx-auto mt-6" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  return (
    <div className="group relative p-6 sm:p-7 card-luxury hover:border-gold-500/30 transition-all duration-500">
      {/* Index number — background decoration */}
      <span
        className="absolute top-4 right-5 text-6xl font-light text-white/[0.03] select-none pointer-events-none"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Icon */}
      <div className="text-gold-500 mb-5 transition-transform duration-300 group-hover:-translate-y-1">
        {pillar.icon}
      </div>

      {/* Divider */}
      <div className="gold-divider mb-5 transition-all duration-300 group-hover:w-full" />

      {/* Title */}
      <h3
        className="text-white text-xl font-light mb-3 leading-snug"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {pillar.title}
      </h3>

      {/* Description */}
      <p className="text-white/45 text-xs leading-relaxed font-body tracking-wide">
        {pillar.description}
      </p>
    </div>
  );
}