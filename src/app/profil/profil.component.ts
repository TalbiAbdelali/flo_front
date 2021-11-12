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

  isFormEnabled : boolean = false;

  constructor(private userService : UserServiceService) { }

  ngOnInit(): void {
    this.isFormEnabled = false;
    this.userService.getUserByUsername(localStorage.getItem('currentUser')).subscribe(res => {
      this.data = res;
      console.log(this.data);
      localStorage.setItem('idUser', this.data.id);
    });
  }

  setSaving(element, text){
    if(this.isFormEnabled) {
      this.isFormEnabled = false;
      element.textContent = "Edit";
      console.log(this.data); // call put request to api
    } else {
      this.isFormEnabled = true
      element.textContent = text;
    }
    //element.disabled = true;
  }

}
