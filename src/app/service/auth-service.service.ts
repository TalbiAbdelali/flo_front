import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  url = environment.apiURL;

  isAutehnticated : boolean = false;

  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

  constructor(private http : HttpClient, private router : Router) { }

  login(user):Observable<any>{
    console.log('Call api...');
    return this.http.post<any>(this.url+'/login', user, { observe: 'response'});
  }

  signup(user){
    console.log('Call api...');
    return this.http.post<any>(this.url+'/api/signup', user, { observe: 'response'});

  }

  /**
   * Check if email already existe 
   * Warning : see if there is a resque of XSS attacks
   * @param email 
   */
  isEmaiIDExist(email):Observable<any>{
    console.log('Call api...');
    let params = new HttpParams().set("email",email);
    return this.http.get<any>(this.url+'/api/exist', { observe: 'response', params });
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }

  setAuthenticated(status: boolean){
    this.isAutehnticated = status;
  }

  private tokenNotExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return !((Math.floor((new Date).getTime() / 1000)) >= expiry);
  }

  isUserAuthenticated() {
    // get the token
    const token = this.getToken();
    // return a boolean indicating whether or not the token is expired
    return this.tokenNotExpired(token);
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  testGetWithToken():Observable<any>{
    console.log('Call api...');
    return this.http.get<any>(this.url+'/admin/api/user', { observe: 'response'});
  }
}
