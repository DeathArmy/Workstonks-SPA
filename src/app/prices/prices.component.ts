import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  servicesPrices = new Array<servicePrice>();
  displayedColumns: string[] = ['index', 'serviceName', 'servicePrice', 'serviceCount'];
  dataSource = new MatTableDataSource(this.servicesPrices);
  constructor() {
    this.servicesPrices.push(new servicePrice('Wymiana oleju', 30.00, 1), new servicePrice('Ustawienie zbieżności', 80, 1), new servicePrice('Diagnostyka komputerowa', 50, 1), new servicePrice('Wymiana opon + wyważanie', 80, 4));
   }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

class servicePrice {
  constructor(public serviceName: string, public price: number, public count: number){}
}
