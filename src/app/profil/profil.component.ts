import { Component, OnInit } from '@angular/core';
import { User } from '../model/user/user';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  data : any = {};

  constructor(private userService : UserServiceService) { }

  ngOnInit(): void {
    this.userService.getUserByUsername(localStorage.getItem('currentUser')).subscribe(res => {
      console.log(res);
      
      this.data = res;  
      console.log(this.data.username);
    });
  }

}
