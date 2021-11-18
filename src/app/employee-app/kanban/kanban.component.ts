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

  constructor(private _ktService: kanbanTasksService, private router: Router) {
    this._ktService.getKanbanTasks().subscribe(tasks => {
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
    })
  }

  ngOnInit(): void {
    //dla testów
    this.todoKT = this.kanbanTasks;
    this.inDiagKT = this.kanbanTasks;
    this.inProgKT = this.kanbanTasks;
    this.frozenKT = this.kanbanTasks;
    this.doneKT = this.kanbanTasks;
  }

  openTask(id: number)
  {
    this.router.navigate(['employeeApp/task-details', id]);
  }

}
