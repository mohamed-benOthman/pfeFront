import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  ActivatedRoute,
  Router,
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class ResetPasswordResolverService implements Resolve<any> {
  constructor(private router: Router, private authService: AuthService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const token = route.params.token;
    this.authService.checkToken(token).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => this.router.navigate(["notFound404"])
    );
  }
}
