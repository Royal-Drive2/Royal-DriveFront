"use client";

import Image from "next/image";
import { ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { CarIcon, PlusIcon } from "@/components/dashboard/icons";
import { VehicleCategory } from "@/types/dashboard";

// ───────────────────────────────────────────
// DATA (à remplacer plus tard par API)
// ───────────────────────────────────────────
const categories: VehicleCategory[] = [
  {
    nom: "Confort",
    description: "Berlines confortables, climatisées, pour voyages détendus.",
    image:
      "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&q=80",
    count: 5,
    trajet: "Douala → Yaoundé",
    prix: "35 000 FCFA",
  },
  {
    nom: "Confort Plus",
    description: "SUV premium, intérieur cuir, expérience royale.",
    image:
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80",
    count: 4,
    trajet: "Douala → Yaoundé",
    prix: "45 000 FCFA",
  },
];

// ───────────────────────────────────────────
// COMPONENTS
// ───────────────────────────────────────────
const PageTitle = ({ children }: { children: ReactNode }) => (
  <h1
    className="font-display"
    style={{
      fontFamily: "var(--font-display)",
      fontSize: "clamp(2rem,4vw,3rem)",
      fontWeight: 300,
      letterSpacing: "0.02em",
    }}
  >
    {children}
  </h1>
);

const VehicleCard = ({ cat }: { cat: VehicleCategory }) => (
  <div className="card-dashboard rounded-2xl overflow-hidden group transition-colors">
    
    {/* Image */}
    <div className="aspect-[16/9] overflow-hidden bg-[#1a1a1a]">
      <Image
        src={cat.image}
        alt={cat.nom}
        width={600}
        height={338}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
    </div>

    {/* Content */}
    <div className="p-6">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-xl font-medium">{cat.nom}</h3>
          <p className="text-sm opacity-50 mt-1">{cat.description}</p>
        </div>

        <span className="badge badge-gold ml-3 whitespace-nowrap">
          {cat.count} voitures
        </span>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/10">
        <div>
          <div className="text-[10px] uppercase tracking-widest opacity-40">
            {cat.trajet}
          </div>
          <div className="text-lg text-[#D4AF37] font-semibold">
            {cat.prix}
          </div>
        </div>

        <button className="text-xs uppercase tracking-widest text-[#D4AF37] hover:opacity-80 transition">
          Gérer →
        </button>
      </div>
    </div>
  </div>
);

const AddCard = () => (
  <button
    className="
      rounded-2xl flex flex-col items-center justify-center p-10 min-h-[300px]
      border border-dashed border-white/10 text-white/30
      hover:border-[#D4AF37] hover:text-[#D4AF37]
      transition-all
    "
  >
    <CarIcon className="h-10 w-10 mb-3" />
    <span className="text-xs uppercase tracking-widest">
      Ajouter une catégorie
    </span>
  </button>
);

// ───────────────────────────────────────────
// PAGE
// ───────────────────────────────────────────
export default function VehiculesPage() {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          
          <div>
            <p className="text-xs uppercase tracking-widest opacity-40 mb-2">
              Flotte
            </p>

            <PageTitle>Véhicules</PageTitle>

            <p className="text-xs uppercase tracking-widest opacity-30 mt-1">
              Gérez vos catégories et votre flotte
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn-outline-gold flex items-center gap-2 px-4 py-2 rounded-md text-sm">
              <PlusIcon className="h-4 w-4" /> Catégorie
            </button>

            <button className="btn-gold flex items-center gap-2 px-4 py-2 rounded-md text-sm shadow-gold">
              <PlusIcon className="h-4 w-4" /> Véhicule
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {categories.map((cat) => (
            <VehicleCard key={cat.nom} cat={cat} />
          ))}

          <AddCard />
        </div>

      </main>
    </div>
  );
}