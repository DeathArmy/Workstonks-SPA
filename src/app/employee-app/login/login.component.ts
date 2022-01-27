import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credentials = new credentials();
  loginService: LoginService;
  localRouter: Router;
  loginEvent = new EventEmitter();

  constructor(private ls: LoginService, private router: Router, private _snackBar: MatSnackBar) {
    this.loginService = ls;
    this.localRouter = router;
  }

  ngOnInit() {
  }

  login(){
    this.loginService.postLogin(this.credentials).subscribe(post => {
      sessionStorage.setItem('token', post.token.valueOf());
      this.loginEvent.emit();
      this.localRouter.navigate(['employeeApp/home']);
    },
    (erorr) => {
      this._snackBar.open("Błędny login lub hasło!",'OK',{duration: 3000})
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key.toString() == 'Enter') this.login();
  }

}

export class credentials {
  username?: string;
  password?: string;
}
