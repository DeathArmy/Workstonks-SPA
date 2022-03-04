import { MatSnackBar } from '@angular/material/snack-bar';
import { PasswordComponent } from './password/password.component';
import { Jwt } from './../Models/Jwt';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { AdministrationComponent } from './administration/administration.component';
import { ReportsComponent } from './reports/reports.component';
import { KanbanComponent } from './kanban/kanban.component';
import { EditConfigComponent } from './editConfig/editConfig.component';
import { HomeComponent } from './home/home.component';
import { NgModule, Injectable } from '@angular/core';
import { CanActivate, RouterModule, Routes } from '@angular/router';
import { EmployeeAppComponent } from './employee-app.component';
import { LoginComponent } from './login/login.component';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { InvoicesComponent } from './invoices/invoices.component';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public _snackBar: MatSnackBar) {}
  canActivate() {
    let token = sessionStorage.getItem('token')!;
    const decoded = jwtDecode<JwtPayload>(token);
    var jwtObject: Jwt = decoded as Jwt;
    let roles: Array<string> = jwtObject.role!;
    let response = false;
    for(let role of roles) {
      if(role == 'Admin') response = true;
    }
    if (response) return true
    else
    {
      this._snackBar.open("Brak uprawnień!", "OK");
      console.log("Brak uprawnień!");
      return false;
    }
  }
}

const routes: Routes = [{ path: '', component: EmployeeAppComponent, children: [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'config', component: EditConfigComponent},
  {path: 'kanban', component: KanbanComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'administration', component: AdministrationComponent, canActivate: [AuthGuard]},
  {path: 'invoices', component: InvoicesComponent, canActivate: [AuthGuard]},
  {path: 'task-details/:id', component: TaskDetailsComponent},
  {path: 'password', component: PasswordComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeAppRoutingModule { }
