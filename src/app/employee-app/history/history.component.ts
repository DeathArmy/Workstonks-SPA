import { Component, OnInit } from '@angular/core';
import { CarRepairHistory } from 'src/app/Models/CarRepairHistory';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Subtask } from 'src/app/Models/Subtask';

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
  displayedColumns: string[] = ['index', 'date', 'price'];
  dataSource: any;
  expandedElement = {} as CarRepairHistory;
  vehicleIdNumber: string = "";

  constructor() { 

    let ch = new CarRepairHistory();
    let hc = new CarRepairHistory();
    let subtask = new Subtask();
    ch.dateOfCarDelivery = new Date();
    ch.totalPrice = 125.37;
    ch.index = 1;
    hc.dateOfCarDelivery = new Date();
    hc.totalPrice = 69;
    hc.index = 2;
    subtask.manHour = 2;
    subtask.name = "Wymiana oleju";
    ch.subtasks.push(subtask);
    hc.subtasks.push(subtask);
    this.carRepairHistory.push(ch);
    this.carRepairHistory.push(hc);
    this.dataSource = new MatTableDataSource<CarRepairHistory>(this.carRepairHistory);

     
  }

  ngOnInit(): void {
  }

  getHistoryByVin()
  {
    
  }
}