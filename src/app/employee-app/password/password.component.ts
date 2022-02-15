import { MatSnackBar } from '@angular/material/snack-bar';
import { userService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  currentPass ="";
  newPass = "";

  constructor(private _userService: userService, private _matSnack: MatSnackBar) { }

  ngOnInit(): void {
  }

  changePassword() {
    this._userService.passwordChange(this.currentPass, this.newPass).subscribe(response => {
      console.log(response);
    },
    error => {
      this._matSnack.open("Nieprawidłowe hasło", "OK");
      console.log(error);
    })
  }
}
