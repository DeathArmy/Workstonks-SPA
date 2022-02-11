import { BasketItem } from './BasketItem';
import { Comment } from './Comment';
import { Customer } from "./Customer";
import { Subtask } from "./Subtask";
import { Photo } from "./Photo";

enum Status {
  New,
  ToDo,
  InDiagnostics,
  InRealization,
  Frozen,
  WaitingForCustomer,
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
  customerId?: number;
  name?: string;
  description?: string;
  protocolNumber?: string;
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
  customer?: Customer;
  subtasks: Subtask[] = [];
  basketItems: BasketItem[] = [];
  comments: Comment[] = [];
  photos: Photo[] = [];
}

export class KanbanTaskBasketDto {
  name?: string;
  vin?: string;
  make?: string;
  model?: string;
  productionYear?: number;
  engineDescription?: string;
  power?: number;
}
