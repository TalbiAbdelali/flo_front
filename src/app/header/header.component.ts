import { Component, Input, OnInit } from '@angular/core';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  userName: any;

  constructor(private authService : AuthServiceService) { }

  ngOnInit(): void {
    this.authService.getLoggedInName.subscribe(name => this.changeName(name));
  }

  private changeName(name: any): void {
    this.userName = name;
  }

  isAuthenticated(){
    if(localStorage.getItem('currentUser')!= '') {
      this.userName = localStorage.getItem('currentUser');
      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.setItem ('currentUser', '');
    localStorage.setItem ('token', '');
    this.authService.getLoggedInName.emit('Login');
  }

}
