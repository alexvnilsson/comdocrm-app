import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

import { environment } from 'environments';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isAuthenticated())
      return true;
    else {
      if (environment.production === true) {
      let stateUrlSnapshot = state.url;

      sessionStorage.setItem('auth:returnUrl', stateUrlSnapshot);

      this.authService.login();
      return false;
    }
  }
}
