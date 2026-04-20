import Image from "next/image";

const services = [
  {
    id: "comfort",
    tier: "Confort",
    tagline: "Refined Everyday Travel",
    description:
      "Travel in style aboard our premium SUV fleet. Lexus LX, Toyota Land Cruiser, and Jeep Grand Cherokee — the perfect balance of comfort and distinction.",
    image:
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=900&q=80",
    features: ["SUV / 4×4 Fleet", "Lexus · Jeep · Land Cruiser", "Up to 6 passengers", "Luggage space"],
    badge: "Standard Luxury",
  },
  {
    id: "comfort-plus",
    tier: "Confort Plus",
    tagline: "The Pinnacle of Prestige",
    description:
      "For those who accept nothing less than extraordinary. Mercedes-Benz S-Class and ultra-premium vehicles deliver an unmatched statement of arrival.",
    image:
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=900&q=80",
    features: ["Mercedes S-Class", "Ultra-premium fleet", "White-glove service", "Privacy partition"],
    badge: "Elite",
    highlight: true,
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-obsidian-900 section-padding">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="section-label block mb-4">Our Fleet</span>
          <h2 className="section-title text-white mb-4">
            Choose Your{" "}
            <span className="text-gold-500 italic">Experience</span>
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
    `Hello, I would like to book a ${service.tier} transfer with Royal Drive Cameroun.`
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
          alt={`${service.tier} luxury vehicle`}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-800 via-transparent to-transparent" />

        {/* Tier label over image */}
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
        <p className="text-white/65 text-sm leading-relaxed font-body mb-6">
          {service.description}
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
          href={`https://wa.me/?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`block text-center text-xs tracking-widest uppercase py-3.5 transition-all duration-300 ${
            service.highlight
              ? "btn-gold"
              : "btn-outline-gold"
          }`}
        >
          Book {service.tier}
        </a>
      </div>

      {/* Bottom gold accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent" />
    </article>
  );
}
