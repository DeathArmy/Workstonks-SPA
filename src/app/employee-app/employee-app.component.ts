import { LoginService } from './../services/login.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-app',
  templateUrl: './employee-app.component.html',
  styleUrls: ['./employee-app.component.css']
})
export class EmployeeAppComponent implements OnInit {

  constructor(private router: Router, private ls: LoginService) {
    if (sessionStorage.getItem('token')) router.navigate(['employeeApp/home']);
    else router.navigate(['employeeApp/login']);
   }

  ngOnInit(): void {
  }

}
