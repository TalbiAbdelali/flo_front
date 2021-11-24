import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user/user';
import { GlobalSearchService } from '../service/global-search.service';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : User[];

  constructor(private userService : UserServiceService, private router : Router, private globalSearchService : GlobalSearchService) { }

  ngOnInit(): void {
    let oldList: any;
    this.userService.findAll().subscribe(
      res => {
        console.log(res);
        this.users = res;
        oldList = res;
      },
      err => {
        console.log(err);
    });

    this.globalSearchService.searchTerm.subscribe((newValue: string) => {
      // this is where you would apply your existing filtering.
      //console.log(newValue);
      
      if(this.users) {
        this.users = this.users.filter((user) => user.lastname.includes(newValue));
      } 
      
      if(!newValue) {
        console.log(oldList);
        this.users = oldList;
      }
      
      //console.log(this.users);

      });
  }

  onEditProfil(idUser) {
    if(idUser) {
      this.router.navigate(['profil'],{queryParams: { idUser: idUser } });
    }
  }

}
