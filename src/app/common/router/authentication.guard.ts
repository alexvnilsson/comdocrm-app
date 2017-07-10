import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRoute, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private authService: AuthenticationService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isAuthenticated())
            return true;
        else {
            if (localStorage.getItem('auth:returnUrl') == null)
                localStorage.setItem('auth:returnUrl', state.url);

            this.authService.login();
            return false;
        }
    }
}