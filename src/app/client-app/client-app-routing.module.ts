import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientAppComponent } from './client-app.component';
import { HomeComponent } from './home/home.component';
import { PricesComponent } from './prices/prices.component';
import { FormComponent } from './form/form.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [{ path: '', component: ClientAppComponent, children: [
  {path: 'home', component: HomeComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'tracking', component: TrackingComponent},
  {path: 'form', component: FormComponent},
  {path: 'pricelist', component: PricesComponent}]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientAppRoutingModule { }
