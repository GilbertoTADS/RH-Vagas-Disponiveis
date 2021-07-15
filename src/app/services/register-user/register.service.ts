import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserDbFull } from 'src/app/models/user-bd-full';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends ApiService{

  constructor(private http:HttpClient) { 
    super()
  }
  registerUser(user:User):Observable<UserDbFull[]>{
    return this.http.post<UserDbFull[]>(`${this.url_api}/user`, { user });
  }
  getUser(identifier:string):Observable<UserDbFull[]>{
    return this.http.get<UserDbFull[]>(`${this.url_api}/user/${identifier}`);
  }
  updateUser(IDUSER:string, user:User):Observable<UserDbFull[]>{
    const userDb = this.http.put<UserDbFull[]>(`${this.url_api}/user`, { IDUSER, user });
    return userDb;
  }
}
