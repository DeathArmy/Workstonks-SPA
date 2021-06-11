import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-app',
  templateUrl: './employee-app.component.html',
  styleUrls: ['./employee-app.component.css']
})
export class EmployeeAppComponent implements OnInit {

  constructor(private router: Router) {
    router.navigate(['/login']);
   }

  ngOnInit(): void {
  }

}
