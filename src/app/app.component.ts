import { Component } from '@angular/core';
import { AppCommonService } from './_services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './_services/user.service';
import { User, Role } from 'src/typings';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  currentUser : any;

  constructor(
    private appService : AppCommonService,
    private router : Router,
    private userService : UserService
    )
  {
    this.appService.currentUser.subscribe(item => this.currentUser = item);
    this.checkSession();
  }
  
  Signout()
  {
    if(!this.appService.currentUserValue)
    {
      this.router.navigate(['/']);
      return;
    }
    this.appService.logout();
    this.router.navigate(['/login']);
  }


  checkSession()
  {
    this.userService.getAll()
    .toPromise()
    .then(item => 
      {
        item.forEach(element => {
          if(element['Email'] === document.cookie)
          {
            let user = new User();
            user.email = element['Email'];
            user.role = Role.Admin;
            this.appService.currentUserValue.next(user);
            return;    
          }
        });
      })
    .catch(error => console.log(error));
  }
}
