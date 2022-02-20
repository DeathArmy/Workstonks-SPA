import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KanbanTasksReport, UsersReport, YearReport } from './../Models/Report';

@Injectable()
export class ReportService {
  private urlString: string = "https://workstonks.herokuapp.com/api/Report/";

  constructor(private http: HttpClient) {  }

  getKanbanTasksReport(dateFrom: Date, dateTo: Date) : Observable<Array<KanbanTasksReport>> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + `kanbanTasks?DateFrom=${dateFrom}&DateTo=${dateTo}`;
    return this.http.get<Array<KanbanTasksReport>>(tempUrl, header);
  }

  getUsersReport(dateFrom: Date, dateTo: Date) : Observable<Array<UsersReport>> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + `employees?DateFrom=${dateFrom.toDateString()}&DateTo=${dateTo.toDateString()}`;
    return this.http.get<Array<UsersReport>>(tempUrl, header);
  }

  getYearReport(year: number) : Observable<Array<YearReport>> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + `kanbanTaskYear?year=${year}`;
    return this.http.get<Array<YearReport>>(tempUrl, header);
  }
}
