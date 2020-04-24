import { Adresse } from "./adresse";

export class Amicale {
  nom: String;
  email: String;
  adresse: Adresse;
  numero1: String;
  numero2: String;

  constructor(
    nom: String,
    email: String,
    adresse: Adresse,
    numero1: String,
    numero2: String
  ) {
    this.nom = nom;
    this.email = email;
    this.adresse = adresse;
    this.numero1 = numero1;
    this.numero2 = numero2;
  }
}
