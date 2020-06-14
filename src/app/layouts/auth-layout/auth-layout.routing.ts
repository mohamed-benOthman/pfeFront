import { Routes } from "@angular/router";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { ForgottenPasswordComponent } from "src/app/pages/forgotten-password/forgotten-password.component";
import { ResetPasswordComponent } from "src/app/pages/reset-password/reset-password.component";
import { ResetPasswordResolverService } from "src/app/services/reset-password-resolver.service";
import { NotFound404Component } from "src/app/components/not-found404/not-found404.component";
import { RegistrationResolverService } from "src/app/services/registration-resolver.service";

export const AuthLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgottenPassword", component: ForgottenPasswordComponent },
  {
    path: "resetPassword/:id/:token",
    component: ResetPasswordComponent,
    resolve: {
      crisis: ResetPasswordResolverService,
    },
  },
  {
    path: "signIn/:id/:token",
    component: RegisterComponent,
    resolve: {
      crisis: RegistrationResolverService,
    },
  },
  { path: "notFound404", component: NotFound404Component },
];
