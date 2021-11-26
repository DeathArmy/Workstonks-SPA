import { SubtaskNew, Subtask } from './../../Models/Subtask';
import { formFieldsModel } from 'src/app/Models/formFields';
import { Component, OnInit } from '@angular/core';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KanbanTaskDetails } from 'src/app/Models/KanbanTask';
import { FormService } from 'src/app/services/form.service';
import { Customer } from 'src/app/Models/Customer';
import { MatSelectChange } from '@angular/material/select';
import { ThemePalette } from '@angular/material/core';
import { ProgressBarMode } from '@angular/material/progress-bar';

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
  customer = new Customer;
  selectedValue: number[] = [];
  newSubtask = new SubtaskNew;
  manHourSum: number = 0;
  radioButtonChoose: 'true' | 'false' = 'false';

  Statuses: Status[] = [
    {value: 0, viewValue: 'Do zrobienia'},
    {value: 1, viewValue: 'W toku'},
    {value: 2, viewValue: 'Zrobione'}
  ];

  constructor(private _ktService: kanbanTasksService, private router: Router, private routerData: ActivatedRoute, private _fromService: FormService) {
    this.routerData.params.subscribe(params => {
      this.taskId = params['id'];
    });
    this._ktService.getKanbanTask(this.taskId).subscribe(response => {
      this.taskDetails = response;
      this._fromService.getSR(this.taskDetails.serviceRequestId? this.taskDetails.serviceRequestId : 0).subscribe(response => {
        this.customer = response.customer;
      });
      for(let subtask of this.taskDetails.subtasks) {
        let temp = this.getSelectedViewValue(subtask)
        this.selectedValue.push(temp? temp : 0);
      }
    });
  }

  ngOnInit(): void {
    setTimeout(() => {this.progressBarCalculations();}, 700);
  }

  statusChanged(event: MatSelectChange, index: number) {
    console.log(event.value, index);
    this.taskDetails.subtasks[index].status = event.value;
    this._ktService.updateSubtask(this.taskDetails.subtasks[index]).subscribe(response => {
      console.log(response);
    });
    this.progressBarCalculations();
  }

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
    let temp = new Subtask;
    this._ktService.addSubtask(this.newSubtask).subscribe(response => {
      temp.id = response;
    });
    temp.manHour = this.newSubtask.manHour;
    temp.name = this.newSubtask.name;
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
}

interface Status {
  value: number;
  viewValue: string;
}
