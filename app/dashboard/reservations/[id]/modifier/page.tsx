import EditReservationForm from "./EditReservationForm";

type Props = { params: { id: string } };

async function getReservation(id: string) {
  return {
    client:          "Jean Mballa",
    telephone:       "+237 690 12 34 56",
    adresse_depart:  "Douala, Akwa",
    adresse_arrivee: "Yaoundé, Centre",
    date:            "2024-04-19",
    heure:           "14:30",
    categorie:       "Confort Plus",
    pax:             "3",
    bagages:         "4",
    montant:         "45 000",
    statut:          "en_cours" as const,
  };
}

export default async function EditReservationPage({ params }: Props) {
  const reservation = await getReservation(params.id);

  return (
    <main className="flex-1 md:ml-64 p-6 md:p-10">
      <EditReservationForm initialData={reservation} reservationId={params.id} />
    </main>
  );
}