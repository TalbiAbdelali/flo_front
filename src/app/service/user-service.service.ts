import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = environment.apiURL;

  constructor(private http : HttpClient) {
  }

  public findAll() : Observable<User[]> {
    return this.http.get<User[]>(environment.apiURL+"/api/users");
  }

  /**
   * search for user by username
   * @param username 
   */
  public getUserByUsername(username){
    let params = new HttpParams().set("username", username);
    return this.http.get<User>(environment.apiURL+'/api/users/user', {params});
  }

  /**
   * search for a user by id
   * @param id 
   */
  public getUserById(id){
    return this.http.get<User>(environment.apiURL+'/api/users/user/'+id);
  }

  /**
   * edit user in DB
   * @param user => user object
   */
  public editUser(user:User) {
    return this.http.put<User>(environment.apiURL+'/api/users/'+localStorage.getItem('idUser'), user);
  }

  /**
   * Check if email already existe 
   * Warning : see if there is a resque of XSS attacks
   * @param email 
   */
  public isUsernameExist(email):Observable<any>{
    console.log('Call api...');
    let params = new HttpParams().set("email",email);
    return this.http.get<any>(this.url+'/api/usernameExist', { observe: 'response', params });
  }
}
