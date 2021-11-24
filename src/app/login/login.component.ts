import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthServiceService } from '../service/auth-service.service';
import { UserServiceService } from '../service/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    formGroup : FormGroup;
    infoMessage : String;
    errorMessage : boolean = false;
    windowSpinner: boolean;

    @Output()
    isAuthenticated : boolean = false;

    constructor(
        private authService: AuthServiceService,
        private userService : UserServiceService,
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
                    localStorage.setItem ('token', result.body.token);
                    //console.log(localStorage.getItem('token'));
                    localStorage.setItem ('currentUser', this.formGroup.controls['username'].value);
                    this.authService.getLoggedInName.emit(localStorage.getItem('currentUser'));
                    this.userService.getUserByUsername(this.formGroup.controls['username'].value).subscribe(res => {
                        localStorage.setItem ('idUser', res.id);
                    });
                    this.windowSpinner = true;
                    setTimeout(() => { 
                        this.router.navigate(['menu'], {queryParams: { registered: 'true' } });
                    }, 2000);
                    
                } else {
                    this.authService.getLoggedInName.emit('Sign In');
                    //alert(result.message);
                }
            },
            error => {
                this.errorMessage = true;
            }
            );
        }
    }

    onWindowSpinner() {
        return this.windowSpinner;
    }

}
