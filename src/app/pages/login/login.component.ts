import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, Routes } from '@angular/router';

import { User } from 'src/app/models /user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: String;
  user: User;
  email: string;
  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService
  ) {}
  ngOnInit() {}
  ngOnDestroy() {}
  onSubmit(form: NgForm) {
    this.email = form.value.email;
    this.isLoading = true;

    this.authService.loginUser(this.email, form.value.password).subscribe(
      (responseData: any) => {
        console.log(responseData);
        localStorage.setItem('token', responseData.token);
        localStorage.setItem('refresh_token', responseData.refresh_token);

        if (localStorage.getItem('token') != null) {
          this.authService.getCordonnees(this.email).subscribe((res: any) => {
            localStorage.setItem('role', res.role);
            this.user = res;
            this.dataService.changeUser(this.user);
            this.router.navigate(['dashboard']);
            this.isLoading = false;
          });
        }
      },
      (err) => {
        this.error = err;

        this.isLoading = false;
      }
    );
  }
}
