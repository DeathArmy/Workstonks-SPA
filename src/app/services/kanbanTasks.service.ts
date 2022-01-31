import { ExtendedBasketItem, BasketItem } from './../Models/BasketItem';
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
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'kanbanTask';
    return this.http.post<KanbanTask>(tempUrl, task, header);
  }

  getKanbanTasks() : Observable<Array<KanbanTask>> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'kanbanTasks';
    return this.http.get<Array<KanbanTask>>(tempUrl, header);
  }

  getKanbanTask(id: number) : Observable<KanbanTaskDetails> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'kanbanTask?id=' + id;
    return this.http.get<KanbanTaskDetails>(tempUrl, header);
  }

  updateKanbanTask(task: KanbanTask) : Observable<any> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'kanbanTask';
    return this.http.put<any>(tempUrl, task, header);
  }

  updateSubtask(subtask: Subtask) : Observable<Subtask> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'subtask';
    return this.http.put<Subtask>(tempUrl, subtask, header);
  }

  addSubtask(subtask: Subtask) : Observable<number>{
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'subtask';
    return this.http.post<number>(tempUrl, subtask, header);
  }

  deleteSubtask(id: number) : Observable<any> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'subtask?subtaskId=' + id;
    return this.http.delete<any>(tempUrl, header);
  }

  getComments(id: number) : Observable<Array<Comment>> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'comments?kanbanTaskId=' + id;
    return this.http.get<Array<Comment>>(tempUrl, header);
  }

  postComment(comment: Comment) : Observable<any> {
    let token = sessionStorage.getItem('token')!;
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };
    const decoded = jwtDecode<JwtPayload>(token);
    var jwtObject: Jwt = decoded as Jwt;

    comment.userId = jwtObject.nameid;

    let tempUrl = this.urlString + 'comments';
    return this.http.post(tempUrl, comment, header);
  }

  deleteComment(id: number) : Observable<any> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'comments?kanbanCommentId=' + id;
    return this.http.delete(tempUrl, header);
  }

  editComment(comment: Comment) : Observable<any> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'comments';
    return this.http.put(tempUrl, comment, header);
  }

  postBasketItem(item: BasketItem) : Observable<any> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'basketItem';
    return this.http.post(tempUrl, item, header);
  }

  putBasketItem(item: BasketItem) : Observable<BasketItem> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'basketItem';
    return this.http.put(tempUrl, item, header);
  }

  deleteBasketItem(id: number) : Observable<any> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'basketItem?basketItemId=' + id ;
    return this.http.delete(tempUrl, header);
  }

  getUncompletedBasketItems() : Observable<Array<ExtendedBasketItem>> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'basketItems/uncompleted';
    return this.http.get<Array<ExtendedBasketItem>>(tempUrl, header);
  }
}
