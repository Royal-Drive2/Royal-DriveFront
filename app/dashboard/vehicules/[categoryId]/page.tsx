"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { carCategoryApi, CarCategory } from "@/lib/carCategories";
import { carApi, Car } from "@/lib/cars";
import CarCard from "../CarCard";
import CarModal from "../CarModal";

export default function CategoryDetailPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const router = useRouter();

  const [category, setCategory] = useState<CarCategory | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const load = async () => {
    try {
      const [cat, allCars] = await Promise.all([
        carCategoryApi.getById(categoryId),
        carApi.getAll({ categoryId }),
      ]);
      setCategory(cat);
      setCars(allCars);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [categoryId]);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce véhicule ?")) return;
    await carApi.delete(id);
    setCars((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSaved = () => {
    setModalOpen(false);
    setEditingCar(null);
    load();
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <button
              onClick={() => router.back()}
              className="text-xs uppercase tracking-widest opacity-40 hover:opacity-80 mb-2 flex items-center gap-1"
            >
              ← Catégories
            </button>
            <h1
              className="font-display"
              style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, letterSpacing: "0.02em" }}
            >
              {category?.name ?? "…"}
            </h1>
            {category && (
              <p className="text-[#D4AF37] font-semibold mt-1">
                {category.price.toLocaleString("fr-FR")} FCFA
              </p>
            )}
          </div>

          <button
            onClick={() => { setEditingCar(null); setModalOpen(true); }}
            className="btn-gold flex items-center gap-2 px-5 py-2.5 rounded-md text-sm shadow-gold"
          >
            + Ajouter un véhicule
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="opacity-40 text-sm">Chargement…</p>
        ) : cars.length === 0 ? (
          <p className="opacity-40 text-sm">Aucun véhicule dans cette catégorie.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                categoryPrice={category?.price ?? 0}
                onEdit={() => { setEditingCar(car); setModalOpen(true); }}
                onDelete={() => handleDelete(car.id)}
              />
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <CarModal
          existing={editingCar}
          categoryId={categoryId}
          onClose={() => { setModalOpen(false); setEditingCar(null); }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}