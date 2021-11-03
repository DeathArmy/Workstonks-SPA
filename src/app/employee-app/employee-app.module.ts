import { LoginService } from './../services/login.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCommonModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { EmployeeAppRoutingModule } from './employee-app-routing.module';
import { EmployeeAppComponent } from './employee-app.component';
import { NabBarComponent } from './nab-bar/nab-bar.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EditConfigComponent } from './editConfig/editConfig.component';
import { TicketComponent } from './ticket/ticket.component';
import { TicketOverlayComponent } from './ticket-overlay/ticket-overlay.component';


@NgModule({
  declarations: [
    EmployeeAppComponent,
    NabBarComponent,
    LoginComponent,
    HomeComponent,
    EditConfigComponent,
    TicketComponent,
    TicketOverlayComponent
   ],
  imports: [
    CommonModule,
    EmployeeAppRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatCheckboxModule,
    OverlayModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }},
    LoginService
  ]
})
export class EmployeeAppModule { }
