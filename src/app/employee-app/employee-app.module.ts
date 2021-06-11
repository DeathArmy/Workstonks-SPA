import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeAppRoutingModule } from './employee-app-routing.module';
import { EmployeeAppComponent } from './employee-app.component';
import { NabBarComponent } from './nab-bar/nab-bar.component';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [		
    EmployeeAppComponent,
      NabBarComponent,
      LoginComponent
   ],
  imports: [
    CommonModule,
    EmployeeAppRoutingModule
  ]
})
export class EmployeeAppModule { }
