import { Injectable, ErrorHandler } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpInterceptor,
} from "@angular/common/http";
import { Amicale } from "../models /amicale";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AmicalesService {
  private URL = "http://127.0.0.1:8000/api/";
  constructor(private http: HttpClient) {}
  getAmicales() {
    return this.http.get<any>(this.URL + "getAmicale");
  }
  getAmicaleByname(name: String) {
    return this.http.get<any>(this.URL + "amicaleByName/" + name);
  }
  addAmicale(amicale: Amicale) {
    return this.http
      .post(this.URL + "addAmicale", amicale, {
        responseType: "text",
      })
      .pipe(catchError(this.handleError));
  }
  deleteAmicale(nom: String): any {
    return this.http.delete(this.URL + "amicale/" + nom, {
      responseType: "text",
    });
  }
  getCordonnes(nom: String) {
    return this.http.get(this.URL + "getCoordonne/" + nom);
  }

  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 409) {
        errorMessage = `Cette Amicale existe deja `;
      } else {
        errorMessage = "erreur interne du serveur ";
      }
    }

    return throwError(errorMessage);
  }
}
