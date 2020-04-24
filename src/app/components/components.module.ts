import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { Routes, Router } from "@angular/router";
import { LoginComponent } from "../pages/login/login.component";
import { AdhrentsListComponent } from "./adhrents-list/adhrents-list.component";
import { DeleteConfirmationComponent } from "./modals/delete-confirmation/delete-confirmation.component";
import { MaterialModule } from "../material/material.module";
import { FormsModule } from "@angular/forms";
const appRoutes: Routes = [{ path: "login", component: LoginComponent }];
@NgModule({
  imports: [CommonModule, FormsModule, RouterModule, NgbModule, MaterialModule],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AdhrentsListComponent,
    DeleteConfirmationComponent,
  ],
  exports: [FooterComponent, NavbarComponent, SidebarComponent],
})
export class ComponentsModule {}
