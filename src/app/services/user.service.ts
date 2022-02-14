import { Role } from './../Models/Role';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Jwt } from '../Models/Jwt';
import { User } from '../Models/User';

@Injectable()
export class userService {
    private urlString: string = "https://workstonks.herokuapp.com/api/Auth";

    constructor(private http: HttpClient) {  }

    addUser(user: User) : Observable<any> {
      let token = sessionStorage.getItem('token');
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      let tempUrl = this.urlString + '/register';
      return this.http.post<any>(tempUrl, user, header);
      }

    passwordChange(currentPass: string, newPass: string) : Observable<any> {
      let token = sessionStorage.getItem('token')!;
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };
      const decoded = jwtDecode<JwtPayload>(token);
      var jwtObject: Jwt = decoded as Jwt;
      let data: passChange = {'id': jwtObject.nameid!, 'currentPassword': currentPass, 'newPassword': newPass};

      let tempUrl = this.urlString + '/changePassword';
      return this.http.put<any>(tempUrl, data, header);
    }

    getUserList() : Observable<Array<User>> {
      let token = sessionStorage.getItem('token')!;
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      let tempUrl = 'https://workstonks.herokuapp.com/api/Employee/employees';
      return this.http.get<Array<User>>(tempUrl, header);
    }

    blockUser(id: number) : Observable<any> {
      let token = sessionStorage.getItem('token')!;
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      let tempUrl = this.urlString + `/user?userId=${id}`;
      return this.http.delete<any>(tempUrl, header);
    }

    editUser(user: User) : Observable<any> {
      let token = sessionStorage.getItem('token')!;
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      let tempUrl = 'https://workstonks.herokuapp.com/api/Employee/employee';
      return this.http.put<any>(tempUrl, user, header);
    }

    addUserRole(userId: number, roleName: string) : Observable<any> {
      let token = sessionStorage.getItem('token')!;
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      let userRole: addedRole = {'userId': userId, 'roleName': roleName};

      let tempUrl = this.urlString + '/user/role';
      return this.http.post<any>(tempUrl, userRole, header);
    }

    deleteUserRole(userId: number, roleName: string) : Observable<any> {
      let token = sessionStorage.getItem('token')!;
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      let tempUrl = this.urlString + `/user/role?userId=${userId}&roleName=${roleName}`;
      return this.http.delete<any>(tempUrl, header);
    }

    getRoles() : Observable<Array<Role>> {
      let token = sessionStorage.getItem('token')!;
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      let tempUrl = this.urlString + '/roles';
      return this.http.get<Array<Role>>(tempUrl, header);
    }

    addRole(role: Role) : Observable<any> {
      let token = sessionStorage.getItem('token')!;
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      let tempUrl = this.urlString + '/role';
      return this.http.post<any>(tempUrl, role, header);
    }

    deleteRole(roleName: string) : Observable<any> {
      let token = sessionStorage.getItem('token')!;
      var header = {
        headers: new HttpHeaders().set('Authorization', `Bearer ${token? token : ''}`)
      };

      let tempUrl = this.urlString + `/role/name=${roleName}`;
      return this.http.delete<any>(tempUrl, header);
    }
}

interface passChange {
    id: number,
    currentPassword: string,
    newPassword: string
}

interface addedRole {
  userId: number,
  roleName: string
}
