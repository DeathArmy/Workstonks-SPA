import { TaskDetailsComponent } from './task-details/task-details.component';
import { AdministrationComponent } from './administration/administration.component';
import { ReportsComponent } from './reports/reports.component';
import { KanbanComponent } from './kanban/kanban.component';
import { EditConfigComponent } from './editConfig/editConfig.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAppComponent } from './employee-app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: '', component: EmployeeAppComponent, children: [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'config', component: EditConfigComponent},
  {path: 'kanban', component: KanbanComponent},
  {path: 'reports', component: ReportsComponent},
  {path: 'administration', component: AdministrationComponent},
  {path: 'task-details/:id', component: TaskDetailsComponent}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeAppRoutingModule { }
