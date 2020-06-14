import { Adherent } from "./adherent";
import { ObjetAssure } from "./objetAssure";
import { contractFile } from "./contractFile";

export class Contrat {
  numPolice: string;
  dateEffective: String;
  remarque: string;
  objId: string;
  cfId: string;
  adhId: string;
  dateEcheance: string;
  contractFile: contractFile;
}
