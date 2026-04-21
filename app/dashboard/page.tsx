"use client";

import Link from "next/link";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  CalendarCheckIcon,
  WalletIcon,
  UsersIcon,
  CarIcon,
  ArrowUpRightIcon,
} from "@/components/dashboard/icons";
import { Reservation } from "@/types/dashboard";

// ───────────────────────────────────────────
// Stats config
// ───────────────────────────────────────────
const stats = [
  {
    icon: CalendarCheckIcon,
    badge: "+3 vs hier",
    value: "12",
    label: "Courses aujourd'hui",
  },
  {
    icon: WalletIcon,
    badge: "+12%",
    value: "485 000 FCFA",
    label: "Chiffre d'affaires",
  },
  {
    icon: UsersIcon,
    badge: "2 en course",
    value: "8 / 12",
    label: "Chauffeurs actifs",
  },
  {
    icon: CarIcon,
    badge: "3 en mission",
    value: "6 / 9",
    label: "Véhicules disponibles",
  },
];

// ───────────────────────────────────────────
// Fake data (à remplacer par API)
// ───────────────────────────────────────────
const reservations: Reservation[] = [
  {
    id: "RD-1042",
    date: "19 Avr, 14:30",
    client: "Jean Mballa",
    telephone: "+237 690 12 34 56",
    trajet: "Douala → Yaoundé",
    categorie: "Confort Plus",
    pax: 3,
    bagages: 4,
    chauffeur: "Paul Nkomo",
    montant: "45 000 FCFA",
    status: "en_cours",
  },
  {
    id: "RD-1041",
    date: "19 Avr, 11:00",
    client: "Aline Foka",
    telephone: "+237 677 88 21 09",
    trajet: "Yaoundé → Douala",
    categorie: "Confort",
    pax: 2,
    bagages: 2,
    chauffeur: "Eric Tagne",
    montant: "35 000 FCFA",
    status: "terminee",
  },
];

// ───────────────────────────────────────────
// Status Badge Component (clean 🔥)
// ───────────────────────────────────────────
const StatusBadge = ({ status }: { status: Reservation["status"] }) => {
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

// ───────────────────────────────────────────
// Card Component (réutilisable)
// ───────────────────────────────────────────
const StatCard = ({
  icon: Icon,
  badge,
  value,
  label,
}: any) => (
  <div className="card-dashboard rounded-xl p-5 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <span
        className="flex h-10 w-10 items-center justify-center rounded-lg"
        style={{ background: "rgba(212,175,55,0.12)", color: "#D4AF37" }}
      >
        <Icon className="h-5 w-5" />
      </span>

      <span
        className="text-xs tracking-wide"
        style={{ color: "rgba(255,255,255,0.35)" }}
      >
        {badge}
      </span>
    </div>

    <div className="text-2xl font-semibold">{value}</div>

    <div className="text-xs mt-1 opacity-50">{label}</div>
  </div>
);

// ───────────────────────────────────────────
// MAIN PAGE
// ───────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-semibold">
                Bonjour, Admin 👑
              </h1>
              <p className="text-sm opacity-50">
                Aperçu de votre activité aujourd'hui
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </div>

          {/* Table */}
          <div className="card-dashboard rounded-xl overflow-hidden">
            
            {/* Header table */}
            <div className="flex justify-between px-6 py-4 border-b border-white/10">
              <div>
                <h2 className="text-xl font-semibold">
                  Dernières réservations
                </h2>
                <p className="text-xs opacity-50">
                  5 plus récentes
                </p>
              </div>

              <Link
                href="/dashboard/reservations"
                className="flex items-center gap-1 text-xs text-[#D4AF37]"
              >
                Voir tout <ArrowUpRightIcon className="h-4 w-4" />
              </Link>
            </div>

            {/* Table content */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10 text-left text-xs opacity-60">
                    <th className="p-4">ID</th>
                    <th className="p-4">Client</th>
                    <th className="p-4">Trajet</th>
                    <th className="p-4">Montant</th>
                    <th className="p-4">Statut</th>
                  </tr>
                </thead>

                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id} className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="p-4 text-[#D4AF37] font-mono text-xs">
                        {r.id}
                      </td>
                      <td className="p-4 font-medium">{r.client}</td>
                      <td className="p-4 opacity-60">{r.trajet}</td>
                      <td className="p-4 font-medium">{r.montant}</td>
                      <td className="p-4">
                        <StatusBadge status={r.status} />
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