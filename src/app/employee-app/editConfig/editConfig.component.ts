import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { homeConfiguration } from '../../client-app/home/home.component'
import { contact } from '../../client-app/contact/contact.component'
import { servicePrice } from '../../client-app/prices/prices.component';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { NumericLiteral } from 'typescript';

@Component({
  selector: 'app-editConfig',
  templateUrl: './editConfig.component.html',
  styleUrls: ['./editConfig.component.css']
})
export class EditConfigComponent implements OnInit {

  hc: homeConfiguration = new homeConfiguration();
  cc: contact = new contact();
  servicesPrices = new Array<servicePrice>();
  displayedColumns: string[] = ['index', 'select', 'serviceName', 'servicePrice', 'serviceCount'];
  dataSource: any;
  selection = new SelectionModel<PeriodicElement>(true, []);
  holdMyImg: string = "";
  sp: servicePrice = new servicePrice("", 0, 1);

  constructor(private configS: ConfigService) {
    this.configS.getConfig("home").subscribe(home => {
      let tempSP: homeConfiguration = JSON.parse(<string>home.data);
      this.hc = tempSP;
      //console.log(this.hc.homeFirstImg);
    },
     error => {
       console.log(error);
     });
     this.configS.getConfig("contact").subscribe(contact => {
      let tempSP: contact = JSON.parse(<string>contact.data);
      this.cc = tempSP;},
      error => {
        console.log(error);
      });
     this.configS.getConfig("price").subscribe(prices => {
      let tempSP: Array<servicePrice> = JSON.parse(<string>prices.data);
      this.servicesPrices = tempSP;
      //console.log(this.servicesPrices)
      this.dataSource = new MatTableDataSource(this.servicesPrices);},
     error => {
       console.log(error);
     });
   }

  ngOnInit() {
  }

  firstImage(event: Event)
  {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.hc.homeFirstImg = reader.result as string;
    }
  }

  secondImage(event: Event)
  {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.hc.homeSecondImg = reader.result as string;
    }
  }

  thirdImage(event: Event)
  {
    const reader = new FileReader();
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.hc.homeThirdImg = reader.result as string;
    }
  }

  saveHomeConfig()
  {
    this.configS.putConfig(this.hc, "home").subscribe(home => {
      //console.log(home);
    })
  }

  saveContactConfig()
  {
    this.configS.putConfig(this.cc, "contact").subscribe(home => {
      //console.log(home);
    })
  }

  addServicePrice()
  {
    this.servicesPrices.push(this.sp);
    this.dataSource = new MatTableDataSource(this.servicesPrices);
  }

  saveServicePriceConfig()
  {
    this.configS.putConfig(this.servicesPrices, "price").subscribe(home => {
      //console.log(home);
    })
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

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.index + 1}`;
  }

  deleteSelected(){
    console.log(this.selection.selected)
    this.selection.selected.forEach(e => {
      let index = this.servicesPrices.findIndex(i => i.serviceName == e.serviceName)
      this.servicesPrices.splice(index, 1);
    });
    this.dataSource = new MatTableDataSource(this.servicesPrices);
    this.selection.clear();
  }

}

export interface PeriodicElement {
  index: number;
  serviceName: string;
  servicePrice: number;
  serviceCount: number;
}
