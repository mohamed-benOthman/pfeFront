import { Injectable } from "@angular/core";
import { ErrorHandler } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptor,
} from "@angular/common/http";
import { Amicale } from "../models /amicale";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { AdresseService } from "./adresse.service";
import { Adherent } from "../models /adherent";
@Injectable({
  providedIn: "root",
})
export class AdherentsService {
  constructor(
    private http: HttpClient,
    private adresseService: AdresseService
  ) {}
  localHost = "http://127.0.0.1:8000/";
  nbAdherentsUrl = "http://127.0.0.1:8000/api/getNbAdherent";
  nbAdherentsActifsUrl = "http://127.0.0.1:8000/api/getNbAdherentActif";
  apiURL = "http://127.0.0.1:8000/api/amicale/";
  adherentUrl = "http://127.0.0.1:8000/api/adherent";
  getAdherent(nom) {
    return this.http.get<any>(this.apiURL + nom);
  }
  deleteAdherent(id: String): Observable<any> {
    return this.http.delete(this.adherentUrl + "/" + id);

    // this.adresseService.deleteAdresse(adrId);
  }
  getnbAdherentsTotale(): Observable<any> {
    return this.http.get(this.nbAdherentsUrl);
  }
  getnbAdherentsActifs() {
    return this.http.get(this.nbAdherentsActifsUrl);
  }
  addAdherent(adherent: Adherent) {
    return this.http.post(this.adherentUrl, JSON.stringify(adherent));
  }
  getAllAdhereants() {
    return this.http.get<any>(this.adherentUrl);
  }
  editAdherent(adherent: Adherent) {
    return this.http.put(this.adherentUrl + "/" + adherent.id, adherent);
  }
}
