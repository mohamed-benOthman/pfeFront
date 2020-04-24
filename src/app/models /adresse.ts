export class Adresse {
  id: String;
  rue: String;
  ville: String;
  municipalite: String;
  codePostale: String;
  constructor(
    rue: String,
    codePostale: String,
    ville: String,
    municipalite: String
  ) {
    this.rue = rue;
    this.ville = ville;
    this.municipalite = municipalite;
    this.codePostale = codePostale;
  }
}
