import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { User, Role } from '../../typings';
import { config } from '../../typings'

@Injectable({providedIn : 'root'})
export class UserService
{
    header : HttpHeaders;

    constructor(private http : HttpClient)
    {
        this.header = new HttpHeaders();
        config.headers.forEach(item => {
            this.header.append(item.h, item.d);
        });
    }

    getAll()
    {
        // let users = []; 
        // this.http.get<any>(config.API.getAll, {headers : this.header})
        //  .toPromise()
        //  .then(item => 
        //     {
        //         let user = new User();
        //         user.email = item['Email'];
        //         user.role = Role.User;
        //         users.push(user);
        //     })
        //  .catch(error => 
        //     {
        //         console.error(error);
        //     })
        //  .finally(() => {
        //      return users;
        //  });
        return this.http.get<any>(config.API.getAll, {headers : this.header})
    }

    getById(id : string)
    {
        this.http.get<any>(config.API.getByID.concat(id), { headers : this.header})
        .pipe(first())
        .subscribe(item =>{
            let user = new User();
            user.email = item['Email'];
            user.role = Role.Admin;
            return user;
        });

        return null;
    }

    getByEmail(email : string)
    {
        this.http.get<any>(config.API.getByEmail.concat(email), {headers : this.header})
        .pipe(first())
        .subscribe(item => 
            {
                let user = new User();
                user.email = item['Email'];
                user.role = Role.User;

                return user;
            });
    }
}