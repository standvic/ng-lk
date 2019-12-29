import { Injectable } from '@angular/core';
import { 
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}    from '@angular/router';
import { AuthService }      from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
    
    constructor(private authService: AuthService, private router: Router) {
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let url: string = state.url;
        //console.log(state.url);
        //console.log(this.checkLogin(url));
        //console.log(this.authService.isLoggedIn);
        return this.checkLogin(url);
    }
    
    checkLogin(url: string): boolean {
        if (this.authService.isLoggedIn) {
            return true; 
        }
        this.authService.redirectUrl = url; // Store the attempted URL for redirecting
        this.router.navigate(['signIn']);  // Navigate to the login page with extras
        return false;
    }
}