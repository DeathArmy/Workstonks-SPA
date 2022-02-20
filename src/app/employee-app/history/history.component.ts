import { BasketItem } from './../../Models/BasketItem';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';
import { Component, OnInit } from '@angular/core';
import { CarRepairHistory } from 'src/app/Models/CarRepairHistory';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subtask } from 'src/app/Models/Subtask';
import { PdfMaker } from 'src/app/services/pdfmaker.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HistoryComponent implements OnInit {

  carRepairHistory: Array<CarRepairHistory> = [];
  downloaded: boolean = false;
  displayedColumns: string[] = ['index', 'date', 'price'];
  dataSource: any;
  expandedElement = {} as CarRepairHistory;
  vehicleIdNumber: string = "";

  constructor(private _ktService: kanbanTasksService) {

  }

  ngOnInit(): void {
    let tempCarHistory = new CarRepairHistory();
    let fakeBaasket = new BasketItem();
    let fakeSubtask = new Subtask();
    fakeSubtask.manHour = 1;
    fakeSubtask.name = "zawieszenie przód";
    fakeSubtask.manHour = 2;
    tempCarHistory.subtasks.push(fakeSubtask);
    fakeBaasket.amount = 1;
    fakeBaasket.itemName = "końcówka drązka lewa";
    fakeBaasket.price = 86.10;
    tempCarHistory.basketItems.push(fakeBaasket);
    tempCarHistory.dateOfActualRealization = new Date();
    tempCarHistory.serviceRequestId = 1;
    tempCarHistory.totalBasketPrice = 100;
    tempCarHistory.totalWorkHoursCosts = 100;
    this.carRepairHistory.push(tempCarHistory);
  }

  getHistoryByVin()
  {
    this._ktService.getHistory(this.vehicleIdNumber).subscribe(response => {
      this.carRepairHistory = response;
      this.downloaded = true;
      this.dataSource = new MatTableDataSource(this.carRepairHistory);
    },
    error => {
      console.log(error);
    });
  }

  historyToPdf() {
    let pdfMaker = new PdfMaker();
    //console.log(this.carRepairHistory);
    if(this.carRepairHistory.length > 0) {
      pdfMaker.carHistory(this.carRepairHistory, this.vehicleIdNumber);
    }
  }
}
