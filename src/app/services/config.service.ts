import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { configResponse } from '../Helpers/configResponse';


@Injectable()
export class ConfigService {
  private urlString: string = "https://workstonks.herokuapp.com/api/ClientApp/";
  constructor(private http: HttpClient) {  }

  getConfig(componentName: string): Observable<configResponse>
  {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    return this.http.get<configResponse>(this.urlString + 'config?componentName=' + componentName);
  }

  postConfig(config: any, name: string) : Observable<configResponse>
  {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let conf: configResponse = new configResponse();
    conf.componentName = name;
    conf.data = JSON.stringify(config);
    let tempUrl = this.urlString + 'config';
    return this.http.post<configResponse>(tempUrl, conf);
  }

  putConfig(config: any, name: string) : Observable<configResponse>
  {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let conf: configResponse = new configResponse();
    conf.componentName = name;
    conf.data = JSON.stringify(config);
    let tempUrl = this.urlString + 'config';
    return this.http.put<configResponse>(tempUrl, conf);
  }
}
