"use client";

import { useState } from "react";
import { PlusIcon, SearchIcon } from "@/components/dashboard/icons";
import { Reservation } from "@/types/dashboard";
import Sidebar from "@/components/dashboard/Sidebar";

const ALL: Reservation[] = [
  { id:"RD-1042", date:"19 Avr, 14:30", client:"Jean Mballa",  telephone:"+237 690 12 34 56", trajet:"Douala → Yaoundé",    categorie:"Confort Plus", pax:3, bagages:4, chauffeur:"Paul Nkomo",  montant:"45 000 FCFA", status:"en_cours" },
  { id:"RD-1041", date:"19 Avr, 11:00", client:"Aline Foka",   telephone:"+237 677 88 21 09", trajet:"Yaoundé → Douala",    categorie:"Confort",      pax:2, bagages:2, chauffeur:"Eric Tagne",  montant:"35 000 FCFA", status:"terminee" },
  { id:"RD-1040", date:"19 Avr, 09:15", client:"Samuel Eto",   telephone:"+237 699 45 67 88", trajet:"Douala → Kribi",      categorie:"Confort Plus", pax:4, bagages:6, chauffeur:"Marc Bilé",   montant:"60 000 FCFA", status:"terminee" },
  { id:"RD-1039", date:"18 Avr, 18:45", client:"Marie Onana",  telephone:"+237 655 33 21 87", trajet:"Douala → Yaoundé",    categorie:"Confort",      pax:1, bagages:1, chauffeur:"—",           montant:"35 000 FCFA", status:"annulee"  },
  { id:"RD-1038", date:"18 Avr, 15:20", client:"David Kana",   telephone:"+237 681 90 12 33", trajet:"Yaoundé → Bafoussam", categorie:"Confort Plus", pax:3, bagages:3, chauffeur:"Paul Nkomo",  montant:"55 000 FCFA", status:"terminee" },
];

const TODAY_IDS = ["RD-1042", "RD-1041", "RD-1040"];
type Filter = "Toutes" | "Aujourd'hui" | "En cours" | "Terminées" | "Annulées";
const FILTERS: Filter[] = ["Toutes", "Aujourd'hui", "En cours", "Terminées", "Annulées"];

function applyFilter(data: Reservation[], f: Filter, q: string) {
  let r = data;

  if (f === "Aujourd'hui") r = r.filter(x => TODAY_IDS.includes(x.id));
  if (f === "En cours") r = r.filter(x => x.status === "en_cours");
  if (f === "Terminées") r = r.filter(x => x.status === "terminee");
  if (f === "Annulées") r = r.filter(x => x.status === "annulee");

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

const statusBadge = (s: Reservation["status"]) => {
  const styles = {
    en_cours: {
      bg: "rgba(212,175,55,0.18)",
      color: "#D4AF37",
      border: "rgba(212,175,55,0.4)",
      label: "En cours",
    },
    terminee: {
      bg: "rgba(74,222,128,0.15)",
      color: "#4ade80",
      border: "rgba(74,222,128,0.35)",
      label: "Terminée",
    },
    annulee: {
      bg: "rgba(248,113,113,0.15)",
      color: "#f87171",
      border: "rgba(248,113,113,0.35)",
      label: "Annulée",
    },
  };

  const st = styles[s];

  return (
    <span
      className="inline-flex px-2.5 py-1 rounded-full text-xs border"
      style={{
        background: st.bg,
        color: st.color,
        borderColor: st.border,
      }}
    >
      {st.label}
    </span>
  );
};

export default function ReservationsPage() {
  const [filter, setFilter] = useState<Filter>("Toutes");
  const [search, setSearch] = useState("");
  const rows = applyFilter(ALL, filter, search);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground overflow-x-hidden">
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 md:ml-64 min-h-screen overflow-x-hidden">
        <div className="p-6 md:p-10 w-full max-w-none">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

            <div>
              <h1 className="text-3xl font-semibold">
                Réservations
              </h1>
              <p className="text-sm opacity-50 mt-1">
                Toutes les courses et leur statut
              </p>
            </div>

            <button className="btn-gold flex items-center gap-2 px-4 py-2 rounded-md text-sm shadow-gold">
              <PlusIcon className="h-4 w-4" />
              Nouvelle réservation
            </button>

          </div>

          {/* FILTRES */}
          <div className="flex flex-col md:flex-row gap-3 mb-6">

            <div className="flex flex-wrap gap-2">
              {FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-sm border transition ${
                    filter === f
                      ? "bg-gold-gradient text-primary-foreground border-transparent"
                      : "border-white/10 text-white/60 hover:bg-white/5 hover:text-white"
                  }`}
                >
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

          {/* TABLE CARD */}
          <div className="card-dashboard rounded-xl overflow-hidden">

            <div className="overflow-x-auto w-full">
              <table className="w-full text-sm min-w-[1200px]">

                {/* HEADER */}
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs opacity-60">
                    {["ID","Date","Client","Téléphone","Trajet","Catégorie","Pax","Bag.","Chauffeur","Montant","Statut"].map(h => (
                      <th key={h} className="p-4 font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* BODY */}
                <tbody>
                  {rows.length === 0 ? (
                    <tr>
                      <td colSpan={11} className="p-10 text-center opacity-50">
                        Aucune réservation trouvée
                      </td>
                    </tr>
                  ) : rows.map(r => (
                    <tr
                      key={r.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="p-4 font-mono text-gold">{r.id}</td>
                      <td className="p-4 opacity-60 whitespace-nowrap">{r.date}</td>
                      <td className="p-4 font-medium">{r.client}</td>
                      <td className="p-4 opacity-60">{r.telephone}</td>
                      <td className="p-4">{r.trajet}</td>
                      <td className="p-4 opacity-60">{r.categorie}</td>
                      <td className="p-4 text-center">{r.pax}</td>
                      <td className="p-4 text-center">{r.bagages}</td>
                      <td className="p-4">{r.chauffeur}</td>
                      <td className="p-4 font-medium whitespace-nowrap">{r.montant}</td>
                      <td className="p-4">{statusBadge(r.status)}</td>
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