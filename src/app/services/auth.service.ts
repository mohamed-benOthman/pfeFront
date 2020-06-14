import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { User } from "../models /user";
interface email {
  email: string;
}
interface password {
  password: string;
}
@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private ch: String = "";
  private router: Router;
  public user: User;
  public token: String;

  private localHost = "http://127.0.0.1:8000/";
  private registerUrl = this.localHost + "register/";
  private url = this.localHost + "api/user/";
  private tokenURL = this.localHost + "apiPlatform/login_check";
  private getUserURL = this.localHost + "api/getUser";
  private signInCheckTokenUrl = this.localHost + "signInCheck/";
  private forgottenpassword = this.localHost + "forgottenPassword";
  private checkTokenUrl = this.localHost + "resetPasswordCheck/";
  private registration = this.localHost + "addUser";
  private resetPasswordUrl: string = this.localHost + "resetPassword/";
  public getUser(): User {
    return this.user;
  }
  public getToken(): String {
    if (localStorage.getItem("token") != null) {
      return localStorage.getItem("token");
    } else {
      return this.ch;
    }
  }
  public password = {
    password: "",
  };
  registerUser(user, id) {
    return this.http.put(this.registerUrl + id, user);
  }
  loginUser(email: String, password: String) {
    const body = { email: email, password: password };

    return this.http
      .post<any>(this.tokenURL, body)
      .pipe(catchError(this.handleError));
  }
  checkToken(token) {
    return this.http
      .get(this.checkTokenUrl + token)
      .pipe(catchError(this.handleError3));
  }
  signInCheckToken(token) {
    return this.http
      .get(this.signInCheckTokenUrl + token)
      .pipe(catchError(this.handleError3));
  }
  resetPassword(id, password) {
    this.password.password = password;
    return this.http.put(this.resetPasswordUrl + id, this.password);
  }
  getCordonnees(email: string) {
    return this.http.post<any>(this.getUserURL, { email: email });
  }
  getUsers() {
    return this.http.get<any>("http://127.0.0.1:8000/apiPlatform/users");
  }
  editUser(id, user: User) {
    return this.http.put(this.url + id, user);
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("role");
  }
  loggedIn() {
    return !!localStorage.getItem("token");
  }
  isAdmin() {
    if (this.loggedIn() === true && localStorage.getItem("role") === "admin") {
      return true;
    } else {
      return false;
    }
  }
  public email = {
    email: "",
  };

  sendResetEmail(email1) {
    this.email.email = email1;
    return this.http
      .post(this.forgottenpassword, this.email)
      .pipe(catchError(this.handdleError2));
  }
  sendRegistration(email1) {
    this.email.email = email1;
    return this.http
      .post(this.registration, this.email)
      .pipe(catchError(this.handdleError2));
  }

  handleError(error) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      if (error.status === 401) {
        errorMessage = `email ou mot de passe est incorrecte `;
      } else {
        errorMessage = "erreur interne du serveur ";
      }
    }

    return throwError(errorMessage);
  }
  handdleError2() {
    return throwError("Email non trouvé");
  }
  handleError3() {
    return throwError("Token not Found");
  }
}
