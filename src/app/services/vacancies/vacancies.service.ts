import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vacancies } from './../../models/vacancies'
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class VacanciesService extends ApiService {

  constructor(private http:HttpClient) { 
    super();
  }
  getVacancies():Observable<Vacancies[]>{
    return this.http.post<Vacancies[]>(`${this.url_api}/vacancie`,{});
  }
  subscribeMe( idUser:string, idVacancie:string ):Observable<Vacancies[]>{
    const subscribe = { idUser, idVacancie };
    return this.http.post<Vacancies[]>(`${this.url_api}/vacancie/subscribe`,{ subscribe });
  }
  getMyInscriptions(idUser:string):Observable<Vacancies[]>{
    return this.http.get<Vacancies[]>(`${this.url_api}/vacancie/${idUser}`,);
  }
  deleteMyInscription(idUser:string,idVacancie:string):Observable<Vacancies[]>|any{
    return this.http.delete<Vacancies[]|any>(`${this.url_api}/vacancie/${idUser}/${idVacancie}`);
  }
  
}
