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
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'serviceRequests?state=' + state;
    return this.http.get<Array<formFieldsModel>>(tempUrl);
  }

  deleteTicket(id: number) : Observable <any>
  {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'serviceRequest?serviceRequestId=' + id ;
    return this.http.delete<any>(tempUrl);
  }

  abondTicket(id: number) : Observable <any>
  {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'serviceRequest/reject?id=' + id ;
    return this.http.put<any>(tempUrl, null);
  }

  getSR(id: number) : Observable <formFieldsModel>
  {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'serviceRequest?id=' + id ;
    return this.http.get<formFieldsModel>(tempUrl);
  }
}
