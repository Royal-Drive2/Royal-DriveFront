"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { PlusIcon, EyeIcon, BanIcon } from "@/components/dashboard/icons";
import { Driver } from "@/types/dashboard";
import Link from "next/link";

// Icônes inline (Pencil + Trash)
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

const drivers: Driver[] = [
  {
    initiales: "PN", nom: "Paul Nkomo", telephone: "+237 690 11 22 33", status: "actif",
    note: 0,
    id: undefined
  },
  {
    initiales: "ET", nom: "Eric Tagne", telephone: "+237 677 44 55 66", status: "actif",
    note: 0,
    id: undefined
  },
  {
    initiales: "MB", nom: "Marc Bilé", telephone: "+237 699 77 88 99", status: "inactif",
    note: 0,
    id: undefined
  },
  {
    initiales: "JM", nom: "Joseph Mefiro", telephone: "+237 655 12 13 14", status: "inactif",
    note: 0,
    id: undefined
  },
  {
    initiales: "AT", nom: "André Toko", telephone: "+237 681 22 33 44", status: "actif",
    note: 0,
    id: undefined
  },
];

const StatusBadge = ({ status }: { status: "actif" | "inactif" }) => {
  const styles = {
    actif: {
      bg: "rgba(74,222,128,0.15)",
      color: "#4ade80",
      border: "rgba(74,222,128,0.35)",
      label: "Actif",
    },
    inactif: {
      bg: "rgba(255,255,255,0.06)",
      color: "rgba(255,255,255,0.5)",
      border: "rgba(255,255,255,0.15)",
      label: "Inactif",
    },
  };

  const s = styles[status];

  return (
    <span
      className="inline-flex px-3 py-1 rounded-full text-xs font-medium"
      style={{
        background: s.bg,
        color: s.color,
        border: `1px solid ${s.border}`,
      }}
    >
      {s.label}
    </span>
  );
};

export default function ChauffeursPage() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold">Chauffeurs</h1>
              <p className="text-sm opacity-50">{drivers.length} chauffeurs enregistrés</p>
            </div>

           <Link
  href="/dashboard/chauffeurs/new"
  className="btn-gold flex items-center gap-2 px-4 py-2 rounded-md text-sm shadow-gold"
>
  <PlusIcon className="h-4 w-4" />
  Nouveau chauffeur
</Link>
          </div>

          {/* TABLE CARD */}
          <div className="card-dashboard rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">

                <thead>
                  <tr className="border-b border-white/10 text-left text-xs opacity-60">
                    <th className="p-4">Chauffeur</th>
                    <th className="p-4">Téléphone</th>
                    <th className="p-4">Statut</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {drivers.map((d) => (
                    <tr
                      key={d.nom}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      {/* DRIVER */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gold-gradient flex items-center justify-center text-primary-foreground font-semibold">
                            {d.initiales}
                          </div>
                          <span className="font-medium">{d.nom}</span>
                        </div>
                      </td>

                      {/* PHONE */}
                      <td className="p-4 opacity-60">{d.telephone}</td>

                      {/* STATUS */}
                      <td className="p-4">
                        <StatusBadge status={d.status as "actif" | "inactif"} />
                      </td>

                      {/* ACTIONS */}
                      <td className="p-4">
                        <div className="flex justify-end gap-2">

                          {/* Voir */}
                          <Link
                            href={`/dashboard/chauffeurs/view/${d.id}`}
                            title="Voir le chauffeur"
                            className="p-2 rounded-md hover:bg-white/10 opacity-70 hover:opacity-100 transition"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </Link>

                          {/* Modifier */}
                         <Link
   href={`/dashboard/chauffeurs/edit/${d.id}`}
  title="Modifier le chauffeur"
  className="p-2 rounded-md hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 transition opacity-70 hover:opacity-100"
>
  <PencilIcon className="h-4 w-4" />
</Link>

                          {/* Supprimer */}
                          <button
                            title="Supprimer le chauffeur"
                            className="p-2 rounded-md hover:bg-red-500/10 text-red-400 hover:text-red-300 transition"
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