import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObjetAssure } from '../models /objetAssure';

@Injectable({
  providedIn: 'root',
})
export class VoitureService {
  constructor(private http: HttpClient) {}
  private url = 'http://127.0.0.1:8000/api/voiture';

  addVoiture(voiture: ObjetAssure) {
    return this.http.post(this.url, voiture);
  }
}
