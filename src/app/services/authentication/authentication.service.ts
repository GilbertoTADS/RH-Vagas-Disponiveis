import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

import { User } from '../../models/user';
import { ApiService } from './../api.service';
import { UserDbFull } from 'src/app/models/user-bd-full';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ApiService {

  constructor(
    private http:HttpClient
    ) { 
      super()
    } 
  login(email:string,password:string):Observable<UserDbFull[]>{ 
    const body = { email,password }
    console.log(body)
    return this.http.post<UserDbFull[]>(`${this.url_api}/user/login`, body);
  }
}
