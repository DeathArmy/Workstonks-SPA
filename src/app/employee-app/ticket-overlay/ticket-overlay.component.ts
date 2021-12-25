import { KanbanTaskDetails } from './../../Models/KanbanTask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OverlayRef } from '@angular/cdk/overlay';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { formFieldsModel } from 'src/app/Models/formFields';
import { FormControl, Validators } from '@angular/forms';
import { FormService } from '../../services/form.service';
import { FILE_PREVIEW_DIALOG_DATA } from './tikcet-overlay.tokens';
import { Subtask } from '../../Models/Subtask';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';

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

  displayedColumns: string[] = ['index', 'select', 'name', 'manHour'];
  dataSource: any;
  selection = new SelectionModel<PeriodicElement>(true, []);
  sub: Subtask = new Subtask();

  constructor(@Inject(FILE_PREVIEW_DIALOG_DATA) public componentData: any, private _snackBar: MatSnackBar, private _service: FormService, private _kanbanService: kanbanTasksService) {}

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
    this.kanbanTask.customer = this.ticket.customer;
    this._kanbanService.createKanbanTask(this.kanbanTask).subscribe(response => {
      //console.log(response);
    });
    this.closeOverlay.emit(true);
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
    this.dataSource = new MatTableDataSource(this.kanbanTask.subtasks);
    this.sub = new Subtask();
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
      this.kanbanTask.subtasks.splice(index, 1);
    });
    this.dataSource = new MatTableDataSource(this.kanbanTask.subtasks);
    this.selection.clear();
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
