import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { UserServiceService } from '../service/user-service.service';
import { ValidateEmailNotTaken } from '../Validators/email.validator';
import { ValidateUsernameNotTaken } from '../Validators/username.validator';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  data : any = {};

  isFormEnabled : boolean = false;

  editView : boolean = false;

  formGroup : FormGroup;

  constructor(private userService : UserServiceService, private authService : AuthServiceService, private router : Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.isFormEnabled = false;
    this.initForm();
    let idUser = this.router.url.split('?idUser=')[1];
    this.userService.getUserById(idUser).subscribe(res => {
      this.data = res;
      //localStorage.setItem('idUser', this.data.id);
      console.log(this.data);
    });
  }

  initForm(){
    this.formGroup = this.fb.group({
      username : ["",[Validators.required],[ValidateUsernameNotTaken.createValidator(this.userService)]],
      lastname : ["",[Validators.required]],
      email : ["",[Validators.required,Validators.email],[ValidateEmailNotTaken.createValidator(this.authService)]],
      password : ["", [Validators.required,Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]]
    });
  }

  updateUser(){
    this.isFormEnabled = false;
    console.log(this.data); // call put request to api
    this.editView = false;
    this.userService.editUser(this.data).subscribe(error => {
      console.log(error);
    });
  }

  showEditView() {
    this.editView = true;
  }

  fileChangeEvent(e: File[]) {
    if(e && e.length >= 1) {
      console.log(e)
      this.data.urlPhoto = "assets/" + e[0].name;
    } else {
      alert("You can upload one photo");
    }
    
  }

}
