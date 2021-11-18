import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService {

  constructor(private router: Router, private authService : AuthServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.authService.isUserAuthenticated()) {
          if(this.authService.isAdmin()) {
            return true;
          } else {
            // not logged in so redirect to login page with the return url
            this.router.navigate(['/menu']);
            return false;
          }
        }
        return false;
  }
}
