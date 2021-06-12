import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'employeeApp', loadChildren: () => import('./employee-app/employee-app.module').then(m => m.EmployeeAppModule)},
  {path: '', loadChildren: () => import('./client-app/client-app.module').then(m => m.ClientAppModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
