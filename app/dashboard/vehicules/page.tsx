"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { carCategoryApi, CarCategory } from "@/lib/carCategories";
import CategoryCard from "./CategoryCard";
import CategoryModal from "./CategoryModal";

export default function VehiculesPage() {
  const [categories, setCategories] = useState<CarCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<CarCategory | null>(null);

  const load = async () => {
    try {
      const data = await carCategoryApi.getAll();
      setCategories(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    await carCategoryApi.delete(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSaved = () => {
    setModalOpen(false);
    setEditing(null);
    load();
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 md:ml-64 p-6 md:p-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-40 mb-2">Flotte</p>
            <h1
              className="font-display"
              style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 300, letterSpacing: "0.02em" }}
            >
              Véhicules
            </h1>
            <p className="text-xs uppercase tracking-widest opacity-30 mt-1">
              Gérez vos catégories et votre flotte
            </p>
          </div>

          <button
            onClick={() => { setEditing(null); setModalOpen(true); }}
            className="btn-gold flex items-center gap-2 px-5 py-2.5 rounded-md text-sm shadow-gold"
          >
            + Nouvelle catégorie
          </button>
        </div>

        {/* Grid */}
        {loading ? (
          <p className="opacity-40 text-sm">Chargement…</p>
        ) : categories.length === 0 ? (
          <p className="opacity-40 text-sm">Aucune catégorie pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onEdit={() => { setEditing(cat); setModalOpen(true); }}
                onDelete={() => handleDelete(cat.id)}
              />
            ))}
          </div>
        )}
      </main>

      {modalOpen && (
        <CategoryModal
          existing={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}