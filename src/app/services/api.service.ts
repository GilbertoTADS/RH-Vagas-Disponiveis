import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected readonly url_api: string = 'http://192.168.1.172:3006/api';

  constructor() { }

  protected getError(operation:string,data:any):any{
    catchError(this.handleError(operation,data))
  }
  private handleError(operation:string,result:any):any{
    return (error:any):Observable<any> => of(result as any);
  }
}
