import EditChauffeurForm from "./EditChauffeurForm";

type Props = { params: { id: string } };

// Swap this out for a real DB/API call when ready
async function getChauffeur(id: string) {
  return {
    prenom: "Jean",
    nom: "Mbarga",
    telephone: "+237 690 00 00 00",
    categoriePermis: "B",
    statut: "actif" as const,
  };
}

export default async function EditChauffeurPage({ params }: Props) {
  const chauffeur = await getChauffeur(params.id);

  return (
    <main className="flex-1 md:ml-64 p-6 md:p-10">
      <EditChauffeurForm initialData={chauffeur} chauffeurId={params.id} />
    </main>
  );
}