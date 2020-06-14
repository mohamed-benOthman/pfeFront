import { Adresse } from './adresse';
import { Amicale } from './amicale';
export class Adherent {
  id: String;
  nom: string;
  prenom: String;
  email: String;
  numTel1: String;
  numTel2: String;
  adrId: String;
  cin: String;
  amicale: Amicale;
  codeUtecom: String;
  numCarte: String;
  statut: String;
  amId: String;
  adresse: Adresse;
  constructor(
    email,
    prenom,
    nom,
    numTel1,
    numTel2,
    numCarte,
    amId,
    cin,
    codeUtecom,
    statut,
    adrId
  ) {
    this.nom = nom;
    this.email = email;
    this.prenom = prenom;
    this.numTel1 = numTel1;
    this.numTel2 = numTel2;
    this.numCarte = numCarte;
    this.amId = amId;
    this.cin = cin;
    this.codeUtecom = codeUtecom;
    this.statut = statut;
    this.adrId = adrId;
  }
}
