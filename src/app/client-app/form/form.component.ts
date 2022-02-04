import { FormService } from '../../services/form.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { formFieldsModel } from '../../Models/formFields';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [FormService]
})
export class FormComponent implements OnInit {

  form = new formFieldsModel;
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

  constructor(private fs: FormService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  Submit() {
    if (this.form.customer.consentToTheProcessingOfPersonalData == false) this.snackBar.open("Wymagana akceptacja zgody na przetwarzanie danych osobowych!", "OK", {horizontalPosition: "center", verticalPosition: "bottom"})
    else {
      if (this.email.invalid || this.vinControl.invalid || this.makeControl.invalid ||
        this.modelControl.invalid || this.yearControl.invalid || this.engineControl.invalid ||
        this.powerControl.invalid || this.nameControl.invalid || this.surnameControl.invalid ||
        this.phoneControl.invalid || this.descriptionControl.invalid)
      {
        this.snackBar.open("Formularz zawiera błędy", "OK", {horizontalPosition: "center", verticalPosition: "bottom"});
      }
      else {
        this.fs.postForm(this.form).subscribe(post => {
          console.log(post);},
          error => {
            console.log(error);
          }
        );
        var resetForm:HTMLFormElement;
        resetForm = <HTMLFormElement>document.getElementById('registrationForm');
        resetForm.reset();
        this.snackBar.open("Formularz został wysłany", "OK", {horizontalPosition: "center", verticalPosition: "bottom"});
      }
    }
  }
}

