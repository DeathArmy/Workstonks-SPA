import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configResponse } from '../Helpers/configResponse';

@Injectable()
export class FormService {
  private urlString: string = "https://localhost:5001//api/CarService/";
  constructor(private http: HttpClient) {  }

  postForm(form: any) : Observable<configResponse>
  {
    let tempUrl = this.urlString + 'serviceRequest';
    console.log(JSON.stringify(form));
    return this.http.post<configResponse>(tempUrl, JSON.stringify(form));
  }
}
