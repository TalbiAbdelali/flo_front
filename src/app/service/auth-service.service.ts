import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http : HttpClient) { }

  login(data):Observable<any>{
    console.log('Call api...');

    let httpOptions = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      })
    };
    let contentHeader = new HttpHeaders({ "Content-Type":"application/json" });
    return this.http.post<any>('http://localhost:8080/login', data, { observe: 'response'});
  }

  /*getShopList():Observable<any>{
    return this.http.get<any>('http://localhost:8080/api/shoplist');
  }*/
}
