import { ReactNode } from "react";

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
  [x: string]: ReactNode;
  adresse_depart: ReactNode;
  adresse_arrivee: ReactNode;
  id: string;
  date: string;
  client: string;
  telephone: string;
  categorie: string;
  passagers: number;
  bagages: number;
  montant: string;
  status: ReservationStatus;
}

export interface Driver {
  id: any;
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
