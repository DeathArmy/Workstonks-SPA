import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CalendarEntry, CalendarPlannedEntry, FreeTimeInfo } from '../Models/Calendar';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Jwt } from '../Models/Jwt';

@Injectable()
export class CalendarService {
    private urlString: string = "https://workstonks.herokuapp.com/api/Calendar/";

    constructor(private http: HttpClient) {  }

    postPlannedEntry(entry: CalendarPlannedEntry) : Observable<any> {
      let token = sessionStorage.getItem('token');
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      let tempUrl = this.urlString + 'entry';
      return this.http.post<any>(tempUrl, entry, header);
    }

    postEntry(entry: CalendarEntry) : Observable<any> {
      let token = sessionStorage.getItem('token');
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      const decoded = jwtDecode<JwtPayload>(token!);
      var jwtObject: Jwt = decoded as Jwt;

      entry.userId = jwtObject.nameid;

      let tempUrl = this.urlString + 'entry';
      return this.http.post<any>(tempUrl, entry, header);
    }

    getReservedTime(date: Date) {
      let token = sessionStorage.getItem('token');
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };
      let tempUrl = this.urlString + 'entries?DateFrom=' + new Date(date).toDateString() + '&DateTo=' + new Date(date).toDateString() + '&IsPlanned=true';
      return this.http.get<Array<FreeTimeInfo>>(tempUrl, header).toPromise();
    }

    getSavedTime(subtaskId: number) : Observable<Array<FreeTimeInfo>>{
      let token = sessionStorage.getItem('token');
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };
      let tempUrl = this.urlString + `entries?SubtaskId=${subtaskId}&IsPlanned=false`;
      return this.http.get<Array<FreeTimeInfo>>(tempUrl, header);
    }
}
