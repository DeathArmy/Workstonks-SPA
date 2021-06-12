import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientAppRoutingModule } from './client-app-routing.module';
import { ClientAppComponent } from './client-app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';


@NgModule({
  declarations: [
    ClientAppComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    ClientAppRoutingModule
  ]
})
export class ClientAppModule { }
