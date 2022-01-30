import { BasketItem } from './../Models/BasketItem';
import { Subtask } from './../Models/Subtask';
import { KanbanTask, KanbanTaskDetails } from './../Models/KanbanTask';
import { Comment } from './../Models/Comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Jwt } from '../Models/Jwt';

@Injectable()
export class kanbanTasksService {
  private urlString: string = "https://workstonks.herokuapp.com/api/Kanban/";

  constructor(private http: HttpClient) {  }

  createKanbanTask(task: KanbanTask) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'kanbanTask';
    return this.http.post<KanbanTask>(tempUrl, task);
  }

  getKanbanTasks() : Observable<Array<KanbanTask>> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'kanbanTasks';
    return this.http.get<Array<KanbanTask>>(tempUrl);
  }

  getKanbanTask(id: number) : Observable<KanbanTaskDetails> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'kanbanTask?id=' + id;
    return this.http.get<KanbanTaskDetails>(tempUrl);
  }

  updateKanbanTask(task: KanbanTask) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'kanbanTask';
    return this.http.put<any>(tempUrl, task);
  }

  updateSubtask(subtask: Subtask) : Observable<Subtask> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'subtask';
    return this.http.put<Subtask>(tempUrl, subtask);
  }

  addSubtask(subtask: Subtask) : Observable<number>{
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'subtask';
    return this.http.post<number>(tempUrl, subtask);
  }

  deleteSubtask(id: number) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'subtask?subtaskId=' + id;
    return this.http.delete<any>(tempUrl);
  }

  getComments(id: number) : Observable<Array<Comment>> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'comments?kanbanTaskId=' + id;
    return this.http.get<Array<Comment>>(tempUrl);
  }

  postComment(comment: Comment) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    const token: string  = sessionStorage.getItem('token')!;
    httpHeaders = httpHeaders.append('Authorization', token);
    const decoded = jwtDecode<JwtPayload>(token);
    var jwtObject: Jwt = decoded as Jwt;

    comment.userId = jwtObject.nameid;

    let tempUrl = this.urlString + 'comments';
    return this.http.post(tempUrl, comment);
  }

  deleteComment(id: number) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'comments?kanbanCommentId=' + id;
    return this.http.delete(tempUrl);
  }

  editComment(comment: Comment) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    let token = sessionStorage.getItem('token');
    httpHeaders = httpHeaders.append('Authorization', token? token : '');

    let tempUrl = this.urlString + 'comments';
    return this.http.put(tempUrl, comment);
  }

  postBasketItem(item: BasketItem) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    const token: string  = sessionStorage.getItem('token')!;
    httpHeaders = httpHeaders.append('Authorization', token);

    let tempUrl = this.urlString + 'basketItem';
    return this.http.post(tempUrl, item);
  }

  putBasketItem(item: BasketItem) : Observable<BasketItem> {
    let httpHeaders = new HttpHeaders();
    const token: string  = sessionStorage.getItem('token')!;
    httpHeaders = httpHeaders.append('Authorization', token);

    let tempUrl = this.urlString + 'basketItem';
    return this.http.put(tempUrl, item);
  }

  deleteBasketItem(id: number) : Observable<any> {
    let httpHeaders = new HttpHeaders();
    const token: string  = sessionStorage.getItem('token')!;
    httpHeaders = httpHeaders.append('Authorization', token);

    let tempUrl = this.urlString + 'basketItem?basketItemId=' + id ;
    return this.http.delete(tempUrl);
  }
}
