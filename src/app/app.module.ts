import { kanbanTasksService } from './services/kanbanTasks.service';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayServiceService } from './services/overlayService.service';
import { userService } from './services/user.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { ConfigService } from './services/config.service';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackingComponent } from './client-app/tracking/tracking.component';
import { ContactComponent } from './client-app/contact/contact.component';
import { FormComponent } from './client-app/form/form.component';
import { HomeComponent } from './client-app/home/home.component';
import { PricesComponent } from './client-app/prices/prices.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    TrackingComponent,
    ContactComponent,
    FormComponent,
    HomeComponent,
    PricesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    HttpClientModule,
    OverlayModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatStepperModule,
    MatCheckboxModule
  ],
  providers: [{
    provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' }
   },
   ConfigService,
   OverlayServiceService,
   MatDatepickerModule,
   kanbanTasksService,
   userService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
