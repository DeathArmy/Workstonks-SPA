import { Injectable } from '@angular/core';
import { Subtask } from './Subtask';


@Injectable()
export class CarRepairHistory {
  index?: number;
  dateOfCarDelivery: Date = new Date();
  subtasks: Array<Subtask> = [];
  totalPrice: number = 0;
}