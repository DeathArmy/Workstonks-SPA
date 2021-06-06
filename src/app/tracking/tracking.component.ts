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
  constructor() { }

  ngOnInit(): void {
  }

  Submit(){

  }
}
