import Image from "next/image";

const services = [
  {
    id: "comfort",
    tier: "Confort",
    tagline: "Voyage Quotidien Raffiné",
    description:
      "Voyagez avec style à bord de notre flotte de SUV haut de gamme. Lexus LX, Toyota Land Cruiser et Jeep Grand Cherokee — l'équilibre parfait entre confort et distinction.",
    image: "/images/packs/yaris.jpg",
    features: [
      "Climatisation",
      "Wifi gratuit",
      "Chauffeur professionnel",
      "Suivi GPS",
    ],
    badge: "Standard Luxury",
    price: "À partir de 15 000 FCFA",
  },
  {
    id: "comfort-plus",
    tier: "Confort Plus",
    tagline: "Le Sommet du Prestige",
    description:
      "Pour ceux qui n'acceptent rien de moins qu'extraordinaire. La Mercedes-Benz Classe S et les véhicules ultra-premium offrent une déclaration d'arrivée inégalée.",
    image: "/images/packs/mercedes.jpg",
    features: [
      "Véhicule haut de gamme",
      "Eau & rafraîchissements",
      "Chauffeur VIP",
      "Accueil avec pancarte nominative",
    ],
    badge: "PREMIUM",
    highlight: true,
    price: "À partir de 30 000 FCFA",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-obsidian-900 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="section-label block mb-4">Nos Services</span>
          <h2 className="section-title text-white mb-4">
            Choisissez Votre{" "}
            <span className="text-gold-500 italic">Expérience</span>
          </h2>
          <div className="gold-divider-wide mx-auto mt-6" />
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const whatsappMessage = encodeURIComponent(
    `Bonjour, je souhaite réserver une offre ${service.tier} avec Royal Drive Cameroun.`
  );

  return (
    <article
      className={`relative group overflow-hidden card-luxury ${
        service.highlight
          ? "ring-1 ring-gold-500/40"
          : "ring-1 ring-white/5"
      }`}
    >
      {/* Badge */}
      {service.highlight && (
        <div className="absolute top-4 right-4 z-20 bg-gold-500 text-obsidian-900 text-[9px] tracking-widest uppercase px-3 py-1 font-body font-semibold">
          {service.badge}
        </div>
      )}

      {/* Image */}
      <div className="relative h-56 sm:h-64 overflow-hidden">
        <Image
          src={service.image}
          alt={`${service.tier} véhicule`}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-800 via-transparent to-transparent" />

        {/* Tier label */}
        <div className="absolute bottom-4 left-5">
          <span
            className="text-gold-500 text-3xl font-light"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {service.tier}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <p className="text-white/40 text-[10px] tracking-widest uppercase mb-3 font-body">
          {service.tagline}
        </p>

        <p className="text-white/65 text-sm leading-relaxed font-body mb-5">
          {service.description}
        </p>

        {/* PRICE */}
        <p className="text-gold-500 text-lg font-semibold mb-6 tracking-wide">
          {service.price}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-8">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-white/55 text-xs tracking-wide font-body"
            >
              <span className="w-1 h-1 rounded-full bg-gold-500 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#book"
          className={`block text-center text-xs tracking-widest uppercase py-3.5 transition-all duration-300 ${
            service.highlight ? "btn-gold" : "btn-outline-gold"
          }`}
        >
          Réserver {service.tier}
        </a>
      </div>

      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
    </article>
  );
}