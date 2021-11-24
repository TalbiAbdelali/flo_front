import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { GlobalSearchService } from '../service/global-search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  userName: any;

  constructor(private authService : AuthServiceService, private router : Router, private globalSearchService : GlobalSearchService) { }

  ngOnInit(): void {
    this.authService.getLoggedInName.subscribe(name => this.changeName(name));
    if(!this.authService.isUserAuthenticated()) {
      localStorage.setItem ('currentUser', '');
      localStorage.setItem ('token', '');
      localStorage.setItem ('idUser', '');
      this.authService.getLoggedInName.emit('Login');
      this.router.navigate(['login']);
    }
  }

  private changeName(name: any): void {
    this.userName = name;
  }

  isAuthenticated(){
    if(this.authService.isUserAuthenticated()) {
      this.userName = localStorage.getItem('currentUser');
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.setItem ('currentUser', '');
    localStorage.setItem ('token', '');
    localStorage.setItem ('idUser', '');
    this.authService.getLoggedInName.emit('Login');
  }

  onShowProfil() {
    let idUser = localStorage.getItem('idUser');
    this.router.navigate(['profil'],{queryParams: { idUser: idUser } });
  }

  onInput(event: any){
    // this pushes the input value into the service's Observable.
    this.globalSearchService.searchTerm.next(event.target.value);
  }

}
