import { CarRepairHistory } from 'src/app/Models/CarRepairHistory';
import { ExtendedBasketItem, BasketItem } from './../Models/BasketItem';
import { Subtask } from './../Models/Subtask';
import { KanbanTask, KanbanTaskDetails } from './../Models/KanbanTask';
import { Comment } from './../Models/Comment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Jwt } from '../Models/Jwt';
import { Customer } from '../Models/Customer';

@Injectable()
export class kanbanTasksService {
  private urlString: string = "https://workstonks.herokuapp.com/api/Kanban/";

  constructor(private http: HttpClient) {  }

  createKanbanTask(task: KanbanTaskDetails) : Observable<number> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    task.dateOfPlannedRealization?.setHours(1);
    task.dateOfCarDelivery?.setHours(1);

    let tempUrl = this.urlString + 'kanbanTask';
    console.log(task);
    return this.http.post<number>(tempUrl, task, header);
  }

  getKanbanTasks(todayDate: Date, exactlyDate?: Date) : Observable<Array<KanbanTask>> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };
    let tempUrl = this.urlString + 'kanbanTasks';
    if (todayDate && exactlyDate == undefined)
    {
      tempUrl += "?DateFrom" + new Date("2021-01-01");
      tempUrl += "&DateTo=" + todayDate.toDateString();
    }
    if (exactlyDate)
    {
      tempUrl += "?DateExactly=" + exactlyDate.toDateString();
    }

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

  updateKanbanTask(task: KanbanTaskDetails) : Observable<any> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    if(!task.customer) {
      let tempCustomer = new Customer();
      tempCustomer.name = "Test";
      tempCustomer.surname = "Test";
      tempCustomer.email = "test@test.pl";
      tempCustomer.consentToTheProcessingOfPersonalData = true;
      tempCustomer.phoneNumber = '600100100';
      task.customer = tempCustomer;
    }
    else if(task.customer.consentToTheProcessingOfPersonalData == false) task.customer.consentToTheProcessingOfPersonalData = true;

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

  getHistory(vin: string) : Observable<Array<CarRepairHistory>> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'kanbanTasks?vin=' + vin;
    return this.http.get<Array<CarRepairHistory>>(tempUrl, header);
  }

  getProtocolNumber(kanbanTaskId: number) : Observable<string> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + 'kanbanTask/protocol?kanbanTaskId=' + kanbanTaskId;
    return this.http.put<string>(tempUrl, '', header);
  }

  getTicketForClient(vin: string, protocolNumber: string) : Observable<KanbanTaskDetails> {
    let tempUrl = this.urlString + `kanbanTask?VIN=${vin}&ProtocolNumber=${protocolNumber}`;
    return this.http.get<KanbanTaskDetails>(tempUrl);
  }

  deletePhoto(photoId: number) : Observable<any> {
    let token = sessionStorage.getItem('token');
    var header = {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
    };

    let tempUrl = this.urlString + `kanbanTask/photo?photoId=${photoId}`;
    return this.http.delete<any>(tempUrl, header);
  }
}
