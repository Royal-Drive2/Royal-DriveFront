"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import { driverApi } from "@/lib/drivers";
import EditChauffeurForm from "./EditChauffeurForm";

type FormData = {
  prenom: string;
  nom: string;
  telephone: string;
  categoriePermis: string;
  statut: "actif" | "inactif";
};

export default function EditChauffeurPage() {
  const { uid } = useParams<{ uid: string }>();
  const [initialData, setInitialData] = useState<FormData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    driverApi.getById(uid)
      .then((data) => {
        setInitialData({
          prenom: data.firstName ?? "",
          nom: data.lastName ?? "",
          telephone: data.phoneNumber ?? "",
          categoriePermis: "",
          statut: data.status === "actif" || data.status === "active" ? "actif" : "inactif",
        });
      })
      .catch((e: any) => setError(e.message || "Impossible de charger ce chauffeur."));
  }, [uid]);

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 md:ml-64 p-6 md:p-10">
        {error && (
          <div className="p-4 rounded-xl text-sm mb-6" style={{ background: "rgba(220,50,50,0.1)", border: "1px solid rgba(220,50,50,0.3)", color: "#ff8080" }}>
            ⚠ {error}
          </div>
        )}
        {!initialData && !error && (
          <div className="flex items-center justify-center py-20 opacity-40">
            <span className="h-6 w-6 rounded-full border-2 border-current border-t-transparent animate-spin mr-3" />
            Chargement...
          </div>
        )}
        {initialData && (
          <EditChauffeurForm initialData={initialData} chauffeurId={uid} />
        )}
      </main>
    </div>
  );
}