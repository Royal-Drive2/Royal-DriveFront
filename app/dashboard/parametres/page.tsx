"use client";

import { LogOutIcon } from "@/components/dashboard/icons";
import Sidebar from "@/components/dashboard/Sidebar";

interface FieldProps {
  label: string;
  defaultValue: string;
  type?: string;
}

function Field({ label, defaultValue, type = "text" }: FieldProps) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-wider mb-1.5 opacity-60">
        {label}
      </label>

      <input
        type={type}
        defaultValue={defaultValue}
        className="w-full px-3 py-2 rounded-md bg-white/5 border border-white/10 text-sm
                   focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/40 focus:border-[#D4AF37]/40"
      />
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card-dashboard rounded-xl p-6">
      <h2 className="text-lg font-semibold mb-5">{title}</h2>
      {children}
    </div>
  );
}

export default function ParametresPage() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">

      <Sidebar />

      <main className="flex-1 md:ml-64">
        <div className="p-6 md:p-10 max-w-4xl mx-auto">

          {/* HEADER */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold">
              Paramètres
            </h1>
            <p className="text-sm opacity-50">
              Configuration de votre compte et de l'entreprise
            </p>
          </div>

          <div className="space-y-6">

            <Section title="Informations de l'entreprise">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Nom" defaultValue="Royal Drive Cameroun" />
                <Field label="Email" defaultValue="contact@royaldrive.cm" type="email" />
                <Field label="Téléphone" defaultValue="+237 690 00 00 00" type="tel" />
                <Field label="Ville" defaultValue="Douala" />
              </div>
            </Section>

          {/*   <Section title="Tarifs par défaut">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Confort — Douala / Yaoundé" defaultValue="35000" type="number" />
                <Field label="Confort Plus — Douala / Yaoundé" defaultValue="45000" type="number" />
              </div>
            </Section> */}

            <Section title="Profil Admin">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Field label="Nom complet" defaultValue="Admin Royal" />
                <Field label="Email" defaultValue="admin@royaldrive.cm" type="email" />
              </div>
            </Section>

            {/* ACTIONS */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">

              <button
                className="px-6 py-2.5 rounded-md font-semibold text-black
                           bg-[#D4AF37] hover:opacity-90 transition"
              >
                Enregistrer les changements
              </button>

              <button
                className="flex items-center gap-2 px-4 py-2 rounded-md
                           border border-red-500/30 text-red-400
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