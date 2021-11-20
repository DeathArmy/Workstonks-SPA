import { Injectable } from '@angular/core';

enum Status {
  Todo,
  InProgress,
  Completed
}

@Injectable()
export class Subtask {
    id?: number;
    name?: string;
    manHour?: number;
    status?: Status;
  }

  export class SubtaskNew {
    id?: number;
    kanbanTaskId?: number;
    name?: string;
    manHour?: number;
    status?: Status;
  }
