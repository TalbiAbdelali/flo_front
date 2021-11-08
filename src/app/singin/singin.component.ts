import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';
import { catchError, first, map } from 'rxjs/operators';
import { ValidateEmailNotTaken } from '../Validators/email.validator';

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css']
})
export class SinginComponent implements OnInit {

  formGroup : FormGroup;

  infoMessage : String;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  get email() {
    return this.formGroup.get("email");
  }

  initForm(){
    this.formGroup = this.fb.group({
      username : ["",[Validators.required]],
      lastname : ["",[Validators.required]],
      email : ["",[Validators.required,Validators.email],[ValidateEmailNotTaken.createValidator(this.authService)]],
      password : ["", [Validators.required,Validators.minLength(6)]],
      confirmPassword: ["", [Validators.required]]
    });
  }

  signupProcess() {
    console.log(this.formGroup);
    if(this.formGroup.valid) {
      this.authService.signup(this.formGroup.value)
      .pipe(first())
      .subscribe(result => {
        console.log("signup.com",result);
          if(result.status === 201) {
              console.log("signup.com",result);
              this.infoMessage = "";
              this.router.navigate(['login'], {queryParams: { registered: 'true' } });
              //alert(result.body);
          } else {
              this.infoMessage = "Registration Fail! Please try again!"
          }
      })
    }
  }

  /*onKeypressEvent(event: any){
    console.log(event.target.value);
  }*/

}
