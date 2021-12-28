import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  username = "";
  password = "";
  loginService: LoginService;
  localRouter: Router;
  constructor(private ls: LoginService, private router: Router, private _snackBar: MatSnackBar) {
    this.loginService = ls;
    this.localRouter = router;
  }

  ngOnInit() {
  }

  login(){
    let temp = new credentials();
    temp.username = this.username;
    temp.password = this.password;
    this.loginService.postLogin(temp).subscribe(post => {
      sessionStorage.setItem('token', post.token.valueOf());
      this.localRouter.navigate(['employeeApp/home']);
    },
    (erorr) => {
      this._snackBar.open("Błędny login lub hasło!",'OK',{duration: 3000})
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key.toString());
    if(event.key.toString() == 'Enter') this.login();
  }

}

export class credentials {
  username?: string;
  password?: string;
}
