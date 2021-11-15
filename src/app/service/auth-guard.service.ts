import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private authService : AuthServiceService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

        if (this.authService.isUserAuthenticated()) {
          return true;
        }
        // not logged in so redirect to login page with the return url
        console.log(this.router);
        this.router.navigate(['/login']);
        console.log(this.router);
        return false;
  }

  isAdmin() {
    let jwt = localStorage.getItem('token');

    let jwtData = jwt.split('.')[1]
    let decodedJwtJsonData = window.atob(jwtData)
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let role = decodedJwtData.authorities
                  .find(elem => elem.authority.split("_")[0]=== "ROLE")
                  .authority.split("_")[1];
    return role === "ADMIN";
  }
}