import { Component, OnInit } from '@angular/core';
import { ExtendedBasketItem } from 'src/app/Models/BasketItem';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basketList: Array<ExtendedBasketItem> = [];
  displayedColumns: string[] = ['select', 'kanbanTaskId', 'itemName', 'amount', 'unitOfMeasure', 'dateOfAddedToCart', 'dateOfPurchase', 'dateOfDelivery', 'vin', 'make', 'productionYear', 'power'];
  dataSource: any;
  selection = new SelectionModel<ExtendedBasketItem>(true, []);
  datePickingMode: boolean = false;
  deliveryDatePickingMode: boolean = false;
  pickedDeliverDate = new Date();

  constructor(private _ktService: kanbanTasksService, private _snackbar: MatSnackBar) {
    this.loadUncompletedBasketItem();
  }

  ngOnInit(): void {
  }

  loadUncompletedBasketItem() {
    this._ktService.getUncompletedBasketItems().subscribe(response => {
      this.basketList = response;
      this.dataSource = new MatTableDataSource(this.basketList);
    },
    error => {
      console.log(error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

  datePickingModeChange() {
    if(this.selection.isEmpty())
    {
      this._snackbar.open("Nie wybrano żadnych pozycji!", "OK");
    }
    else {
      this.datePickingMode = !this.datePickingMode;
    }
  }

  datePurchaseModeChange() {
    if(this.selection.isEmpty())
    {
      this._snackbar.open("Nie wybrano żadnych pozycji!", "OK");
    }
    else {
      this.deliveryDatePickingMode = !this.deliveryDatePickingMode;
    }
  }

  setPurchaseDate() {
    if(this.selection.isEmpty())
    {
      this._snackbar.open("Nie wybrano żadnych pozycji!", "OK");
    }
    else {
      this.selection.selected.forEach(element => {
        element.dateOfPurchase = new Date();
        element.basketItemState = 1;
        this._ktService.putBasketItem(element).subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
        })
      });
      setTimeout(() => {
        this.loadUncompletedBasketItem();
      }, 2000);
      this.selection.deselect();
      this.deliveryDatePickingMode = !this.deliveryDatePickingMode;
    }
  }

  setDeliveryDate() {
    if(this.selection.isEmpty())
    {
      this._snackbar.open("Nie wybrano żadnych pozycji!", "OK");
    }
    else {
      this.selection.selected.forEach(element => {
        element.dateOfDelivery = this.pickedDeliverDate;
        element.basketItemState = 2;
        this._ktService.putBasketItem(element).subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
        })
      });
      setTimeout(() => {
        this.loadUncompletedBasketItem();
      }, 2000);
      this.selection.deselect();
      this.datePickingMode = !this.datePickingMode;
    }
  }
}
