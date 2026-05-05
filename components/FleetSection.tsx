"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

type CarBase = {
  name: string;
  passengers: number;
  featuresKey: "featuresBase" | "featuresPlus";
  image: string;
};

export default function FleetSection() {
  const t = useTranslations("fleet");

  const fleetConfort: CarBase[] = [
    { name: "Toyota Yaris",  passengers: 4, featuresKey: "featuresBase", image: "/images/fleet/yaris.jpg" },
    { name: "Toyota Camry",  passengers: 4, featuresKey: "featuresBase", image: "/images/fleet/camry.jpg" },
    { name: "Suzuki",        passengers: 4, featuresKey: "featuresBase", image: "/images/fleet/suzuki.jpg" },
  ];

  const fleetConfortPlus: CarBase[] = [
    { name: "Mercedes AMG",      passengers: 4, featuresKey: "featuresPlus", image: "/images/fleet/amg.jpg" },
    { name: "Toyota Highlander", passengers: 6, featuresKey: "featuresPlus", image: "/images/fleet/highlander.jpg" },
    { name: "Lexus RX",          passengers: 5, featuresKey: "featuresPlus", image: "/images/fleet/lexus.jpg" },
    { name: "Toyota Rav4",       passengers: 5, featuresKey: "featuresPlus", image: "/images/fleet/rav4.jpg" },
  ];

  return (
    <section id="fleet" className="section-padding bg-obsidian-900">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="section-label block mb-4">{t("label")}</span>
          <h2 className="section-title text-white mb-4">
            {t("title")}{" "}
            <span className="text-gold-500 italic">{t("titleHighlight")}</span>
          </h2>
          <div className="gold-divider-wide mx-auto mt-6" />
        </div>

        {/* Confort */}
        <div className="mb-16">
          <h3
            className="text-gold-500 text-2xl font-light mb-8 text-center tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ✦ {t("comfort")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetConfort.map((car) => (
              <FleetCard
                key={car.name}
                car={car}
                passengersLabel={t("passengers", { n: car.passengers })}
                features={t(car.featuresKey)}
              />
            ))}
          </div>
        </div>

        {/* Confort Plus */}
        <div>
          <h3
            className="text-gold-500 text-2xl font-light mb-8 text-center tracking-wide"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ✦ {t("comfortPlus")}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {fleetConfortPlus.map((car) => (
              <FleetCard
                key={car.name}
                car={car}
                passengersLabel={t("passengers", { n: car.passengers })}
                features={t(car.featuresKey)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

function FleetCard({
  car,
  passengersLabel,
  features,
}: {
  car: CarBase;
  passengersLabel: string;
  features: string;
}) {
  return (
    <div className="group relative overflow-hidden card-luxury ring-1 ring-white/5 hover:ring-gold-500/30 transition-all duration-500">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-800 via-black/10 to-transparent" />
      </div>

      {/* Info */}
      <div className="p-5">
        <h4
          className="text-white text-lg font-light mb-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {car.name}
        </h4>
        <p className="text-gold-500 text-xs mb-2 font-body tracking-wide">
          {passengersLabel}
        </p>
        <p className="text-white/35 text-xs font-body tracking-wide">
          {features}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
    </div>
  );
}