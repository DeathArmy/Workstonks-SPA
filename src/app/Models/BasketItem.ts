import { Injectable } from "@angular/core";

@Injectable()
export class BasketItem {
  id?: number;
  isActive?: boolean;
  itemName?: string;
  price?: number;
  basketItemState?: ItemState;
  dateOfAddedToCart?: Date;
  dateOfPurchase?: Date;
  dateOfDelivery?: Date;
  kanbanTaskId?: number;
  amount?: number;
  unitOfMeasure?: UnitOfMeasure;
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
