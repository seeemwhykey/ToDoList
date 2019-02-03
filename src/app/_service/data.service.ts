import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ToDo } from '../_interface/todo';
import { CookieService } from 'angular2-cookie/services/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private serverUrl = 'http://localhost:8000';


  constructor(private _http: HttpClient, private cookieService: CookieService) {

   }

  // GET
  public getToDo(): Observable<ToDo[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'Bearer ' + this.cookieService.get('token')
      })
    };
    return this._http.get<ToDo[]>(`${this.serverUrl}/products`, httpOptions);
}

// POST
public postToDo(object: ToDo): Observable<ToDo> {
  console.log(this.cookieService.get('token'));
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded ; charset=UTF-8',
      'Authorization': 'Bearer ' + this.cookieService.get('token')
    })
  };
  return this._http.post<ToDo>(`${this.serverUrl}/products`, object, httpOptions);
}



// PATCH
public patchToDo(object: ToDo): Observable<ToDo> {
  console.log(object);
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ; charset=UTF-8',
      'Authorization': 'Bearer ' + this.cookieService.get('token')
    })
  };
  return this._http.patch<ToDo>(`${this.serverUrl}/products/${object._id}`, object, httpOptions);
}

// DELETE
public deleteToDo(object: ToDo): Observable<ToDo> {
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json ; charset=UTF-8',
      'Authorization': 'Bearer ' + this.cookieService.get('token')
    })
  };
  return this._http.delete<ToDo>(`${this.serverUrl}/products/${object._id}`, httpOptions);
}


  // LOGIN
  login(loginData) {
    this._http.post<any>(`${this.serverUrl}/user/login`, loginData)
    .subscribe(res => {
      console.log(res);
      this.cookieService.put('token', res.token, {
        domain: 'localhost', expires: '24h'
      });
    });
  }
}


