import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarService } from 'src/app/services/calendar.service';
import { userService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data = new Date();
  userCount:number = 0;
  freeTime:number = 0;

  constructor(private _userService: userService, private _calendarService: CalendarService) {
    this._userService.getUserList().subscribe(response => {
      this.userCount = response.length;
    },
    error => {
      console.log(error)
    });
    this._calendarService.getReservedTime(this.data).subscribe(response => {
      let dummyVar: number = 0;
      for (let record of response)
      {
        dummyVar += record.hours!;
      }
      if(this.data.getDay() == 0) this.freeTime = 0;
      else if(this.data.getDay() == 6) this.freeTime = (this.userCount * 4) - dummyVar;
      else this.freeTime = (this.userCount * 6) - dummyVar;
    },
    error => {
      console.log(error);
    }
    )
  }

  ngOnInit() {
  }

}
