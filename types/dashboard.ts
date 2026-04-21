export type NavPage =
  | "accueil"
  | "vehicules"
  | "chauffeurs"
  | "reservations"
  | "logements"
  | "parametres";

export type ReservationStatus = "en_cours" | "terminee" | "annulee";
export type DriverStatus = "en_course" | "actif" | "inactif";

export interface Reservation {
  id: string;
  date: string;
  client: string;
  telephone: string;
  trajet: string;
  categorie: string;
  pax: number;
  bagages: number;
  chauffeur: string;
  montant: string;
  status: ReservationStatus;
}

export interface Driver {
  initiales: string;
  nom: string;
  telephone: string;
  status: DriverStatus;
  note: number;
}

export interface VehicleCategory {
  nom: string;
  description: string;
  image: string;
  count: number;
  trajet: string;
  prix: string;
}
