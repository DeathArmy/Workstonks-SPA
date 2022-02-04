import { Injectable } from '@angular/core';
import { BasketItem } from './BasketItem';
import { Subtask } from './Subtask';


@Injectable()
export class CarRepairHistory {
  Id: number = 0;
  ServiceRequestId: number = 0;
  Name: string = "";
  Description: string = "";
  DateOfActualRealization: Date = new Date();
  Subtasks: Array<Subtask> = [];
  BasketItems: Array<BasketItem> = [];
  TotalBasketPrice: number = 0
}
