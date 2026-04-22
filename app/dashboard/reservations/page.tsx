"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon, SearchIcon } from "@/components/dashboard/icons";
import { Reservation } from "@/types/dashboard";
import Sidebar from "@/components/dashboard/Sidebar";

// ─── Icônes actions ───────────────────────────────────────────────────────────

const EyeIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PencilIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a2 2 0 01-1.414.586H9v-2a2 2 0 01.586-1.414z" />
  </svg>
);

const TrashIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// ─── Données ──────────────────────────────────────────────────────────────────

const ALL: Reservation[] = [
  { id:"RD-1042", date:"19 Avr, 14:30", client:"Jean Mballa",  telephone:"+237 690 12 34 56", adresse_depart:"Douala, Akwa",        adresse_arrivee:"Yaoundé, Centre",    categorie:"Confort Plus", passagers:3, bagages:4, montant:"45 000 FCFA", status:"en_cours" },
  { id:"RD-1041", date:"19 Avr, 11:00", client:"Aline Foka",   telephone:"+237 677 88 21 09", adresse_depart:"Yaoundé, Bastos",     adresse_arrivee:"Douala, Bonanjo",    categorie:"Confort",      passagers:2, bagages:2, montant:"35 000 FCFA", status:"terminee" },
  { id:"RD-1040", date:"19 Avr, 09:15", client:"Samuel Eto",   telephone:"+237 699 45 67 88", adresse_depart:"Douala, Bonapriso",   adresse_arrivee:"Kribi, Centre-ville",categorie:"Confort Plus", passagers:4, bagages:6, montant:"60 000 FCFA", status:"terminee" },
  { id:"RD-1039", date:"18 Avr, 18:45", client:"Marie Onana",  telephone:"+237 655 33 21 87", adresse_depart:"Douala, Bassa",       adresse_arrivee:"Yaoundé, Mvan",      categorie:"Confort",      passagers:1, bagages:1, montant:"35 000 FCFA", status:"annulee"  },
  { id:"RD-1038", date:"18 Avr, 15:20", client:"David Kana",   telephone:"+237 681 90 12 33", adresse_depart:"Yaoundé, Nlongkak",   adresse_arrivee:"Bafoussam, Centre",  categorie:"Confort Plus", passagers:3, bagages:3, montant:"55 000 FCFA", status:"terminee" },
];

const TODAY_IDS = ["RD-1042", "RD-1041", "RD-1040"];
type Filter = "Toutes" | "Aujourd'hui" | "En cours" | "Terminées" | "Annulées";
const FILTERS: Filter[] = ["Toutes", "Aujourd'hui", "En cours", "Terminées", "Annulées"];

function applyFilter(data: Reservation[], f: Filter, q: string) {
  let r = data;
  if (f === "Aujourd'hui") r = r.filter(x => TODAY_IDS.includes(x.id));
  if (f === "En cours")    r = r.filter(x => x.status === "en_cours");
  if (f === "Terminées")   r = r.filter(x => x.status === "terminee");
  if (f === "Annulées")    r = r.filter(x => x.status === "annulee");
  if (q.trim()) {
    const s = q.toLowerCase();
    r = r.filter(x =>
      x.id.toLowerCase().includes(s) ||
      x.client.toLowerCase().includes(s) ||
      x.telephone.includes(s)
    );
  }
  return r;
}

const StatusBadge = ({ s }: { s: Reservation["status"] }) => {
  const cfg = {
    en_cours: { bg:"rgba(212,175,55,0.18)", color:"#D4AF37", border:"rgba(212,175,55,0.4)", label:"En cours" },
    terminee: { bg:"rgba(74,222,128,0.15)", color:"#4ade80", border:"rgba(74,222,128,0.35)", label:"Terminée" },
    annulee:  { bg:"rgba(248,113,113,0.15)", color:"#f87171", border:"rgba(248,113,113,0.35)", label:"Annulée" },
  }[s];
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border"
      style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.border }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: cfg.color }} />
      {cfg.label}
    </span>
  );
};

// ─── Modale suppression ───────────────────────────────────────────────────────

