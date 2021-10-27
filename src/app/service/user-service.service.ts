import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userUrls : string;

  constructor(private httpClient : HttpClient) {
    this.userUrls = 'http://localhost:8080/users';
  }

  public findAll() : Observable<User[]> {
    return this.httpClient.get<User[]>(this.userUrls);
  }

  public save(user : User) {
    return this.httpClient.post<User>(this.userUrls, user);
  }
}
