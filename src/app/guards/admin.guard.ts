import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {}
  canActivate(): boolean {
    if (this.auth.isAdmin() === true) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
