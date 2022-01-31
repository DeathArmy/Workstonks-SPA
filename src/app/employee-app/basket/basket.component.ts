import { Component, OnInit } from '@angular/core';
import { ExtendedBasketItem } from 'src/app/Models/BasketItem';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  basketList: Array<ExtendedBasketItem> = [];
  displayedColumns: string[] = ['kanbanTaskId', 'itemName', 'amount', 'unitOfMeasure', 'dateOfAddedToCart', 'dateOfPurchase', 'dateOfDelivery', 'vin', 'make', 'productionYear', 'power'];
  dataSource: any;

  constructor(private _ktService: kanbanTasksService) {
    _ktService.getUncompletedBasketItems().subscribe(response => {
      this.basketList = response;
      console.log(this.basketList);
      this.dataSource = new MatTableDataSource(this.basketList);
    },
    error => {
      console.log(error);
    });
   }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
