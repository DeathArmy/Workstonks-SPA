import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { formFieldsModel } from '../Models/formFields';

@Injectable()
export class FormService {
  private urlString: string = "https://localhost:5001/api/CarService/";
  constructor(private http: HttpClient) {  }

  postForm(form: any) : Observable<formFieldsModel>
  {
    let tempUrl = this.urlString + 'serviceRequest';
    //console.log(JSON.stringify(form));
    return this.http.post<formFieldsModel>(tempUrl, form);
  }
}
