import { EditConfigComponent } from './editConfig/editConfig.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAppComponent } from './employee-app.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [{ path: '', component: EmployeeAppComponent, children: [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, children:[
    {path: 'config', component: EditConfigComponent, outlet: "content"}
    // {path: 'config', component: EditConfigComponent}
  ]},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeAppRoutingModule { }
