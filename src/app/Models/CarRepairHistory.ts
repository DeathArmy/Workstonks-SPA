import { Injectable } from '@angular/core';
import { BasketItem } from './BasketItem';
import { SubtaskHistory } from './Subtask';


@Injectable()
export class CarRepairHistory {
  id: number = 0;
  serviceRequestId: number = 0;
  name: string = "";
  description: string = "";
  dateOfActualRealizatoin: Date = new Date();
  subtasks: Array<SubtaskHistory> = [];
  basketItems: Array<BasketItem> = [];
  totalBasketPrice: number = 0;
  totalWorkHoursCosts: number = 0;
}
