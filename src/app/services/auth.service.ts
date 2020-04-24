import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models /user';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private ch: String = '';
  private router: Router;
  public user: User;
  public token: String;

  tokenURL = 'http://127.0.0.1:8000/apiPlatform/login_check';
  getUserURL = 'http://127.0.0.1:8000/api/getUser';
  public getUser(): User {
    return this.user;
  }
  public getToken(): String {
    if (localStorage.getItem('token') != null) {
      return localStorage.getItem('token');
    } else {
      return this.ch;
    }
  }

  loginUser(email: String, password: String) {
    const body = { email: email, password: password };

    return this.http
      .post<any>(this.tokenURL, body)
      .pipe(catchError(this.handleError));
  }

  getCordonnees(email: string) {
    return this.http.post<any>(this.getUserURL, { email: email });
  }
  getUsers() {
    return this.http.get<any>('http://127.0.0.1:8000/apiPlatform/users');
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('role');
  }
  loggedIn() {
    return !!localStorage.getItem('token');
  }
  isAdmin() {
    if (this.loggedIn() === true && localStorage.getItem('role') === 'admin') {
      return true;
    } else { return false; }
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        errorMessage = `email ou mot de passe est incorrecte `;
      }
      else { errorMessage = 'erreur interne du serveur '; }
    }

    return throwError(errorMessage);
  }
}
