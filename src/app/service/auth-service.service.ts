import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http : HttpClient, private router : Router) { }

  login(data):Observable<any>{
    console.log('Call api...');
    let contentHeader = new HttpHeaders({ "Content-Type":"application/json" });
    return this.http.post<any>('http://localhost:8080/login', data, { observe: 'response'});
  }

  signup(data){
    console.log('Call api...');
    return this.http.post<any>('http://localhost:8080/api/signup', data, { observe: 'response'});

  }

  isEmaiIDExist(email):Observable<any>{
    console.log('Call api...');
    let params = new HttpParams().set("email",email);
    let res = this.http.get<any>('http://localhost:8080/api/exist', { observe: 'response', params });
    console.log("GET RESPONSE Result : ");
    console.log(res);
    return res;
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }

}
