import { ConfigService } from './../../services/config.service';
import { Component, OnInit } from '@angular/core';
import { homeConfiguration } from '../../client-app/home/home.component'
import { contact } from '../../client-app/contact/contact.component'
import { servicePrice } from '../../client-app/prices/prices.component';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { HttpErrorResponse } from '@angular/common/http';

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
  homeEmpty: boolean = false;
  contactEmpty: boolean = false;
  priceEmpty: boolean = false;

  constructor(private configS: ConfigService) {
    //download Home configuration
    this.configS.getConfig("home").subscribe(home => {
        if (home == null) {
          console.log("Brak konfiguracji dla Home.");
          this.homeEmpty = true;
        }
        else {
          this.homeEmpty = false;
          let tempSP: homeConfiguration = JSON.parse(<string>home.data);
          this.hc = tempSP;
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

    //download Contact configuration
     this.configS.getConfig("contact").subscribe(contact => {
      if (contact == null) {
        console.log("Brak konfiguracji dla Contact.");
        this.contactEmpty = true;
      }
      else {
        this.contactEmpty = false;
        let tempSP: contact = JSON.parse(<string>contact.data);
        this.cc = tempSP;
      }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );

    //download ServicePrice configuration
     this.configS.getConfig("price").subscribe(prices => {
       if (prices == null) {
         console.log("Brak konfiguracji dla ServicePrice.");
         this.priceEmpty = true;
       }
       else {
        this.priceEmpty = false;
        let tempSP: Array<servicePrice> = JSON.parse(<string>prices.data);
        this.servicesPrices = tempSP;
        this.dataSource = new MatTableDataSource(this.servicesPrices); 
       }
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
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
    if (this.homeEmpty) {
      this.configS.postConfig(this.hc, "home").subscribe(home => {
      });
      this.homeEmpty = false;
    }
    else {
      this.configS.putConfig(this.hc, "home").subscribe(home => {
      });
    }
  }

  saveContactConfig()
  {
    if (this.contactEmpty) {
      this.configS.postConfig(this.cc, "contact").subscribe(home => {
      });
      this.homeEmpty = false;
    }
    else {
      this.configS.putConfig(this.cc, "contact").subscribe(home => {
      });
    }
  }

  addServicePrice()
  {
    this.servicesPrices.push(this.sp);
    this.dataSource = new MatTableDataSource(this.servicesPrices);
    this.sp = new servicePrice("", 0, 1);
  }

  saveServicePriceConfig()
  {
    if (this.priceEmpty) {
      this.configS.postConfig(this.servicesPrices, "price").subscribe(home => {
      });
      this.homeEmpty = false;
    }
    else {
      this.configS.putConfig(this.servicesPrices, "price").subscribe(home => {
      });
    }
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
