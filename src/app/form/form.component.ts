import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  vinFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.email
  ]);
  vinErrorText = "Podanie numeru VIN jest niezbędne."
  constructor() { }

  ngOnInit(): void {
  }

  Submit() {

  }

}
