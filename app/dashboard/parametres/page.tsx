"use client";

import { LogOutIcon } from "@/components/dashboard/icons";
import Sidebar from "@/components/dashboard/Sidebar";
import {
  authApi,
  companyApi,
  AdminProfile,
  UpdateProfilePayload,
  CompanyInfo,
} from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ─── Composants utilitaires ───────────────────────────────────────────────────

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  disabled?: boolean;
}

function Field({ label, value, onChange, type = "text", disabled }: FieldProps) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider mb-1.5 opacity-60">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm
                   focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40
                   disabled:opacity-40 disabled:cursor-not-allowed"
      />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card-dashboard rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-5">{title}</h2>
      {children}
    </div>
  );
}

// ─── Modale déconnexion ───────────────────────────────────────────────────────

function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
    >
      <div
        className="card-dashboard rounded-2xl p-6 max-w-sm w-full shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="h-12 w-12 rounded-full flex items-center justify-center mb-4 mx-auto"
          style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
        >
          <LogOutIcon className="h-5 w-5 text-red-400" />
        </div>
        <h3 className="text-lg font-semibold text-center mb-1">Se déconnecter ?</h3>
        <p className="text-sm opacity-50 text-center mb-6">
          Vous allez quitter votre session admin. Vous devrez vous reconnecter pour accéder au dashboard.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-sm hover:bg-white/5 transition"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium transition"
            style={{ background: "rgba(239,68,68,0.85)", color: "#fff" }}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Page principale ──────────────────────────────────────────────────────────

export default function ParametresPage() {
  const router = useRouter();

  // ── Profil admin ──────────────────────────────────────────────────────────
  const [profile, setProfile] = useState<AdminProfile>({
    displayName: "",
    phoneNumber: "",
    email: "",
  });

  // ── Infos entreprise ──────────────────────────────────────────────────────
  const [company, setCompany] = useState<CompanyInfo>({
    name: "",
    email: "",
    phoneNumber: "",
    city: "",
  });

  // ── États UI ──────────────────────────────────────────────────────────────
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ── Chargement initial des deux GET en parallèle ──────────────────────────
  useEffect(() => {
    const token = sessionStorage.getItem("rd_token");
    if (!token) {
      router.push("/dashboard/register");
      return;
    }

    Promise.all([authApi.getProfile(), companyApi.get()])
      .then(([profileData, companyData]) => {
        setProfile(profileData);
        setCompany(companyData);
      })
      .catch((err) => setError(err.message || "Erreur de chargement."))
      .finally(() => setLoading(false));
  }, []);

  // ── Sauvegarde : PUT profile + PUT company en parallèle ───────────────────
  const handleSave = async () => {
    setSaving(true);
    setError("");
    setSuccess(false);
    try {
      await Promise.all([
        authApi.updateProfile({
          displayName: profile.displayName,
          phoneNumber: profile.phoneNumber,
          email: profile.email,
        } as UpdateProfilePayload),
        companyApi.update(company),
      ]);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erreur de sauvegarde.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("rd_token");
    router.push("/dashboard/register");
  };

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">

      {showLogoutModal && (
        <LogoutModal
          onConfirm={handleLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      )}

      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-10 max-w-4xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold">Paramètres</h1>
            <p className="text-sm opacity-50">
              Configuration de votre compte et de l'entreprise
            </p>
          </div>

          {/* Erreur globale de chargement */}
          {error && !saving && (
            <div className="mb-6 p-4 rounded-xl text-sm"
              style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.3)", color: "#ff8080" }}>
              ⚠ {error}
            </div>
          )}

          <div className="space-y-6">

            {/* ── Informations entreprise — connecté au backend ── */}
            <Section title="Informations de l'entreprise">
              {loading ? (
                <div className="flex items-center gap-2 text-sm opacity-50">
                  <span className="w-4 h-4 border-2 border-[#D4AF37]/40 border-t-[#D4AF37] rounded-full animate-spin" />
                  Chargement...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Nom de l'entreprise"
                    value={company.name}
                    onChange={(v) => setCompany((c) => ({ ...c, name: v }))}
                  />
                  <Field
                    label="Email"
                    value={company.email}
                    type="email"
                    onChange={(v) => setCompany((c) => ({ ...c, email: v }))}
                  />
                  <Field
                    label="Téléphone"
                    value={company.phoneNumber}
                    type="tel"
                    onChange={(v) => setCompany((c) => ({ ...c, phoneNumber: v }))}
                  />
                  <Field
                    label="Ville"
                    value={company.city}
                    onChange={(v) => setCompany((c) => ({ ...c, city: v }))}
                  />
                </div>
              )}
            </Section>

            {/* ── Profil Admin — connecté au backend ── */}
            <Section title="Profil Admin">
              {loading ? (
                <div className="flex items-center gap-2 text-sm opacity-50">
                  <span className="w-4 h-4 border-2 border-[#D4AF37]/40 border-t-[#D4AF37] rounded-full animate-spin" />
                  Chargement...
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field
                    label="Nom complet"
                    value={profile.displayName}
                    onChange={(v) => setProfile((p) => ({ ...p, displayName: v }))}
                  />
                  <Field
                    label="Email"
                    value={profile.email}
                    type="email"
                    onChange={(v) => setProfile((p) => ({ ...p, email: v }))}
                  />
                  <Field
                    label="Téléphone"
                    value={profile.phoneNumber}
                    type="tel"
                    onChange={(v) => setProfile((p) => ({ ...p, phoneNumber: v }))}
                  />
                </div>
              )}
            </Section>

            {/* ── Feedback succès/erreur ── */}
            {error && saving === false && (
              <p className="text-xs text-red-400">⚠ {error}</p>
            )}
            {success && (
              <p className="text-xs text-green-400">
                ✓ Profil et informations entreprise mis à jour avec succès.
              </p>
            )}

            {/* ── ACTIONS ── */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
              <button
                onClick={handleSave}
                disabled={saving || loading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-md font-semibold text-black
                           bg-[#D4AF37] hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving && (
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                )}
                {saving ? "Enregistrement..." : "Enregistrer les changements"}
              </button>

              <button
                onClick={() => setShowLogoutModal(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-md border border-red-500/30 text-red-400
                           hover:bg-red-500/10 transition"
              >
                <LogOutIcon className="h-4 w-4" />
                Se déconnecter
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}