import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeAppRoutingModule } from './employee-app-routing.module';
import { EmployeeAppComponent } from './employee-app.component';


@NgModule({
  declarations: [
    EmployeeAppComponent
  ],
  imports: [
    CommonModule,
    EmployeeAppRoutingModule
  ]
})
export class EmployeeAppModule { }
