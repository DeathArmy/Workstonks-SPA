import { BasketItem } from './../../Models/BasketItem';
import { SubtaskNew, Subtask } from './../../Models/Subtask';
import { Comment } from './../../Models/Comment';
import { formFieldsModel } from 'src/app/Models/formFields';
import { Component, OnInit } from '@angular/core';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KanbanTaskDetails } from 'src/app/Models/KanbanTask';
import { FormService } from 'src/app/services/form.service';
import { MatSelectChange } from '@angular/material/select';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { PdfMaker } from 'src/app/services/pdfmaker.service';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Jwt } from '../../Models/Jwt';
import { CalendarService } from 'src/app/services/calendar.service';
import { CalendarEntry } from 'src/app/Models/Calendar';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  //progressBar config
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'buffer';
  value = 0;
  bufferValue = 0;

  taskId: number = 0;
  taskDetails = new KanbanTaskDetails;
  srInfo = new formFieldsModel;
  selectedValue: number[] = [];
  newSubtask = new SubtaskNew;
  manHourValue = '';
  manHourSum: number = 0;
  radioButtonChoose: 'true' | 'false' = 'false';
  commentList: Array<Comment> = [];
  newComment = new Comment;
  newBasketItem = new BasketItem;
  calendarEntryInfo = new CalendarEntry;
  basketItemsList: Array<BasketItem> = [];
  username: string = '';
  editMode: Array<boolean> = Array(50).fill(false);
  taskEditMode: boolean = false;
  reportingTimeMode: Array<boolean> = [];

  Statuses: Status[] = [
    {value: 0, viewValue: 'Do zrobienia'},
    {value: 1, viewValue: 'W toku'},
    {value: 2, viewValue: 'Zrobione'}
  ];

  TaskStatuses: Status[] = [
    {value: 0, viewValue: 'Nowe'},
    {value: 1, viewValue: 'Do zrobienia'},
    {value: 2, viewValue: 'W diagnostyce'},
    {value: 3, viewValue: 'W trakcie'},
    {value: 4, viewValue: 'Wstrzymane'},
    {value: 5, viewValue: 'Oczekuje na odbiór'}
  ];

   //temp Username list
   UserList: string[] = [
    'Administrator', 'Pracownik_1', 'Pracownik_2'
  ];

  measureUnitList: Status[] = [
    {value: 0, viewValue: 'litr'},
    {value: 1, viewValue: 'szt'},
    {value: 2, viewValue: 'kg'}
  ];

  selectedUser: string = 'Administrator';
  selectedMeasureUnit: number = 1;
  selectedTaskStatus: number = 0;

  constructor(private _ktService: kanbanTasksService, private router: Router, private routerData: ActivatedRoute, private _fromService: FormService, private _calendarService: CalendarService) {
    this.routerData.params.subscribe(params => {
      this.taskId = params['id'];
    });
    this.getKanbanTaskData();
  }

  ngOnInit(): void {
    setTimeout(() => {this.progressBarCalculations()}, 1000);
  }

  getKanbanTaskData() {
    this.reportingTimeMode = [];
    this._ktService.getKanbanTask(this.taskId).subscribe(response => {
      this.taskDetails = response;
      this.selectedTaskStatus = this.taskDetails.status;
      this.basketItemsList = this.taskDetails.basketItems;
      this.commentList = this.taskDetails.comments;
      this.commentList.reverse();
      for(let subtask of this.taskDetails.subtasks) {
        let temp = this.getSelectedViewValue(subtask)
        this.selectedValue.push(temp? temp : 0);
        this.reportingTimeMode.push(false);
      };
      this.getUsername();
    });
  }

  statusChanged(event: MatSelectChange, index: number) {
    this.taskDetails.subtasks[index].status = event.value;
    this._ktService.updateSubtask(this.taskDetails.subtasks[index]).subscribe(response => {
      console.log(response);
    });
    this.progressBarCalculations();
  }

  TaskStatusChanged(event: MatSelectChange) {
    this.taskDetails.status = event.value;
    this._ktService.updateKanbanTask(this.taskDetails).subscribe(response => {
      console.log(response);
    });
  }

  // caseOwnerChanged(event: MatSelectChange) {

  // }

  progressBarCalculations() {
    this.bufferValue = 0;
    this.value = 0;
    this.manHourSum = 0;
    for(let subtask of this.taskDetails.subtasks) {
      this.manHourSum += subtask.manHour? subtask.manHour : 0;
      if (subtask.status == 1) this.bufferValue += subtask.manHour? subtask.manHour : 0;
      else if (subtask.status == 2) this.value += subtask.manHour? subtask.manHour : 0;
    }
    this.bufferValue = (1 - this.bufferValue / this.manHourSum) * 100;
    this.value = (this.value / this.manHourSum) * 100;
  }

  getSelectedViewValue(index: Subtask) {
    return this.Statuses.find(i => i.value == index.status)?.value;
  }

  addNewSubtask() {
    this.newSubtask.kanbanTaskId = this.taskDetails.id;
    this.newSubtask.manHour = parseFloat(this.manHourValue);
    let temp = new Subtask;
    this._ktService.addSubtask(this.newSubtask).subscribe(response => {
      temp.id = response;
    });
    temp.manHour = this.newSubtask.manHour;
    temp.name = this.newSubtask.name;
    this.manHourValue = '';
    this.selectedValue.push(0);
    this.taskDetails.subtasks.push(temp);
    this.newSubtask = new SubtaskNew;
    this.progressBarCalculations();
  }

  deleteSubtask(index: number) {
    let id = this.taskDetails.subtasks[index].id;
    this._ktService.deleteSubtask(id? id : 0).subscribe(response => {
      console.log(response);
    });
    this.selectedValue.splice(index, 1);
    this.taskDetails.subtasks.splice(index, 1);
    this.progressBarCalculations();
  }

  subtaskLogTime(index: number) {
    this.reportingTimeMode[index] = !this.reportingTimeMode[index];
  }

  saveTime(index: number) {
    this.calendarEntryInfo.date = new Date();
    this.calendarEntryInfo.subtaskId = this.taskDetails.subtasks[index].id;
    this._calendarService.postEntry(this.calendarEntryInfo).subscribe(respone => {
      this.calendarEntryInfo = new CalendarEntry;
      this.reportingTimeMode[index] = false;
    },
    error => {
      console.log(error);
    }
    )
  }

  postComment() {
    if (this.radioButtonChoose == 'true') this.newComment.isInnerComment = true;
    else this.newComment.isInnerComment = false;
    this.newComment.kanbanTaskId = this.taskId;
    this._ktService.postComment(this.newComment).subscribe(response => {
      this.getKanbanTaskData();
      this.newComment = new Comment();
    });
  }

  deleteComment(id: number) {
    this._ktService.deleteComment(this.commentList[id].id!).subscribe(response => {
      this.getKanbanTaskData();
    });
  }

  saveComment(id: number) {
    this._ktService.editComment(this.commentList[id]).subscribe(response => {
      this.getKanbanTaskData();
    });
  }

  getUsername() {
    const token: string  = sessionStorage.getItem('token')!;
    const decoded = jwtDecode<JwtPayload>(token);
    var jwtObject: Jwt = decoded as Jwt;

    this.username = jwtObject.unique_name?.toString()!;
  }

  createPdf() {
    var pdfMaker = new PdfMaker();
    if (this.taskDetails.protocolNumber == undefined) {
      this._ktService.getProtocolNumber(this.taskDetails.id!).subscribe(response => {
        this.taskDetails.protocolNumber = response;
        pdfMaker.CollectionProtokol(this.taskDetails);
      },
      error => {
        console.log(error);
      });
    }
    else {
      pdfMaker.CollectionProtokol(this.taskDetails);
    }    
  }

  editTask() {
    this.taskEditMode = true;
    this._ktService.updateKanbanTask(this.taskDetails).subscribe(respone => {
      console.log(respone);
    },
    (error) => {
      console.log(error);
    });
  }

  saveEditedTask() {
    this.taskEditMode = false;
    this._ktService.updateKanbanTask(this.taskDetails).subscribe(response => {
      console.log(response);
    },
    (error) => {
      console.log(error);
    })
  }

  cancelEditTask() {
    this.taskEditMode = false;
  }

  addBasketItem() {
    this.newBasketItem.unitOfMeasure = this.selectedMeasureUnit;
    this.newBasketItem.kanbanTaskId = this.taskDetails.id;
    this.newBasketItem.dateOfAddedToCart = new Date();

    this._ktService.postBasketItem(this.newBasketItem).subscribe(response => {
      console.log(response);
      this.getKanbanTaskData();
      this.newBasketItem = new BasketItem();
    },
    (error) => {
      console.log(error);
    });
  }

  deleteBasketItem(id: number) {
    let idToDelete: number = this.basketItemsList[id].id!;
    this._ktService.deleteBasketItem(idToDelete).subscribe(response => {
      this.getKanbanTaskData();
    },
    (error) => {
      console.log(error);
    });
  }

  createInvoce() {
    var pdfMaker = new PdfMaker();
    pdfMaker.invoice(this.taskDetails);
  }

  closeTicket() {
    this.taskDetails.status = 6;
    this._ktService.updateKanbanTask(this.taskDetails).subscribe(response => {
      console.log(response);
      this.router.navigate(['employeeApp/kanban']);
    },
    error => {
      console.log(error);
    });
  }

  deletePhoto(photoId: number) {
    this._ktService.deletePhoto(photoId).subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }
}

interface Status {
  value: number;
  viewValue: string;
}
