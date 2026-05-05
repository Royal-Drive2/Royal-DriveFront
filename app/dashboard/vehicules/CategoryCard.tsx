import { useRouter } from "next/navigation";
import { CarCategory } from "@/lib/carCategories";

interface Props {
  category: CarCategory;
  onEdit: () => void;
  onDelete: () => void;
}

export default function CategoryCard({ category, onEdit, onDelete }: Props) {
  const router = useRouter();

  return (
    <div className="card-dashboard rounded-2xl overflow-hidden group transition-colors">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-medium">{category.name}</h3>
          <span className="badge badge-gold ml-3 whitespace-nowrap text-xs px-3 py-1">
            Catégorie
          </span>
        </div>

        <div className="text-2xl text-[#D4AF37] font-semibold mb-6">
          {category.price.toLocaleString("fr-FR")} FCFA
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/10 gap-2">
          <button
            onClick={() => router.push(`/dashboard/vehicules/${category.id}`)}
            className="text-xs uppercase tracking-widest text-[#D4AF37] hover:opacity-80 transition"
          >
            Voir les voitures →
          </button>

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