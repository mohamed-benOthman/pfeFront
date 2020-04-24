import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { LoginComponent } from "src/app/pages/login/login.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { AdminGuard } from "src/app/guards/admin.guard";
import { ListContratsComponent } from "../../pages/list-contrats/list-contrats.component";
import { ListUsersComponent } from "../../pages/list-users/list-users.component";
import { ListAdherentComponent } from "src/app/pages/list-adherent/list-adherent.component";
import { ModifierAdherentComponent } from "src/app/pages/modifier-adherent/modifier-adherent.component";
import { AllAdherentsComponent } from "../../pages/all-adherents/all-adherents.component";
export const AdminLayoutRoutes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "user-profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: "tables", component: TablesComponent, canActivate: [AuthGuard] },
  { path: "icons", component: IconsComponent, canActivate: [AuthGuard] },
  { path: "maps", component: MapsComponent, canActivate: [AuthGuard] },
  { path: "", component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: "users",
    component: ListUsersComponent,
    canActivate: [AdminGuard],
  },
  {
    path: "amicale/:nom",
    component: ListAdherentComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "modifieradherent",
    component: ModifierAdherentComponent,
  },
  {
    path: "alladherents",
    component: AllAdherentsComponent,
  },
  {
    path: "listcontrats/:cin",
    component: ListContratsComponent,
    canActivate: [AuthGuard],
  },
];
