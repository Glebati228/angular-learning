import { CanActivate, ActivatedRouteSnapshot, CanDeactivate, Router } from '@angular/router';
import {RouterStateSnapshot, UrlTree, } from '@angular/router'
import {Observable} from 'rxjs'
import { Injectable } from '@angular/core';
import { AppCommonService } from './auth.service';
import { CookieService } from './cookie.service';

@Injectable({providedIn : 'root'})
export class AuthGuard implements CanActivate
{

    constructor(
        private appService : AppCommonService,
        private router : Router,
        private cookie : CookieService
        )
    {
        //this.router.events.subscribe(e => console.log(this.router.routerState.snapshot.root.data));
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean 
    {
        let currentUser = this.appService.currentUserValue.value;
        console.log(this.appService.currentUserValue.value);
        // console.log(this.cookie.get());
        if(currentUser)
        {
            // if(this.router.routerState.snapshot.root.data && this.router.routerState.snapshot.root.data.role === Role.User)
            // {
            //     return true;
            // }

            return true;
        }

        this.router.navigate(['/login'], {queryParams : { returnUrl : state.url}});
        return false;
    }
}