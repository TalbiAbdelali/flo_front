import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  data : any = {};

  isFormEnabled : boolean = false;

  editView : boolean = false;

  constructor(private userService : UserServiceService, private router : Router) { }

  ngOnInit(): void {
    this.isFormEnabled = false;
    let idUser = this.router.url.split('?idUser=')[1];
    this.userService.getUserById(idUser).subscribe(res => {
      this.data = res;
      //localStorage.setItem('idUser', this.data.id);
      console.log(this.data);
    });
    
  }

  setSaving(){
    this.isFormEnabled = false;
    console.log(this.data); // call put request to api
    this.editView = false;
    /*this.userService.editUser(this.data).subscribe(error => {
      console.log(error);
    });*/
  }

  showEditView() {
    this.editView = true;
  }

}
