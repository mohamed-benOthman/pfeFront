export class ObjetAssure {
  dateAcquisition: String;
  dateProduction: String;
  marque: String;
  numChassis: String;
  numSerie: String;
  puissance: String;
  modele: String;
  constructor(
    aquisition,
    production,
    marque,
    puissance,
    chassis,
    serie,
    modele
  ) {
    this.dateAcquisition = aquisition;
    this.dateProduction = production;
    this.marque = marque;
    this.numChassis = chassis;
    this.numSerie = serie;
    this.modele = modele;
    this.puissance = puissance;
  }
}
