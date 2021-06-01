import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-prices',
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css']
})
export class PricesComponent implements OnInit {
  servicesPrices = new Array<servicePrice>();

  constructor() {
    this.servicesPrices.push(new servicePrice('Wymiana oleju', 30.00, 1), new servicePrice('Ustawienie zbieżności', 80, 1), new servicePrice('Diagnostyka komputerowa', 50, 1), new servicePrice('Wymiana opon + wyważanie', 80, 4));
   }

  ngOnInit(): void {
  }

}

class servicePrice {
  constructor(public serviceName: string, public price: number, public count: number){}
}
