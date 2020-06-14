import { Component, OnInit } from "@angular/core";
import { User } from "src/app/models /user";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-list-users",
  templateUrl: "./list-users.component.html",
  styleUrls: ["./list-users.component.css"],
})
export class ListUsersComponent implements OnInit {
  constructor(private auth: AuthService) {}
  label = ["Prenom", "Nom", "Email", "Cin", "Role", ""];
  listUsers: User[];
  ngOnInit(): void {
    this.auth.getUsers().subscribe((res) => {
      this.listUsers = res;
    });
  }
}
