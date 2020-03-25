import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService} from  '../../services/auth.service';
import {Router, Routes} from '@angular/router';

import { User } from 'src/app/models /user';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading = false;
  isWrong = false;
  user: User;
  email: string;
  constructor(private authService: AuthService, private router: Router, private dataService: DataService) {

  }
  ngOnInit() {
  }
  ngOnDestroy() {
  }
  onSubmit(form: NgForm) {
    this.email = form.value.email;
    this.isLoading = true;
    this.isWrong = false;
    this.authService.loginUser(this.email, form.value.password)
    .subscribe((responseData: any) => {
      console.log(responseData);
      localStorage.setItem('token', responseData.token);
      localStorage.setItem('refresh_token', responseData.refresh_token);
      localStorage.setItem('email', this.email);

      this.isLoading = false;

      if (localStorage.getItem('token') != null) {
        this.authService.getCordonnees(localStorage.getItem('email'))
        .subscribe((res: any) => {
          localStorage.setItem('cin', res.cin);
          localStorage.setItem('nom', res.nom);
          localStorage.setItem('prenom', res.prenom);

          this.user = new User(localStorage.getItem('email'),
          localStorage.getItem('cin'),
          localStorage.getItem('nom'),
          localStorage.getItem('prenom'),
          localStorage.getItem('token'),
          localStorage.getItem('refresh_token'));
          this.router.navigate(['dashboard']);
          this.dataService.changeUser(this.user);


        }
        ); }

    },
    err => {this.isWrong = true; this.isLoading = false; });





    }


  }


