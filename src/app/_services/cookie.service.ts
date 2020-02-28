import { Injectable } from "@angular/core";

@Injectable({providedIn : 'root'})
export class CookieService
{
    cookieData : any;

    constructor()
    {
    }

    get() : string
    {
        //this.cookieData = document.cookie.split(';')[1].replace(/\d/, "");
        return this.cookieData;
    }
}