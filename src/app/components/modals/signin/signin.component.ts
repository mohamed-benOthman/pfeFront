import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { AuthService } from "src/app/services/auth.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.css"],
})
export class SigninComponent implements OnInit {
  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<SigninComponent>
  ) {}
  failure = false;
  loading = false;
  success = false;
  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }
  sendRegistatrationEmail(form: NgForm) {
    this.failure = false;
    this.loading = true;
    this.authService.sendRegistration(form.value.email).subscribe(
      (res) => {
        this.success = true;
        this.loading = false;
      },
      (error) => {
        this.failure = true;
        this.loading = false;
      }
    );
  }
}
