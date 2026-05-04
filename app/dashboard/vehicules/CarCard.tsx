import Image from "next/image";
import { Car } from "@/lib/cars";

interface Props {
  car: Car;
  categoryPrice: number;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CarCard({ car, categoryPrice, onEdit, onDelete }: Props) {
  return (
    <div className="card-dashboard rounded-2xl overflow-hidden group transition-colors">
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden bg-[#1a1a1a]">
        {car.imageUrl ? (
          <img
            src={car.imageUrl}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center opacity-20 text-xs uppercase tracking-widest">
            Pas d'image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-medium">{car.name}</h3>
            <p className="text-xs opacity-40 mt-0.5">{car.plateNumber}</p>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full border ${
              car.isAvailable
                ? "border-green-500/30 text-green-400"
                : "border-red-500/30 text-red-400"
            }`}
          >
            {car.isAvailable ? "Disponible" : "Indisponible"}
          </span>
        </div>

        <div className="text-[#D4AF37] font-semibold text-sm mt-3">
          {categoryPrice.toLocaleString("fr-FR")} FCFA
        </div>

        <div className="flex items-center justify-between pt-4 mt-3 border-t border-white/10">
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="text-xs uppercase tracking-widest opacity-50 hover:opacity-100 transition"
            >
              Modifier
            </button>
            <button
              onClick={onDelete}
              className="text-xs uppercase tracking-widest text-red-400 hover:text-red-300 transition"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}