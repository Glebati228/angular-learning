import { Component, ErrorHandler } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from './custom-validators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators'
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public frmSignup: FormGroup;
  
  

  constructor(private fb: FormBuilder, private http : HttpClient) {
    this.frmSignup = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        // login : [
        //   null, Validators.compose([Validators.required,])
        // ],
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

  submit() {

    let header = new HttpHeaders();
    header.append('Content-type', 'application/json');
    header.append('Access-Control-Allow-Origin', '*');
    header.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');

    // this.http.post('http://26.178.226.82:8080/api/register', JSON.stringify(data.value), {headers : header})
    // .toPromise()
    // .then(data => console.log(data))
    // .catch(error => console.log(error));

    let data = { email : this.frmSignup['email'], password : this.frmSignup['password']};

    this.http.post('http://26.178.226.82:8080/api/register', data).toPromise().then(item => console.log(item)); 

    console.log(this.frmSignup.value);
  }
}
