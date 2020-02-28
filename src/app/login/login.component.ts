import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AppCommonService } from '../_services/auth.service'
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  form : FormGroup;
  emailKey : string;
  returnUrl : string;
  submitted : boolean;
  error: any;

  constructor(
    private fb : FormBuilder, 
    private http : HttpClient, 
    private router : Router,
    private route : ActivatedRoute,
    private appService : AppCommonService) 
  { 
    if(this.appService.currentUserValue.value)
    {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void 
  {
    this.form = this.fb.group({
      rememberMe : [false],
      email : [''],
      password : [''],
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  submit()
  {    
    this.appService.login(this.form.get('email').value, this.form.get('password').value, this.form.get('rememberMe').value)
    .pipe(first())
    .subscribe(
      data => {
        if(data === undefined)
        {
          this.router.navigate(['/login']);
          this.submitted = false;
        }
        else
        {
          console.log(data);
          document.cookie = data.email;
          this.router.navigate(['/news']);
          this.submitted = true;
        }
      }
    );

    // this.http.post('http://26.178.226.82:8080/api/login', data, {headers : header}).toPromise().then(item => {
    //   this.emailKey = "";
    //   if(item['Error'] == 0)
    //   {
    //     this.emailKey = JSON.stringify(this.form.get('email').value);
    //     document.cookie = this.emailKey;
    //     this.logStatus = 0;
    //     this.router.navigate(['/news'])
    //   }
    //   else if(item['Error'] == 1)
    //   {
    //     this.logStatus = 1;
    //     this.router.navigate(['/login']);
    //   }
    // })
    // .catch(error => {
    //   this.router.navigate(['/login'])
    //   console.error(error)
    // })
    // .finally();
  }
}