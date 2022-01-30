import { ConfigService } from '../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

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
      this.dataSource = new MatTableDataSource(this.servicesPrices);
     });
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
