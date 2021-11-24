import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userUrls : string;

  constructor(private http : HttpClient) {
  }

  public findAll() : Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL+"/api/users");
  }

  public getUserByUsername(username){
    let params = new HttpParams().set("username", username);
    return this.http.get<User>(environment.apiURL+'/api/users/user', {params});
  }

  public getUserById(id){
    return this.http.get<User>(environment.apiURL+'/api/users/user/'+id);
  }

  public editUser(user:User) {
    return this.http.put<User>(environment.apiURL+'/api/users/'+localStorage.getItem('idUser'), user);
  }
}
