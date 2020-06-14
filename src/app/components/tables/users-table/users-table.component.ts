import { Component, OnInit, Input } from "@angular/core";
import { User } from "src/app/models /user";
import { MatDialog } from "@angular/material/dialog";
import { SigninComponent } from "../../modals/signin/signin.component";

@Component({
  selector: "app-users-table",
  templateUrl: "./users-table.component.html",
  styleUrls: ["./users-table.component.css"],
})
export class UsersTableComponent implements OnInit {
  @Input() labels: string[];
  @Input() listUsers: User[];
  @Input() name: string;
  constructor(private dialog: MatDialog) {}
  openAddDialog() {
    this.dialog.open(SigninComponent, {
      width: "350px",
    });
  }
  ngOnInit(): void {}
}
