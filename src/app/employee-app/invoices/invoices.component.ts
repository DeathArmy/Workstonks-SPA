import { KanbanTaskDetails } from 'src/app/Models/KanbanTask';
import { CalendarService } from 'src/app/services/calendar.service';
import { Invoice } from 'src/app/Models/Invoice';
import { MatSelect, MatSelectChange } from '@angular/material/select';
import { userService } from 'src/app/services/user.service';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { PdfMaker } from 'src/app/services/pdfmaker.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {

  invoiceNumber: string = "";
  kanbanTaskNumber: number = 0;
  selectedUserId: number = 0;
  employees: Array<User> = [];
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  invoicesList: Array<Invoice> = [];

  constructor(private _ktService: kanbanTasksService, private _userService: userService, private _calendarService: CalendarService) {
    this._userService.getUserList().subscribe(response => {
      this.employees = response;
    },
    error => {console.log(error);});
    this.dateFrom.setDate(new Date().getDate() - 90);
  }

  ngOnInit(): void {
  }

  clearInputs(ktN: HTMLInputElement, inv: HTMLInputElement, daTo: HTMLInputElement, daFr: HTMLInputElement, us: MatSelect) {
    this.kanbanTaskNumber = 0;
    this.invoiceNumber = "";
    this.dateTo = new Date();
    this.dateFrom.setDate(new Date().getDate() - 90);
    this.selectedUserId = 0;
    ktN.value = "";
    inv.value = "";
    us.value = "";
    daTo.value = this.dateTo.toLocaleDateString();
    daFr.value = this.dateFrom.toLocaleDateString();
  }

  search() {

    this._ktService.getInvoices(this.invoiceNumber? this.invoiceNumber : undefined, this.selectedUserId? this.selectedUserId : undefined, this.kanbanTaskNumber? this.kanbanTaskNumber : undefined, this.dateFrom, this.dateTo).subscribe(response => {
      this.invoicesList = response;
      console.log(response);
    },
    error => {console.log(error);});
  }

  kanbanTaskNumberInputValueChanged(ktN: HTMLInputElement) {
    this.kanbanTaskNumber = parseInt(ktN.value);
  }

  invoiceNumberInputValueChanged(inv: HTMLInputElement) {
    this.invoiceNumber = inv.value;
  }

  employeeIssuingInvoiceSelectionChanged(event: MatSelectChange) {
    this.selectedUserId = event.value
  }

  cancelInvoice(id: number) {
    this._ktService.cancelInvoice(id).subscribe(response => {
      console.log(response);
    },
    error => {
      console.log(error);
    });
  }

  async invoicePreview(invoice: Invoice) {
    var pdfMaker = new PdfMaker();
    let taskDetails: KanbanTaskDetails = new KanbanTaskDetails;
    this._ktService.getKanbanTask(invoice.kanbanTaskId!).subscribe(response => {
      taskDetails = response;
    },
    error => {
      console.log(error);
    });
    await new Promise(f => setTimeout(f, 200));
    let savedTimes: Array<number> = [];
    for (let subtask of taskDetails.subtasks)
    {
      this._calendarService.getSavedTime(subtask.id!).subscribe( response =>
        {
          let dummyVar: number = 0;
          response.forEach( el => {
            dummyVar += el.hours!;
          })
          savedTimes.push(dummyVar);
        },
        error => {console.log(error);}
      );
    }
    await new Promise(f => setTimeout(f, 500));
    pdfMaker.invoice(invoice, taskDetails, savedTimes);
  }
}
