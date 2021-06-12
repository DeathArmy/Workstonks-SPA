import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';

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
  constructor(private ls: LoginService, private router: Router) {
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
      //console.log(post);
      sessionStorage.setItem('token', post.token.valueOf());
      this.localRouter.navigate(['employeeApp/home']);
    })

  }

}

export class credentials {
  username?: string;
  password?: string;
}
