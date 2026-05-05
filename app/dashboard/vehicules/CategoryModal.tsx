"use client";

import { useState } from "react";
import { carCategoryApi, CarCategory } from "@/lib/carCategories";

interface Props {
  existing: CarCategory | null;
  onClose: () => void;
  onSaved: () => void;
}

export default function CategoryModal({ existing, onClose, onSaved }: Props) {
  const [name, setName] = useState(existing?.name ?? "");
  const [price, setPrice] = useState<number>(existing?.price ?? 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name.trim()) { setError("Le nom est requis."); return; }
    if (price <= 0) { setError("Le prix doit être supérieur à 0."); return; }

    setSaving(true);
    setError("");
    try {
      if (existing) {
        await carCategoryApi.update(existing.id, { name, price });
      } else {
        await carCategoryApi.create({ name, price });
      }
      onSaved();
    } catch (e: any) {
      setError(e.message ?? "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-xl font-medium mb-6">
          {existing ? "Modifier la catégorie" : "Nouvelle catégorie"}
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest opacity-50 block mb-1">
              Nom
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Confort Plus"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest opacity-50 block mb-1">
              Prix (FCFA)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              placeholder="Ex: 35000"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onClose}
            className="flex-1 border border-white/10 rounded-lg py-2.5 text-sm hover:border-white/30 transition"
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 btn-gold rounded-lg py-2.5 text-sm disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}