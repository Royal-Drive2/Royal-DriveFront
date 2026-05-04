"use client";

import { useRef, useState } from "react";
import { carApi, Car, uploadCarImage } from "@/lib/cars";

interface Props {
  existing: Car | null;
  categoryId: string;
  onClose: () => void;
  onSaved: () => void;
}

export default function CarModal({ existing, categoryId, onClose, onSaved }: Props) {
  const [name, setName] = useState(existing?.name ?? "");
  const [plateNumber, setPlateNumber] = useState(existing?.plateNumber ?? "");
  const [imageUrl, setImageUrl] = useState(existing?.imageUrl ?? "");
  const [isAvailable, setIsAvailable] = useState(existing?.isAvailable ?? true);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const url = await uploadCarImage(file);
      setImageUrl(url);
    } catch {
      setError("Échec de l'upload de l'image.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim()) { setError("Le nom est requis."); return; }
    if (!plateNumber.trim()) { setError("La plaque est requise."); return; }

    setSaving(true);
    setError("");
    try {
      const payload = {
        name,
        plateNumber,
        categoryId,
        imageUrl,
        options: existing?.options ?? [],
        isAvailable,
      };

      if (existing) {
        await carApi.update(existing.id, payload);
      } else {
        await carApi.create(payload);
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
      <div className="bg-[#111] border border-white/10 rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-medium mb-6">
          {existing ? "Modifier le véhicule" : "Nouveau véhicule"}
        </h2>

        <div className="space-y-4">
          {/* Image upload */}
          <div>
            <label className="text-xs uppercase tracking-widest opacity-50 block mb-1">
              Photo du véhicule
            </label>
            {imageUrl && (
              <img
                src={imageUrl}
                alt="preview"
                className="w-full aspect-video object-cover rounded-lg mb-2"
              />
            )}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="w-full border border-dashed border-white/20 rounded-lg py-3 text-xs uppercase tracking-widest opacity-50 hover:opacity-80 hover:border-[#D4AF37] transition"
            >
              {uploading ? "Upload en cours…" : "Choisir une image"}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest opacity-50 block mb-1">Nom</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: BMW Série 5"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="text-xs uppercase tracking-widest opacity-50 block mb-1">
              Plaque d'immatriculation
            </label>
            <input
              value={plateNumber}
              onChange={(e) => setPlateNumber(e.target.value)}
              placeholder="Ex: MX56NH"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="flex items-center gap-3 pt-1">
            <input
              type="checkbox"
              id="available"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="accent-[#D4AF37]"
            />
            <label htmlFor="available" className="text-sm opacity-70">
              Disponible
            </label>
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
            disabled={saving || uploading}
            className="flex-1 btn-gold rounded-lg py-2.5 text-sm disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}