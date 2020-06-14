import { Adresse } from './adresse';

export class Amicale {
  nom: String;
  email: String;
  adresse: Adresse;
  numero1: String;
  numero2: String;
  adrId: String;
  nbAdherent:number

  constructor(
    nom: String,
    email: String,
    adrId: String,
    numero1: String,
    numero2: String
  ) {
    this.nom = nom;
    this.email = email;
    this.adrId = adrId;
    this.numero1 = numero1;
    this.numero2 = numero2;
  }
}
