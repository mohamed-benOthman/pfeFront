import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {
  Location,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { Router, Routes } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { User } from '../../models /user';
import { MatDialog } from '@angular/material/dialog';
import { EditUserComponent } from 'src/app/pages/edit-user/edit-user.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public focus;
  public listTitles: any[];
  public location: Location;
  public nom: String;
  public prenom: String;
  public nomComplet: String;
  public user: User;
  constructor(
    location: Location,
    private element: ElementRef,
    private router: Router,
    private dataService: DataService,
    private authService: AuthService,
    private dialog: MatDialog
  ) {
    this.location = location;
    // this.dataService.currentUser.subscribe((user) => (this.user = user));
    // this.user = this.dataService.getUser();
    const email = localStorage.getItem('email');
    this.authService.getCordonnees(email).subscribe((res) => {
      this.user = res;
      this.nom = this.user.nom;
      this.prenom = this.user.prenom;
      this.nomComplet = this.nom + ' ' + this.prenom;
    });
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter((listTitle) => listTitle);
  }
  logout() {
    this.router.navigate(['login']);
    // this.router.navigateByUrl('/login');
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('email');
    localStorage.removeItem('cin');
    localStorage.removeItem('nom');
    localStorage.removeItem('prenom');
  }
  openProfileDialog() {
    const dialogRef = this.dialog.open(EditUserComponent);
  }

  ngAfterViewInit() {}

  getTitle() {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }

    for (let item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
}
