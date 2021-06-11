import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { servicePrice } from './../prices/prices.component'


@Injectable()
export class ConfigService {
  private urlString: string = "https://localhost:5001/api/ClientApp/";
  constructor(private http: HttpClient) {  }

  getConfig(componentName: string): Observable<configResponse>
  {
    return this.http.get<configResponse>(this.urlString + 'config?componentName=' + componentName);
  }
  //GET / POST / PUT:
  //home
  //prices
  //contact


  postConfig(config: any, name: string) : Observable<configResponse>
  {
    let conf: configResponse = new configResponse();
    conf.componentName = name;
    conf.data = JSON.stringify(config);
    let tempUrl = this.urlString + 'config';
    return this.http.post<configResponse>(tempUrl, conf);
  }



  //GET:
  //tracking

  //POST:
  //form

}

export class configResponse {
  id?: number;
  componentName?: string;
  data?: string;
  isActive?: boolean;
}
