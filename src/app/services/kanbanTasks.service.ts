import { Subtask } from './../Models/Subtask';
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

  updateSubtask(subtask: Subtask) : Observable<Subtask> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'subtask';
    return this.http.put<Subtask>(tempUrl, subtask);
  }

  addSubtask(subtask: Subtask) : Observable<number>{
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'subtask';
    return this.http.post<number>(tempUrl, subtask);
  }

  deleteSubtask(id: number) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('key');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'subtask?subtaskId=' + id;
    return this.http.delete<any>(tempUrl);
  }
}
