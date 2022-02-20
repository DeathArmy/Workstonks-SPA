import { userService } from 'src/app/services/user.service';
import { UsersReport, YearReport } from './../../Models/Report';
import { Component, OnInit } from '@angular/core';
import { ReportService } from 'src/app/services/report.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label, SingleDataSet, MultiDataSet } from 'ng2-charts';
import { User } from 'src/app/Models/User';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [10,10,11,15,4,5,4,8,2,7];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 38, 20, 12, 12, 12, 13], label: 'Loading data...'},
    { data: [65, 59, 80, 81, 56, 55, 40, 20, 12, 12, 12, 13], label: 'Loading data...'}
  ];

  dateFrom = new Date();
  dateTo = new Date();
  year: number = new Date().getFullYear();
  usersData: Array<UsersReport> = [];
  userList: Array<User> = [];
  monthsNames: Array<string> = ['styczeń', 'luty', 'marzec', 'kwiecień', 'maj', 'czerwiec', 'lipiec', 'sierpień', 'wrzesień', 'październik', 'listopad', 'grudzień'];
  yearReportData: Array<YearReport> = [];

  constructor(private _report: ReportService, private _users: userService) {
    this.dateFrom.setDate(new Date().getDate() - 31);
    this.loadDataFirstChart();
    this.loadDataSecondChart();
  }

  async loadDataFirstChart() {
    this._report.getUsersReport(this.dateFrom, this.dateTo).subscribe(response => {
      this.usersData = response;
    },
    error => {
      console.log(error);
    });
    await new Promise(f => setTimeout(f, 1500));
    this._users.getUserList().subscribe(response => {
      this.userList = response;
    },
    error => {console.log(error);});
    await new Promise(f => setTimeout(f, 250));
    let body: Label[] = [];
    let dataBody: SingleDataSet = [];
    this.usersData.forEach(el => body.push(`[${this.userList.filter(e => e.id == el.userId)[0].userName}]`));
    this.pieChartLabels = body;
    this.usersData.forEach(el => dataBody.push(el.hours!));
    this.pieChartData = dataBody;
  }

  async loadDataSecondChart() {
    let labels: Label[] = [];
    let barData: ChartDataSets[] = [];
    let body1: Array<number> = [];
    let body2: Array<number> = [];
    this._report.getYearReport(this.year).subscribe(response => {
      this.yearReportData = response;
    },
    error => {console.log(error);})
    await new Promise(f => setTimeout(f, 300));
    this.yearReportData.forEach(el => {
      labels.push(this.monthsNames[el.month! - 1]);
      body1.push(el.countDone!);
      body2.push(el.countDone! + el.countNewAndInProgress!);
    });
    await new Promise(f => setTimeout(f, 250));
    this.barChartLabels = labels;
    this.barChartData = [
      {data: body1, label: 'Ilość ukończonych zgłoszeń'},
      {data: body2, label: 'Całkowita ilość zgłoszeń'}
    ];
  }

  ngOnInit(): void {
  }

}
