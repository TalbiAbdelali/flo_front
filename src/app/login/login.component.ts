import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formGroup : FormGroup;
  infoMessage : String;

    constructor(
        private authService: AuthServiceService,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) { }

    ngOnInit() {
        //sessionStorage.setItem('token', '');
        this.initForm();
        this.route.queryParams
        .subscribe(params => {
          if(params.registered !== undefined && params.registered === 'true') {
              this.infoMessage = 'Registration Successful! Please Login!';
              
          }
        });
    }

    initForm(){
        this.formGroup = new FormGroup({
            username : new FormControl('',[Validators.required]),
            password : new FormControl('', [Validators.required])
        });
    }

    loginProcess() {
        if(this.formGroup.valid) {
            this.authService.login(this.formGroup.value).subscribe(result => {
                
                if(result.status === 200) {
                    console.log("login.com",result);
                    //alert(result.status + " : " + result.statusText);
                    alert("Token: " + result.body);
                } else {
                    alert(result.message);
                }
            })
        }
    }

}
