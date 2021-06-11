import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAppComponent } from './employee-app.component';

const routes: Routes = [{ path: '', component: EmployeeAppComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeAppRoutingModule { }
