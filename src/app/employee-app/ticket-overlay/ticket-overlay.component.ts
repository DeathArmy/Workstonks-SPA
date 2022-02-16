import { KanbanTaskDetails } from './../../Models/KanbanTask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayRef } from '@angular/cdk/overlay';
import { ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { formFieldsModel } from 'src/app/Models/formFields';
import { FormControl, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { FILE_PREVIEW_DIALOG_DATA } from './tikcet-overlay.tokens';
import { Subtask } from '../../Models/Subtask';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';
import { Customer } from 'src/app/Models/Customer';
import { CalendarService } from 'src/app/services/calendar.service';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ticket-overlay',
  templateUrl: `./ticket-overlay.component.html`,
  styleUrls: ['./ticket-overlay.component.css'],
  providers: [FormService]
})
export class TicketOverlayComponent implements OnInit {
  @Output() closeOverlay: EventEmitter<boolean> = new EventEmitter();
  email = new FormControl('', [Validators.email]);
  emailErrorMsg = "Wprowadź prawidłowy adres e-mail";
  vinControl = new FormControl('', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]);
  makeControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  modelControl = new FormControl('', [Validators.required]);
  yearControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  engineControl = new FormControl('', [Validators.required]);
  powerControl = new FormControl('', [Validators.required]);
  nameControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  surnameControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  phoneControl = new FormControl('', [Validators.required, Validators.pattern('[0-9]{9}')]);
  descriptionControl = new FormControl('', [Validators.required]);
  fieldFillErrorMsg = "Pole wymagane";
  ticket = new formFieldsModel();
  changesCheck = new formFieldsModel();
  helpInt = false;
  kanbanTask = new KanbanTaskDetails();
  manHourSum: number = 0;
  calendarAssist = 0;
  freeHours = 0;
  restManHour: number = 0;
  daysToAdd: number = 0;
  carDeliveryDays: number = 0;
  userCount: number = 0;
  endDate = new Date();

  displayedColumns: string[] = ['index', 'select', 'name', 'manHour'];
  dataSource: any;
  selection = new SelectionModel<PeriodicElement>(true, []);
  sub: Subtask = new Subtask();

  constructor(@Inject(FILE_PREVIEW_DIALOG_DATA) public componentData: any, private _snackBar: MatSnackBar, private _service: FormService, private _kanbanService: kanbanTasksService, private _calendarService: CalendarService, private _userService: userService, private changeDet:ChangeDetectorRef) {}

  ngOnInit() {
    if (this.componentData)
    {
      this.ticket = this.componentData;
      this.changesCheck.description = this.ticket.description
      this.changesCheck.engineDescription = this.ticket.engineDescription
      this.changesCheck.make = this.ticket.make
      this.changesCheck.model = this.ticket.model
      this.changesCheck.power = this.ticket.power
      this.changesCheck.productionYear = this.ticket.productionYear
      this.changesCheck.vin = this.ticket.vin
      this.changesCheck.customer.email = this.ticket.customer.email
      this.changesCheck.customer.name = this.ticket.customer.name
      this.changesCheck.customer.phoneNumber = this.ticket.customer.phoneNumber
      this.changesCheck.customer.surname = this.ticket.customer.surname
    }
    this.kanbanTask.dateOfCarDelivery = new Date();
    this.getUserCount();
    this.kanbanTask.dateOfPlannedRealization = new Date();
  }

  send() {
    this.kanbanTask.serviceRequestId = this.ticket.id;
    this.kanbanTask.description = this.ticket.description;
    this.kanbanTask.engineDescription = this.ticket.engineDescription;
    this.kanbanTask.make = this.ticket.make;
    this.kanbanTask.model = this.ticket.model;
    this.kanbanTask.power = this.ticket.power;
    this.kanbanTask.vin = this.ticket.vin;
    this.kanbanTask.productionYear = this.ticket.productionYear;
    if (this.ticket.customer.id != undefined) {
      this.kanbanTask.customerId = this.ticket.customer.id;
    }
    else {
      this.kanbanTask.customer = new Customer();
      this.kanbanTask.customer!.consentToTheProcessingOfPersonalData = true;
      this.kanbanTask.customer!.email = this.ticket.customer.email;
      this.kanbanTask.customer!.name = this.ticket.customer.name;
      this.kanbanTask.customer!.surname = this.ticket.customer.surname;
      this.kanbanTask.customer!.phoneNumber = this.ticket.customer.phoneNumber;
    }
    this._kanbanService.createKanbanTask(this.kanbanTask).subscribe(response => {
      console.log(response);
      setTimeout(() => {this.closeOverlay.emit(true)}, 1000);
    },
    error => {
      console.log(error);
      setTimeout(() => {this.closeOverlay.emit(true)}, 1000);
    });
  }

  abandoned() {
    this._service.abondTicket(this.ticket.id? this.ticket.id : 0).subscribe(response => {
      console.log("Anulowano.");
    });
    this.closeOverlay.emit(true);
  }

  delete() {
    this._service.deleteTicket(this.ticket.id? this.ticket.id : 0).subscribe(response => {
      console.log("Usunięto.");
    });
    this.closeOverlay.emit(true);
  }

  closeWindow() {
    if (this.helpInt || (this.ticket.description == this.changesCheck.description
        && this.ticket.engineDescription == this.changesCheck.engineDescription
        && this.ticket.make == this.changesCheck.make
        && this.ticket.model == this.changesCheck.model
        && this.ticket.power == this.changesCheck.power
        && this.ticket.productionYear == this.changesCheck.productionYear
        && this.ticket.vin == this.changesCheck.vin
        && this.ticket.customer.email == this.changesCheck.customer.email
        && this.ticket.customer.name == this.changesCheck.customer.name
        && this.ticket.customer.phoneNumber == this.changesCheck.customer.phoneNumber
        && this.ticket.customer.surname == this.changesCheck.customer.surname
        && this.kanbanTask.subtasks.length == 0))
    {
      this.helpInt = false;
      this.closeOverlay.emit(true);
    }
    else
    {
      this.helpInt = true;
      this._snackBar.open("Wykryto zmiany. Aby zamknąć użyj przycisku Zamknij raz jeszcze!","OK", {duration: 3000});
    }
  }

  addSubtask()
  {
    this.kanbanTask.subtasks?.push(this.sub);
    this.manHourSum += Number(this.sub.manHour!);
    this.dataSource = new MatTableDataSource(this.kanbanTask.subtasks);
    this.sub = new Subtask();
    this.predictCarReturnDate();
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
      let index = this.kanbanTask.subtasks.findIndex(i => i.id == e.index)
      this.manHourSum -= this.kanbanTask.subtasks[index].manHour!;
      this.kanbanTask.subtasks.splice(index, 1);
    });
    this.dataSource = new MatTableDataSource(this.kanbanTask.subtasks);
    this.selection.clear();
    this.predictCarReturnDate();
  }

  dateHasBeenChanged(input: HTMLInputElement) {
    this.carDeliveryDays = this.kanbanTask.dateOfCarDelivery!.getDate() - new Date().getDate();
    this.predictCarReturnDate();
    console.log("Dostawa: " + this.kanbanTask.dateOfCarDelivery!.toDateString() + "\nRealizacja: " + this.kanbanTask.dateOfPlannedRealization!.toDateString());
    input.value = this.kanbanTask.dateOfPlannedRealization!.toLocaleDateString();
  }

  getUserCount() {
    this.userCount = 0;
    this._userService.getUserList().subscribe(response => {
      this.userCount = response.length;
      },
      error => {
        console.log(error);
      });
  }

  predictCarReturnDate() {
    this.daysToAdd = 0;
    this.endDate.setDate(new Date().getDate() + this.carDeliveryDays);
    let tempHoursSum: number = 0;
    if (this.manHourSum == 0) {

    }
    else {
      this._calendarService.getReservedTime(this.endDate).subscribe(response => {
        for(let day of response)
        {
          tempHoursSum += day.hours!;
        }
      },
      error => {
        console.log(error);
      });
      if (this.endDate.getDay() == 6) {
        this.freeHours = (4 * this.userCount) - tempHoursSum;
      }
      else
      {
        this.freeHours = (6 * this.userCount) - tempHoursSum;
      }

      if (this.manHourSum > 8)
      {

        if (this.freeHours < 8)
        {
          this.restManHour = this.manHourSum - this.freeHours;
        }
        else
        {
          this.restManHour = this.manHourSum - 8;
          this.daysToAdd++;
        }
        while (this.restManHour > 0) {
          this.endDate.setDate(new Date().getDate() + this.daysToAdd + this.carDeliveryDays);
          if (this.endDate.getDay() == 0)
          {
            this.daysToAdd++;
            this.endDate.setDate(new Date().getDate() + this.daysToAdd + this.carDeliveryDays);
          }
          this._calendarService.getReservedTime(this.endDate).subscribe(response => {
            for(let day of response)
            {
              tempHoursSum += day.hours!;
            }
          },
          error => {
            console.log(error);
          });
          if (this.endDate.getDay() == 6) {
            if (this.restManHour > 6)
            {
              this.restManHour -= 6;
              this.daysToAdd++;
            }
            else {
              if (this.restManHour < ((4 * this.userCount) - tempHoursSum))
              {
                this.restManHour = 0;
              }
              else
              {
                this.restManHour -= ((4 * this.userCount) - tempHoursSum);
                this.daysToAdd++;
              }
            }
          }
          else {
            if (this.restManHour > 8)
            {
              this.restManHour = this.restManHour - 8;
              this.daysToAdd++;
            }
            else
            {
              if (this.restManHour < ((6 * this.userCount) - tempHoursSum))
              {
                this.restManHour = 0;
              }
              else
              {
                this.restManHour -= ((6 * this.userCount) - tempHoursSum);
                this.daysToAdd++;
              }
            }
          }
        };
      }
      else {
        if (this.manHourSum > this.freeHours)
        {
          this.daysToAdd++;
          this.restManHour = this.manHourSum - this.freeHours;
          while(this.restManHour > 0) {
            this.endDate.setDate(new Date().getDate() + this.daysToAdd + this.carDeliveryDays);
            if (this.endDate.getDay() == 0)
            {
              this.endDate.setDate(new Date().getDate() + this.daysToAdd + this.carDeliveryDays);
              this.daysToAdd++;
            }
            this._calendarService.getReservedTime(this.endDate).subscribe(response => {
              for(let day of response)
              {
                tempHoursSum += day.hours!;
              }
            },
            error => {
              console.log(error);
            });
            if (this.endDate.getDay() != 6)
            {
              if (this.restManHour < ((4 * this.userCount) - tempHoursSum))
              {
                this.restManHour = 0;
              }
              else
              {
                this.restManHour -= ((4 * this.userCount) - tempHoursSum);
                this.daysToAdd++;
              }
            }
            else
            {
              if (this.restManHour < ((6 * this.userCount) - tempHoursSum))
              {
                this.restManHour = 0;
              }
              else
              {
                this.restManHour -= ((6 * this.userCount) - tempHoursSum);
                this.daysToAdd++;
              }
            }
          }
        }
      }
    }
    console.log(this.endDate);
    this.kanbanTask.dateOfPlannedRealization = this.endDate;
    console.log(this.kanbanTask.dateOfPlannedRealization);
  }
}

export class TicketOverlayRef {
  constructor(private overlayRef: OverlayRef) {}

  close(): void {
    this.overlayRef.dispose();
  }
}

export interface PeriodicElement {
  index: number;
  name: string;
  manHour: number;
}
