import { Component, OnInit, OnDestroy, Input } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "../../services/auth.service";
import {
  Router,
  Routes,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from "@angular/router";

import { User } from "src/app/models /user";
import { DataService } from "src/app/services/data.service";
import { BrowserStack } from "protractor/built/driverProviders";
import { catchError } from "rxjs/operators";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  @Input() type: string;
  isLoading = false;
  login = "login";
  error: String;
  user: User;
  email: string;
  resetPassword: string = "resetPassword";
  registration = "registration";
  forgottenPassword: string = "forgottenPassword";
  constructor(
    private _Activatedroute: ActivatedRoute,

    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}
  ngOnInit() {}
  toForgottenPassword() {
    this.router.navigate(["forgottenPassword"]);
  }
  ngOnDestroy() {}
  message: string;
  onSubmit(form: NgForm) {
    switch (this.type) {
      case "login":
        this.email = form.value.email;
        this.isLoading = true;

        this.authService.loginUser(this.email, form.value.password).subscribe(
          (responseData: any) => {
            console.log(responseData);
            localStorage.setItem("token", responseData.token);
            localStorage.setItem("refresh_token", responseData.refresh_token);

            if (localStorage.getItem("token") != null) {
              this.authService
                .getCordonnees(this.email)
                .subscribe((res: any) => {
                  localStorage.setItem("role", res.role);
                  localStorage.setItem("email", res.email);
                  this.user = res;
                  console.log(this.user);
                  this.dataService.changeUser(this.user);
                  this.router.navigate(["dashboard"]);
                  this.isLoading = false;
                });
            }
          },
          (err) => {
            this.error = err;

            this.isLoading = false;
          }
        );
        break;
      case "forgottenPassword":
        console.log(form.value);
        this.authService.sendResetEmail(form.value.email).subscribe(
          (res) => {
            this.message = "Email envoyé";
          },
          (err) => {
            this.message = err;
          }
        );
        break;
      case "resetPassword":
        let id;
        this._Activatedroute.paramMap.subscribe((params) => {
          id = params.get("id");
        });

        this.authService
          .resetPassword(id, form.value.password2)
          .subscribe((res) => this.router.navigate(["login"]));
        break;

      case "registration":
        this.isLoading = true;
        this._Activatedroute.paramMap.subscribe((params) => {
          id = params.get("id");
        });
        const user = {
          nom: form.value.nom,
          prenom: form.value.prenom,
          cin: form.value.cin,
          password: form.value.password2,
        };
        this.authService.registerUser(user, id).subscribe((res: any) => {
          localStorage.setItem("email", res);
          this.router.navigate(["dashboard"]);
          this.isLoading = false;
        });
        break;

      default:
        this.email = form.value.email;
        this.isLoading = true;

        this.authService.loginUser(this.email, form.value.password).subscribe(
          (responseData: any) => {
            console.log(responseData);
            localStorage.setItem("token", responseData.token);
            localStorage.setItem("refresh_token", responseData.refresh_token);

            if (localStorage.getItem("token") != null) {
              this.authService
                .getCordonnees(this.email)
                .subscribe((res: any) => {
                  localStorage.setItem("role", res.role);
                  localStorage.setItem("email", res.email);
                  this.user = res;
                  console.log(this.user);
                  this.dataService.changeUser(this.user);
                  this.router.navigate(["dashboard"]);
                  this.isLoading = false;
                });
            }
          },
          (err) => {
            this.error = err;

            this.isLoading = false;
          }
        );
        break;
    }
  }
}
