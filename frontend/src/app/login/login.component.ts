import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';

import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})

export class LoginComponent implements OnInit {

    email:string;
    password:string;
    emailIsValid:boolean;
    passwordIsValid:boolean;
    canLogIn:boolean;
  
    btnDisabled = false;
  
    constructor(
      private router: Router,
      private rest: RestApiService,
      private data: DataService,
    ) {}

    ngOnInit() {
      this.emailIsValid = true;
      this.passwordIsValid = true;
      this.canLogIn = true;
    }

    validate() {
        if (this.email) {
          this.emailIsValid = true;
          if (this.password) {
            this.passwordIsValid = true;
            return true;
          } else {
            this.passwordIsValid = false;
            this.data.error('Password is not entered');
          }
        } else {
          this.emailIsValid = false;
          this.data.error('Email is not entered.');
        }
      }
      
      // onLoggedin() {
      //   localStorage.setItem('isLoggedin', 'true');
      //   this.router.navigate(['/']);
      // }

      async onLoggedin() {
        localStorage.setItem('isLoggedin', 'true');
        // this.btnDisabled = true;
        try {
          if (this.validate()) {
            // this.router.navigate(['/']);            
            console.log("is validate");
            console.log(this.email);
            console.log(this.password);
            const data = await this.rest.post(
              'http://localhost:3030/api/accounts/login',
              {
                email: this.email,
                password: this.password,
              },
            );
            if (data['success']) {
              localStorage.setItem('token', data['token']);
              this.router.navigate(['/']);
            } else {
              this.canLogIn = false;
              console.log("is not match any record");
              this.data.error(data['message']);
            }
          }
        } catch (error) {
          console.log(error);
          this.data.error(error['message']);
        }
        this.btnDisabled = false;
      }

    onSignup(){
      this.router.navigate(['/signup']);
    }

    onLoggedinAsVisitor(){
      localStorage.setItem('isLoggedin', 'true');
      this.router.navigate(['/']);
    }
}