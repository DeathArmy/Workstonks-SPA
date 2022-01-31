import { HttpClient, HttpHeaders } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
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

  // New = 0,
  // Accepted = 1,
  // Rejected = 2,
  // ClientRejection = 3

  getForms(state: number) : Observable<Array<formFieldsModel>>
  {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'serviceRequests?state=' + state;
    return this.http.get<Array<formFieldsModel>>(tempUrl, header);
  }

  deleteTicket(id: number) : Observable <any>
  {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'serviceRequest?serviceRequestId=' + id ;
    return this.http.delete<any>(tempUrl, header);
  }

  abondTicket(id: number) : Observable <any>
  {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'serviceRequest/reject?id=' + id ;
    return this.http.put<any>(tempUrl, null, header);
  }

  getSR(id: number) : Observable <formFieldsModel>
  {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'serviceRequest?id=' + id ;
    return this.http.get<formFieldsModel>(tempUrl, header);
  }
}
