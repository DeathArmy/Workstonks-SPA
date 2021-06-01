import { HomeComponent } from './home/home.component';
import { PricesComponent } from './prices/prices.component';
import { FormComponent } from './form/form.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ContactComponent } from './contact/contact.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'tracking', component: TrackingComponent},
  {path: 'form', component: FormComponent},
  {path: 'pricelist', component: PricesComponent},
  {path: '', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
