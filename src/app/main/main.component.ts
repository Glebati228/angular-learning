import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../custom-validators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, first } from 'rxjs/operators'
import { Router } from '@angular/router'
import { AppCommonService } from '../_services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit 
{
  ngOnInit(): void 
  {

  }

  public frmSignup: FormGroup;
  regStatus : number;

  constructor(private fb: FormBuilder, 
              private http : HttpClient,
              private router : Router,
              private appService : AppCommonService) 
  {
    this.frmSignup = this.createSignupForm();

    this.appService.logout();
  }

  //reg form
  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        "login" : [
          null, Validators.compose([Validators.required,  CustomValidators.patternValidator(
            /^[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/,
            {
              hasSpecialCharacters: true
            }
          ),
          Validators.minLength(4)
        ])
        ],
        "email": [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        "password": [
          null,
          Validators.compose([
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        "confirmPassword": [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  submit() 
  {

    this.appService.reg(this.frmSignup.controls['email'].value, this.frmSignup.controls['password'].value)
    .pipe(first())
    .subscribe(item => 
      {
        if(item['Error'] == 0)
        {
          this.regStatus = 0;
          console.log("error");
          this.router.navigate(['/login']);
        }
        else if(item['Error'] == 1)
        {
          console.log("error1");
          this.regStatus = 1;
        }
      },
      error => console.error(error));

    // let result = this.http.post('http://26.178.226.82:8080/api/register', data, {headers : header}).toPromise().then(item => {
    //   console.log(item);
    //   console.log(document.cookie);
    //   if(item['Error'] == 0)
    //   {
    //     this.regStatus = 0;
    //     this.router.navigate(['/login'])
    //   }
    //   else if(item['Error'] == 1)
    //   {
    //     this.regStatus = 1;
    //   }
    // })
    // .catch(() => this.router.navigate(['/reg']));
  }
}