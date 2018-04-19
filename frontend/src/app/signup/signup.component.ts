import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../router.animations';

import { RestApiService } from '../rest-api.service';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    animations: [routerTransition()]
})
export class SignupComponent implements OnInit {
  name:String;
  email:String;
  password:String;
  password1:String;
  // isSeller = false;
  alreadyExist:Boolean;
  nameIsValid:boolean;
  emailIsValid:boolean;
  passwordIsValid:boolean;
  password1IsValid:boolean;
  passwordMatch:boolean;

  btnDisabled = false;

  constructor(
    private router: Router,
    private data: DataService,
    private rest: RestApiService,
  ) {}

  ngOnInit() {
    this.alreadyExist = false;
    this.nameIsValid = true;
    this.emailIsValid = true;
    this.passwordIsValid = true;
    this.password1IsValid = true;
    this.passwordMatch = true;
  }

  validate() {
    if (this.name) {
      this.nameIsValid = true;
      if (this.email) {
        this.emailIsValid = true;
        if (this.password) {
          this.passwordIsValid = true;
          if (this.password1) {
            this.password1IsValid = true;
            if (this.password === this.password1) {
              this.passwordMatch = true;
              return true;
            } else {
              this.passwordMatch = false;
              this.data.error('Passwords do not match.');
            }
          } else {
            this.password1IsValid = false;
            this.data.error('Confirmation Password is not entered');
          }
        } else {
          this.passwordIsValid = false;
          this.data.error('Password is not entered');
        }
      } else {
        this.emailIsValid = false;
        this.data.error('Email is not entered.');
      }
    } else {
      this.nameIsValid = false;
      this.data.error('Name is not entered.');
    }
  }

  async onRegister() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {
        console.log(this.name);
        console.log(this.email);
        console.log(this.password);
        const data = await this.rest.post(
          'http://localhost:3030/api/accounts/signup',
          {
            name: this.name,
            email: this.email,
            password: this.password,
            // isSeller: this.isSeller,
          },
        );
        if (data['success']) {
          localStorage.setItem('token', data['token']);
          this.data.success('Registration successful!');
          console.log("Registration successful!")
          this.router.navigate(['/login']);
        } else {
          this.data.error(data['message']);
          this.alreadyExist = true;
          console.log("Acount already exist!");
        }
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }

  onLogIn(){
    this.router.navigate(['/login']);
  }
}
