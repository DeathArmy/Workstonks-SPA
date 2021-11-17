import { KanbanTask, KanbanTaskDetails } from './../Models/KanbanTask';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class kanbanTasksService {
  private urlString: string = "https://workstonks.herokuapp.com/api/Kanban/";

  constructor(private http: HttpClient) {  }

  createKanbanTask(task: KanbanTask) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'kanbanTask';
    return this.http.post<KanbanTask>(tempUrl, task);
  }

  getKanbanTasks() : Observable<Array<KanbanTask>> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'kanbanTasks';
    return this.http.get<Array<KanbanTask>>(tempUrl);
  }

  getKanbanTask(id: number) : Observable<KanbanTaskDetails> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'kanbanTask?id=' + id;
    return this.http.get<KanbanTaskDetails>(tempUrl);
  }

  updateKanbanTask(task: KanbanTask) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'kanbanTask';
    return this.http.put<any>(tempUrl, task);
  }
}
