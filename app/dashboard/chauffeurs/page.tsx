"use client";

import { useEffect, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import { PlusIcon } from "@/components/dashboard/icons";
import Link from "next/link";
import { driverApi, type Driver } from "@/lib/drivers";

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

const StatusBadge = ({ status }: { status: string }) => {
  const isActif = status === "actif" || status === "active";
  return (
    <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium"
      style={{
        background: isActif ? "rgba(74,222,128,0.15)" : "rgba(255,255,255,0.06)",
        color: isActif ? "#4ade80" : "rgba(255,255,255,0.5)",
        border: `1px solid ${isActif ? "rgba(74,222,128,0.35)" : "rgba(255,255,255,0.15)"}`,
      }}>
      {isActif ? "Actif" : "Inactif"}
    </span>
  );
};

// ─── Modale suppression ───────────────────────────────────────────────────────

function DeleteModal({
  nom,
  onConfirm,
  onCancel,
  loading,
}: {
  nom: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="card-dashboard rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icône */}
        <div
          className="h-12 w-12 rounded-full flex items-center justify-center mb-4 mx-auto"
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
        >
          <TrashIcon className="h-5 w-5 text-red-400" />
        </div>

        <h3 className="text-lg font-semibold text-center mb-1">
          Supprimer ce chauffeur ?
        </h3>
        <p className="text-sm opacity-50 text-center mb-6">
          Le chauffeur{" "}
          <span className="font-semibold opacity-100" style={{ color: "#D4AF37" }}>
            {nom}
          </span>{" "}
          sera définitivement supprimé.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition disabled:opacity-40"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition flex items-center justify-center gap-2 disabled:opacity-70"
            style={{ background: "rgba(239,68,68,0.85)", color: "#fff" }}
          >
            {loading && (
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            )}
            {loading ? "Suppression..." : "Supprimer"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function ChauffeursPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modale
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; nom: string } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchDrivers = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await driverApi.getAll();
      console.log("Données complètes:", JSON.stringify(data[0], null, 2));
      setDrivers(data);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Impossible de charger les chauffeurs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchDrivers(); }, []);

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeletingId(deleteTarget.id);
    try {
      await driverApi.delete(deleteTarget.id);
      setDrivers((prev) => prev.filter((d) => d.uid !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (e: unknown) {
      alert(e instanceof Error ? e.message : "Erreur lors de la suppression.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />

      {/* Modale suppression */}
      {deleteTarget && (
        <DeleteModal
          nom={deleteTarget.nom}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteTarget(null)}
          loading={deletingId === deleteTarget.id}
        />
      )}

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-10 max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-semibold">Chauffeurs</h1>
              <p className="text-sm opacity-50">
                {drivers.length} chauffeur{drivers.length > 1 ? "s" : ""} enregistré{drivers.length > 1 ? "s" : ""}
              </p>
            </div>
            <Link
              href="/dashboard/chauffeurs/new"
              className="btn-gold flex items-center gap-2 px-4 py-2 rounded-md text-sm shadow-gold"
            >
              <PlusIcon className="h-4 w-4" />
              Nouveau chauffeur
            </Link>
          </div>

          {/* ERREUR */}
          {error && (
            <div className="mb-6 p-4 rounded-xl text-sm"
              style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.3)", color: "#ff8080" }}>
              ⚠ {error}
            </div>
          )}

          {/* TABLE */}
          <div className="card-dashboard rounded-xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20 opacity-40">
                <span className="h-6 w-6 rounded-full border-2 border-current border-t-transparent animate-spin mr-3" />
                Chargement...
              </div>
            ) : drivers.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 opacity-30">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-12 w-12 mb-3">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-sm">Aucun chauffeur enregistré</p>
              </div>
            ) : (
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
                    {drivers.map((d) => {
                      const initiales = `${d.firstName?.[0] ?? ""}${d.lastName?.[0] ?? ""}`.toUpperCase();
                      return (
                        <tr key={d.uid} className="border-b border-white/5 hover:bg-white/5 transition">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-full bg-gold-gradient flex items-center justify-center text-primary-foreground font-semibold text-sm">
                                {initiales || "?"}
                              </div>
                              <span className="font-medium">{d.firstName} {d.lastName}</span>
                            </div>
                          </td>
                          <td className="p-4 opacity-60">{d.phoneNumber}</td>
                          <td className="p-4"><StatusBadge status={d.status} /></td>
                          <td className="p-4">
                            <div className="flex justify-end gap-2">
                              <Link
                                href={`/dashboard/chauffeurs/edit/${d.uid}`}
                                className="p-2 rounded-md hover:bg-blue-500/10 text-blue-400 hover:text-blue-300 transition opacity-70 hover:opacity-100"
                              >
                                <PencilIcon className="h-4 w-4" />
                              </Link>
                              <button
                                onClick={() => setDeleteTarget({ id: d.uid, nom: `${d.firstName} ${d.lastName}` })}
                                className="p-2 rounded-md hover:bg-red-500/10 text-red-400 hover:text-red-300 transition"
                              >
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}