export class UsersReport {
  userId?: number;
  name?: string;
  surname?: string;
  hours?: number;
  plannedHours?: number;
  kanbanTaskResults?: Array<Result>;
  employeeSubtaskResults?: Array<Result>;
}

export class KanbanTasksReport {
  status?: number;
  count?: number;
  hoursSum?: number;
  plannedHoursSum?: number;
  hoursAvg?: number;
  plannedHoursAvg?: number;
}

export class YearReport {
  month?: number;
  countDone?: number;
  countNewAndInProgress?: number;
}

interface Result {
  status: number,
  count: number
}
