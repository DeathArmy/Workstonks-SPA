import { KanbanTaskBasketDto } from './KanbanTask';
import { Injectable } from "@angular/core";

@Injectable()
export class BasketItem {
  id?: number;
  isActive?: boolean;
  itemName?: string;
  price?: number;
  basketItemState?: ItemState;
  amount?: number;
  unitOfMeasure?: UnitOfMeasure;
  dateOfAddedToCart?: Date;
  dateOfPurchase?: Date;
  dateOfDelivery?: Date;
  kanbanTaskId?: number;
}

export class ExtendedBasketItem {
  id?: number;
  isActive?: boolean;
  itemName?: string;
  price?: number;
  basketItemState?: ItemState;
  amount?: number;
  unitOfMeasure?: UnitOfMeasure;
  dateOfAddedToCart?: Date;
  dateOfPurchase?: Date;
  dateOfDelivery?: Date;
  kanbanTaskId?: number;
  kanbanTask?: KanbanTaskBasketDto;
}

enum ItemState {
  New = 0,
  InRealisation = 1,
  Completed = 2,
  Removed = 3
}

enum UnitOfMeasure {
  Pieces = 0,
  Mass = 1,
  Volume = 2
}
