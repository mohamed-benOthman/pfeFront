import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";
import { ForgottenPasswordComponent } from "src/app/pages/forgotten-password/forgotten-password.component";
import { ResetPasswordComponent } from "src/app/pages/reset-password/reset-password.component";
import { ComponentsModule } from "src/app/components/components.module";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    ComponentsModule,

    // NgbModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,

    ForgottenPasswordComponent,
    ResetPasswordComponent,
  ],
})
export class AuthLayoutModule {}
