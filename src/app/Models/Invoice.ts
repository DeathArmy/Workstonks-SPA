import { User } from './User';
import { KanbanTaskDetails } from './KanbanTask';
import { Customer } from './Customer';

export class Invoice {
  id?: number;
  isActive?: boolean;
  number?: number;
  customerId?: number;
  customer?: Customer;
  kanbanTaskId?: number;
  kanbanTask?: KanbanTaskDetails;
  userId?: number;
  user?: User;
  dateOfCeation?: Date;
  priceBrutto?: number;
  priceNetto?: number;
  vat?: number;
  invoiceCode?: string;
}

export class PostInvoice {
  CustomerId?: number;
  KanbanTaskId?: number;
  UserId?: number;
}
