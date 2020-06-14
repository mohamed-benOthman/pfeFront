import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

declare interface RouteInfo {
  path: string;
  title: string;
  icon: String;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Page d'Accueil",
    icon: "ni-tv-2 text-primary",
    class: "",
  },

  {
    path: "/alladherents",
    title: "Liste des Adhérents",
    icon: "ni-circle-08 text-primary",
    class: "",
  },

  {
    path: "/listeAmicales",
    title: "Liste des Amicales",
    icon: "ni-briefcase-24 text-primary",
    class: "",
  },
  {
    path: "/login",
    title: "Déconnection",
    icon: "ni-user-run text-primary",
    class: "",
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  listUsersRoute: RouteInfo = {
    path: "/users",
    title: "liste des Utilisateurs",
    icon: "ni-circle-08 text-primary",
    class: "",
  };

  public menuItems: any[];
  public isCollapsed = true;
  isAdmin = localStorage.getItem("role");
  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    if (this.isAdmin === "admin") {
      this.menuItems.push(this.listUsersRoute);
    }
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
