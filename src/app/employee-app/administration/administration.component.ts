import { User } from './../../Models/User';
import { userService } from './../../services/user.service';
import { Component, OnInit, SystemJsNgModuleLoader } from '@angular/core';
import { Role } from 'src/app/Models/Role';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.css']
})
export class AdministrationComponent implements OnInit {

  userList: Array<User> = [];
  roleList: Array<Role> = [];
  userSelection: Array<boolean> = [];
  selectedAllUsers: boolean = false;
  roleSelection: Array<boolean> = [];
  selectedAllRoles: boolean = false;
  newUser = new User();
  addingNewUser: boolean = false;
  addingNewRole: boolean = false;

  constructor(private _userService: userService)
  {
    this.dataLoad();
  }

  dataLoad() {
    this._userService.getUserList().subscribe(response => {
      this.userList = response;
      for(let user of this.userList) this.userSelection.push(false);
    },
    error => {
      console.log(error);
    });
    this._userService.getRoles().subscribe(response => {
      this.roleList = response;
    },
    error => {
      console.log(error);
    });
  }

  ngOnInit(): void {
  }

  blockUser() {
    for(let i=0; i < this.userList.length; i++)
    {
      if(this.userSelection[i])
      {
        this._userService.blockUser(this.userList[i].id!).subscribe(response => {
          console.log(response);
          this.userList[i].dateOfTerminationOfEmployment = new Date();
          this._userService.editUser(this.userList[i]).subscribe(r => {
            console.log(r);
          },
          error => {
            console.log(error);
          })
        },
        error => {
          console.log(error);
        });
      }
    }
    window.setTimeout(() => {this.dataLoad()}, 300);
  }

  saveChanges() {
    for(let i=0; i < this.userList.length; i++)
    {
      if(this.userSelection[i])
      {
        this._userService.editUser(this.userList[i]).subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });
      }
    }
    window.setTimeout(() => {this.dataLoad()}, 300);
  }

  selectionChange(id: number) {
    this.userSelection[id] = !this.userSelection[id];
  }

  selectAllUserCheckboxes() {
    this.selectedAllUsers = !this.selectedAllUsers;
    if(this.selectedAllUsers) for(let i = 0; i < this.userSelection.length; i++) this.userSelection[i] = true;
    else for(let i = 0; i < this.userSelection.length; i++) this.userSelection[i] = false;
  }

  newUserAction() {
    this.addingNewUser = !this.addingNewUser;
  }

  addUserAction() {
    this._userService.addUser(this.newUser).subscribe(response => {
      console.log(response);
      this.newUser = new User();
      this.dataLoad();
      this.addingNewUser = false;
    },
    error => {
      console.log(error);
    });
  }
}
