import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Contrat } from "../models /contrat";

@Injectable({
  providedIn: "root",
})
export class ContratService {
  constructor(private http: HttpClient) {}
  private localHost = "http://127.0.0.1:8000/";
  private url = this.localHost + "api/contract";
  nbContratUrl = this.localHost + "api/getNbContrat";
  addContract(contract: Contrat) {
    return this.http.post(this.url, contract);
  }
  getContrats() {
    return this.http.get(this.url);
  }
  getNbContrats() {
    return this.http.get(this.nbContratUrl);
  }
}
