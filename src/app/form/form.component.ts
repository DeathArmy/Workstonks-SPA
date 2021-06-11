import { FormService } from './../services/form.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [FormService]
})
export class FormComponent implements OnInit {

  vinFormControl = new FormControl('', [
    Validators.required
  ]);
  emailFormControl = new FormControl('', [
    Validators.email
  ]);
  vinErrorText = "Podanie numeru VIN jest niezbędne."

  form = new formFields;

  constructor(private fs: FormService) {
   }

  ngOnInit(): void {
  }

  getvinNumber(event: any){
    this.form.vin = event.target.value;
  }
  getmake(event: any){
    this.form.make = event.target.value;
  }
  getmodel(event: any){
    this.form.model = event.target.value;
  }
  getyearProduction(event: any){
    this.form.productionYear = event.target.value;
  }
  getengineDescription(event: any){
    this.form.engineDescription = event.target.value;
  }
  gethorsepower(event: any){
    this.form.power = event.target.value;
  }
  getdescription(event: any){
    this.form.description = event.target.value;
  }
  getname(event: any){
    this.form.customer.name = event.target.value;
  }
  getsurname(event: any){
    this.form.customer.surname = event.target.value;
  }
  getphoneNumber(event: any){
    this.form.customer.phoneNumber = event.target.value;
  }
  getemail(event: any){
    this.form.customer.email = event.target.value;
  }

  Submit() {
    this.fs.postForm(this.form).subscribe(post => {
      console.log(post);
    });
    //let resetForm: HTMLFormElement = <HTMLFormElement>document.getElementsByClassName('registrationForm');

    var resetForm:HTMLFormElement;
    resetForm= <HTMLFormElement>document.getElementById('registrationForm');
    resetForm.reset();
  }

}

export class formFields {
  vin?: string;
  make?: string;
  model?: string;
  productionYear?: string;
  engineDescription?: string;
  power?: number;
  description?: string;

  customer = new Customer;
}

export class Customer {
  id?: number;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  email?: string;
}
