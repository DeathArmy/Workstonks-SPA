import { formFieldsModel } from 'src/app/Models/formFields';
import { Component, OnInit } from '@angular/core';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KanbanTaskDetails } from 'src/app/Models/KanbanTask';
import { FormService } from 'src/app/services/form.service';
import { Customer } from 'src/app/Models/Customer';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskId: number = 0;
  taskDetails = new KanbanTaskDetails;
  srInfo = new formFieldsModel;
  selectedValue: number = 0;
  customer = new Customer;

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
    })

  }

  ngOnInit(): void {

  }

}

interface Status {
  value: number;
  viewValue: string;
}
