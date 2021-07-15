import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { ViaCEP } from './../../models/viaCep';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  constructor( private http:HttpClient) { }

  getAddressByCep(cep:string):Observable<ViaCEP>{
    return this.http.get<ViaCEP>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
