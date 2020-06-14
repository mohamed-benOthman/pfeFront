import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Adresse } from '../models /adresse';

@Injectable({
  providedIn: 'root',
})
export class AdresseService {
  constructor(private http: HttpClient) {}
  apiUrl = 'http://127.0.0.1:8000/api/adresse';
  deleteAdresse(id) {
    this.http.delete<any>(this.apiUrl + '/' + id);
  }
  addAdresse(adresse: Adresse) {
    return this.http.post<any>(this.apiUrl, adresse);
  }
}