function DeleteModal({ id, onConfirm, onCancel }: { id: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}>
      <div className="card-dashboard rounded-2xl p-6 max-w-sm w-full shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="h-12 w-12 rounded-full flex items-center justify-center mb-4 mx-auto"
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}>
          <TrashIcon className="h-5 w-5 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-center mb-1">Supprimer cette réservation ?</h3>
        <p className="text-sm opacity-50 text-center mb-6">
          La réservation <span className="font-mono font-semibold opacity-100" style={{ color:"#D4AF37" }}>{id}</span> sera définitivement supprimée.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition">Annuler</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition" style={{ background:"rgba(239,68,68,0.85)", color:"#fff" }}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function ReservationsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<Filter>("Toutes");
  const [search, setSearch] = useState("");
  const [data, setData] = useState<Reservation[]>(ALL);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const rows = applyFilter(data, filter, search);

  const handleDelete = (id: string) => {
    setData(prev => prev.filter(r => r.id !== id));
    setDeleteTarget(null);
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <Sidebar />

      {deleteTarget && (
        <DeleteModal
          id={deleteTarget}
          onConfirm={() => handleDelete(deleteTarget)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}

      <main className="flex-1 md:ml-64 min-h-screen overflow-x-hidden">
        <div className="p-6 md:p-10 w-full max-w-none">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold">Réservations</h1>
              <p className="text-sm opacity-50 mt-1">Toutes les courses et leur statut</p>
            </div>
            <button
              onClick={() => router.push("/dashboard/reservations/new")}
              className="btn-gold flex items-center gap-2 px-4 py-2 rounded-md text-sm shadow-gold"
            >
              <PlusIcon className="h-4 w-4" />
              Nouvelle réservation
            </button>
          </div>

          {/* FILTRES */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-sm border transition ${
                    filter === f
                      ? "bg-gold-gradient text-primary-foreground border-transparent"
                      : "border-white/10 text-white/60 hover:bg-white/5 hover:text-white"
                  }`}>
                  {f}
                </button>
              ))}
            </div>
            <div className="md:ml-auto relative w-full md:w-72">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
              <input
                className="pl-9 pr-3 py-2 w-full rounded-md bg-white/5 border border-white/10 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                placeholder="Rechercher..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* TABLE */}
          <div className="card-dashboard rounded-xl overflow-hidden">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-sm min-w-[1300px]">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs opacity-60">
                    {["ID","Date","Client","Téléphone","Adresse de départ","Adresse d'arrivée","Catégorie","passagers","Bagages","Montant","Statut","Actions"].map(h => (
                      <th key={h} className="p-4 font-medium">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={12} className="p-10 text-center opacity-50">Aucune réservation trouvée</td>
                    </tr>
                  ) : rows.map(r => (
                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="p-4 font-mono text-sm" style={{ color:"#D4AF37" }}>{r.id}</td>
                      <td className="p-4 opacity-60 whitespace-nowrap">{r.date}</td>
                      <td className="p-4 font-medium">{r.client}</td>
                      <td className="p-4 opacity-60">{r.telephone}</td>
                      <td className="p-4 opacity-80">{r.adresse_depart}</td>
                      <td className="p-4 opacity-80">{r.adresse_arrivee}</td>
                      <td className="p-4 opacity-60">{r.categorie}</td>
                      <td className="p-4 text-center">{r.passagers}</td>
                      <td className="p-4 text-center">{r.bagages}</td>
                      <td className="p-4 font-medium whitespace-nowrap">{r.montant}</td>
                      <td className="p-4"><StatusBadge s={r.status} /></td>

                      {/* ACTIONS */}
                      <td className="p-4">
                        <div className="flex items-center gap-1">
                          {/* Modifier */}
                          <button
                            title="Modifier la réservation"
                            onClick={() => router.push(`/dashboard/reservations/${r.id}/modifier`)}
                            className="p-2 rounded-lg hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 opacity-70 hover:opacity-100 transition"
                          >
                            <PencilIcon className="h-4 w-4" />
                          </button>
                          {/* Supprimer */}
                          <button
                            title="Supprimer la réservation"
                            onClick={() => setDeleteTarget(r.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}