import { KanbanTaskDetails } from './../../Models/KanbanTask';
import { MatSnackBar } from '@angular/material/snack-bar';
import { kanbanTasksService } from 'src/app/services/kanbanTasks.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.css']
})
export class TrackingComponent implements OnInit {

  vinFormControl = new FormControl('', [
    Validators.required
  ]);
  protocolFormControl = new FormControl('', [
    Validators.required
  ]);
  vinErrorText = "Podanie numeru VIN jest niezbędne.";
  protocolErrorText = "Podanie numeru protokołu jest niezbędne.";
  protocolFormPlaceholder = "0687/06/2021";
  taskDetails = new KanbanTaskDetails();

  vin = "";
  protocolNumber = "";

  trackingFilled: boolean = false;

  constructor(private _ktrService: kanbanTasksService, private router: Router, private routerData: ActivatedRoute, private _snack: MatSnackBar)
  {
  }

  ngOnInit(): void {
    console.log(this.router.url);
    console.log(this.routerData.data);
    this.routerData.queryParams.subscribe(params => {
      console.log(params['vin'] + " " + params['protocolNumber']);
      this.vin = params['vin'];
      this.protocolNumber = params['protocolNumber'];
      if (this.vin != undefined && this.protocolNumber != undefined) this.Submit();
  });
  }

  Submit(){
    this._ktrService.getTicketForClient(this.vin, this.protocolNumber).subscribe(response => {
      if (response == undefined) this._snack.open("Podano nieprawidłowy VIN lub numer protokołu!","OK", {duration: 3000});
      else {
        this.trackingFilled = true;
        this.taskDetails = response;
      }
    },
    error => {
      console.log(error);
    });
  }
}
