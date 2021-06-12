import { ConfigService } from '../../services/config.service';
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
  dataSource: any;

  constructor(private configService: ConfigService) {
    this.configService.getConfig("price").subscribe(prices => {
      let tempSP: Array<servicePrice> = JSON.parse(<string>prices.data);
      this.servicesPrices = tempSP;
      //console.log(this.servicesPrices)
      this.dataSource = new MatTableDataSource(this.servicesPrices);
     });
    // this.servicesPrices.push(new servicePrice('Wymiana oleju', 30.00, 1), new servicePrice('Ustawienie zbieżności', 80, 1), new servicePrice('Diagnostyka komputerowa', 50, 1), new servicePrice('Wymiana opon + wyważanie', 80, 4));
    // this.configService.postConfig(this.servicesPrices, 'price').subscribe(post => {
    //   console.log(post);
    // });
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

export class servicePrice {
  constructor(public serviceName: string, public price: number, public count: number){}
}
