import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { Amicale } from '../models /amicale';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AmicalesService {
private URL = 'http://127.0.0.1:8000/api/';
  constructor(private http: HttpClient) { }
  getAmicales() {
    return this.http.get<any>(this.URL + 'getAmicale');
  }
  addAmicale(amicale: Amicale, ) {
    return this.http.post(this.URL + 'addAmicale', amicale, {responseType: 'text'});


  }

}






