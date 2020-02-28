import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, first } from 'rxjs/operators'
import { config, Role, User } from '../../typings'

@Injectable({providedIn : 'root'}) 
export class AppCommonService 
{
  private currentUserSubject : BehaviorSubject<User>;
  private headers : HttpHeaders;
  public currentUser : Observable<User>;

  constructor(
    private http : HttpClient) 
  {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

    this.headers = new HttpHeaders();
    config.headers.forEach(item => 
    {
      this.headers.append(item.h, item.d);
    });
  }

  public get currentUserValue()
  {
      return this.currentUserSubject;
  }
 
  login(email, password, rememberMe)
  {
    return this.http.post<any>(config.API.login, { "Email" : email, "Password" : password, "RememberMe" : rememberMe}, {headers : this.headers})
    .pipe(map(user => {
        if(user['Error'] == 0)
        {
            let newUser = new User();
            newUser.role = Role.Admin;
            newUser.email = email;
            localStorage.setItem('currentUser', user['Error']);
            this.currentUserSubject.next(newUser);
            return newUser;
        }
    }));
  }

  reg(email, password)
  {
    return this.http.post<any>(config.API.register, { "Email" : email, "Password" : password}, {headers : this.headers})
    .pipe(map(user => 
        {
            return user;
        }));
  }

  logout()
  {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    document.cookie = '';
  }
}