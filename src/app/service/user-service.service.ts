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
    return this.http.get<User[]>(environment.apiURL);
  }

  public getUserByUsername(username){
    let params = new HttpParams().set("username", username);
    return this.http.get<User>(environment.apiURL+'/api/user', {params});
  }

  public editUser(user:User) {
    console.log("edituser");
    let url = environment.apiURL+'/api/user/'+localStorage.getItem('idUser');
    console.warn(url);
    return this.http.put<User>(environment.apiURL+'/api/user/'+localStorage.getItem('idUser'), user);
  }
}
