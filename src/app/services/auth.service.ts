import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Router} from '@angular/router';




import {User} from '../models /user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, ) {


   }
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
      return (localStorage.getItem('token'));
      } else { return this.ch; }
    }


  loginUser(email: String, password: String) {

    const body = { email: email, password: password};


   return this.http.post<any>(this.tokenURL, body);
    }


    getCordonnees(email: string) {
    return this.http.post<any>(this.getUserURL, { email: email });
    }


    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('email');
      localStorage.removeItem('cin');
      localStorage.removeItem('nom');
      localStorage.removeItem('prenom');


    }
    loggedIn() {
      return !!localStorage.getItem('token');
    }


}

