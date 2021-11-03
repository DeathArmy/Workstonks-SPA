import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { formFieldsModel } from '../Models/formFields';

@Injectable()
export class FormService {
  private urlString: string = "https://workstonks.herokuapp.com/api/CarService/";
  constructor(private http: HttpClient) {  }

  postForm(form: any) : Observable<formFieldsModel>
  {
    let tempUrl = this.urlString + 'serviceRequest';
    return this.http.post<formFieldsModel>(tempUrl, form);
  }

  getForms() : Observable<Array<formFieldsModel>>
  {
    let tempUrl = this.urlString + 'serviceRequests';
    return this.http.get<Array<formFieldsModel>>(tempUrl);
  }

  deleteTicket(id: number) : Observable <any>
  {
    let tempUrl = this.urlString + 'serviceRequest?serviceRequestId=' + id ;
    return this.http.delete<any>(tempUrl);
  }
}
