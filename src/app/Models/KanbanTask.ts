import { Subtask } from "./Subtask";

enum Status {
  New,
  ToDo,
  InDiagnostics,
  InRealization,
  Frozen,
  Done
}

export class KanbanTask {
  id?: number = 0;
  name?: string;
  dateOfPlannedRealization?: Date;
  dateOfActualRealization?: Date;
  dateOfCarDelivery?: Date;
  status?: Status;
  make?: string;
  model?: string;
}

export class KanbanTaskDetails {
  id?: number;
  serviceRequestId?: number;
  name?: string;
  description?: string;
  dateOfCreation?: Date;
  dateOfPlannedRealization?: Date;
  dateOfActualRealization?: Date;
  dateOfCarDelivery?: Date;
  status: Status = 0;
  isActive: boolean = true;
  vin?: string;
  make?: string;
  model?: string;
  productionYear?: number;
  engineDescription?: string;
  power?: number;
  subtasks: Subtask[] = [];
}
