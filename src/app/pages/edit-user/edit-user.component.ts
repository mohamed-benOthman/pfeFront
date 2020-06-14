import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/services/data.service';
import { User } from 'src/app/models /user';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  host: {
    '(window:resize)': 'onWindowResize($event)',
  },
})
export class EditUserComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    private router: Router
  ) {}
  user: User;
  width: number = window.innerWidth;
  optimalWidth = 1300;
  onWindowResize(event) {
    this.width = event.target.innerWidth;
  }

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    this.authService.getCordonnees(email).subscribe((res) => {
      const userAux = res;
      this.user = new User(
        userAux.email,
        userAux.cin,
        userAux.nom,
        userAux.prenom,
        userAux.role
      );
      this.user.id = userAux.id;
    });
  }
  close() {
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    if (form.value.password1 != '') { this.user.password = form.value.password1; } else { this.user.password = ''; }
    console.log(this.user);
    this.authService.editUser(this.user.id, this.user).subscribe((res) => {
      console.log(res);
      this.authService.logout();

      this.router.navigate(['login']);

      this.dialogRef.close();
    });
  }
}
