import { User } from './User';
import { KanbanTaskDetails } from './KanbanTask';
import { Customer } from './Customer';

export class Invoice{
  Id?: number;
  IsActive?: boolean;
  Number?: number;
  CustomerId?: number;
  Customer?: Customer;
  KanbanTaskId?: number;
  KanbanTask?: KanbanTaskDetails;
  UserId?: number;
  User?: User;
  DateOfCeation?: Date;
  PriceBrutto?: number;
  PriceNetto?: number;
  VAT?: number;
  InvoiceCode?: string;
}

export class PostInvoice {
  CustomerId?: number;
  KanbanTaskId?: number;
  UserId?: number;
}
