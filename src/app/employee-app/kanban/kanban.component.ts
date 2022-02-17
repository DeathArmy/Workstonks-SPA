import { Component, OnInit } from '@angular/core';
import { KanbanTask } from 'src/app/Models/KanbanTask';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

  kanbanTasks = new Array<KanbanTask>();
  newKT = new Array<KanbanTask>();
  todoKT = new Array<KanbanTask>();
  inDiagKT = new Array<KanbanTask>();
  inProgKT = new Array<KanbanTask>();
  frozenKT = new Array<KanbanTask>();
  doneKT = new Array<KanbanTask>();
  date = new Date();
  choosenDate = new Date();

  constructor(private _ktService: kanbanTasksService, private router: Router) {
    this.getInitialData();
  }

  ngOnInit(): void {
  }

  getInitialData() {
    this.todoKT = [];
    this.newKT = [];
    this.inDiagKT = [];
    this.inProgKT = [];
    this.frozenKT = [];
    this.doneKT = [];
    this._ktService.getKanbanTasks(this.date).subscribe(tasks => {
      for (let task of tasks)
      {
        this.kanbanTasks.push(task);
        if (task.status == 0) this.newKT.push(task);
        else if (task.status == 1) this.todoKT.push(task);
        else if (task.status == 2) this.inDiagKT.push(task);
        else if (task.status == 3) this.inProgKT.push(task);
        else if (task.status == 4) this.frozenKT.push(task);
        else if (task.status == 5) this.doneKT.push(task);
      }
    });
  }

  dateChanged()
  {
    if (this.choosenDate.toDateString() == this.date.toDateString()) this.getInitialData()
    else {
      this.kanbanTasks = new Array<KanbanTask>();
      this.newKT = new Array<KanbanTask>();
      this.todoKT = new Array<KanbanTask>();
      this.inDiagKT = new Array<KanbanTask>();
      this.inProgKT = new Array<KanbanTask>();
      this.frozenKT = new Array<KanbanTask>();
      this.doneKT = new Array<KanbanTask>();
      this._ktService.getKanbanTasks(this.date, this.choosenDate).subscribe(tasks => {
        for (let task of tasks)
        {
          this.kanbanTasks.push(task);
          if (task.status == 0) this.newKT.push(task);
          else if (task.status == 1) this.todoKT.push(task);
          else if (task.status == 2) this.inDiagKT.push(task);
          else if (task.status == 3) this.inProgKT.push(task);
          else if (task.status == 4) this.frozenKT.push(task);
          else if (task.status == 5) this.doneKT.push(task);
        }
      });
    }
  }

  openTask(id: number)
  {
    this.router.navigate(['employeeApp/task-details', id]);
  }

}
