import { Component, OnInit } from '@angular/core';
import { User } from '../model/user/user';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : User[];

  constructor(private userService : UserServiceService) { }

  ngOnInit(): void {
    this.userService.findAll().subscribe(
      res => {
        console.log(res);
        this.users = res;
      },
      err => {
        console.log(err);
        
      });
  }

}
