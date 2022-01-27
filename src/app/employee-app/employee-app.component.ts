import { LoginService } from './../services/login.service';
import { Event, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-employee-app',
  templateUrl: './employee-app.component.html',
  styleUrls: ['./employee-app.component.css']
})
export class EmployeeAppComponent implements OnInit {

  loggedIn: boolean = false;

  constructor(private router: Router, private ls: LoginService) {
    if (sessionStorage.getItem('token')) 
    {
      this.loggedIn = true;
      router.navigate(['employeeApp/home']);
    }
    else 
    {
      this.loggedIn = false;
      router.navigate(['employeeApp/login']);
    }
   }

  ngOnInit(): void {
  }

  loginHappen(event: Event) {
    if(event instanceof LoginComponent)
    {
      event.loginEvent.subscribe(()=> this.loggedIn = true);
    }
  }

}
