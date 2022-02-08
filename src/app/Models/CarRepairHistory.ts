import { Injectable } from '@angular/core';
import { BasketItem } from './BasketItem';
import { Subtask } from './Subtask';


@Injectable()
export class CarRepairHistory {
  id: number = 0;
  serviceRequestId: number = 0;
  name: string = "";
  description: string = "";
  dateOfActualRealization: Date = new Date();
  subtasks: Array<Subtask> = [];
  basketItems: Array<BasketItem> = [];
  totalBasketPrice: number = 0;
  totalWorkHoursCosts: number = 0;
}
