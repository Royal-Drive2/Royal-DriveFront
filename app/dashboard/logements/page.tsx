"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { Building2Icon } from "@/components/dashboard/icons";

export default function LogementsPage() {
  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 md:ml-64 min-h-screen">

        <div className="min-h-screen flex items-center justify-center p-6">

          <div className="text-center max-w-md">

            {/* ICON BOX */}
            <div
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl
                         bg-[#D4AF37]/10 border border-[#D4AF37]/30"
            >
              <Building2Icon className="h-10 w-10 text-[#D4AF37]" />
            </div>

            {/* LABEL */}
            <p className="text-xs uppercase tracking-[0.2em] opacity-50 mb-3">
              Module
            </p>

            {/* TITLE */}
            <h1 className="font-display text-3xl font-semibold mb-3">
              Logements
            </h1>

            {/* DESCRIPTION */}
            <p className="opacity-60 text-sm leading-relaxed mb-8">
              En cours de développement. Bientôt, vous pourrez gérer les hébergements premium pour vos clients voyageurs.
            </p>

            {/* BUTTON */}
            <button
              disabled
              className="px-6 py-3 rounded-md text-sm font-semibold
                         border border-white/10 bg-white/5
                         text-white/40 cursor-not-allowed"
            >
              Activer le module Logements
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}