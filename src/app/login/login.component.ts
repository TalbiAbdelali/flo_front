import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient
    ) { }

    ngOnInit() {
        sessionStorage.setItem('token', '');
    }

    login() {
        let url = 'http://localhost:8080/login';
        let result = this.http.post(url, {
            userName: this.model.username,
            password: this.model.password
        }).pipe(map(res => res)).subscribe(isValid => {
            if (isValid) {
                sessionStorage.setItem(
                  'token',
                  btoa(this.model.username + ':' + this.model.password)
                );
                this.router.navigate(['']);
            } else {
                alert("Authentication failed.");
            }
        });
    }

}
