import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { User } from '../model/user/user';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  data : any = {};

  isFormEnabled : boolean = false;

  constructor(private userService : UserServiceService) { }

  ngOnInit(): void {
    this.isFormEnabled = false;
    this.userService.getUserByUsername(localStorage.getItem('currentUser')).subscribe(res => {
      this.data = res;
      localStorage.setItem('idUser', this.data.id);
      console.log(this.data);
    });
  }

  setSaving(element, text){
    if(this.isFormEnabled) {
      this.isFormEnabled = false;
      element.textContent = "Edit";
      console.log(this.data); // call put request to api
      this.userService.editUser(this.data).subscribe(error => {
        console.log(error);
        
      });
    } else {
      this.isFormEnabled = true
      element.textContent = text;
    }
  }

}
