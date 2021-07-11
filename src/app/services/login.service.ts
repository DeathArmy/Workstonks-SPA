import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { loginResponse } from '../Helpers/loginResponse';


@Injectable()
export class LoginService {
  public token: any;
  private urlString: string = "https://workstonks.herokuapp.com/api/Auth/";

  constructor(private http: HttpClient) {  }

  postLogin(credentials: any): Observable<loginResponse>
  {
    let tempUrl = this.urlString + 'login';
    return this.http.post<loginResponse>(tempUrl, credentials);
  }
}


