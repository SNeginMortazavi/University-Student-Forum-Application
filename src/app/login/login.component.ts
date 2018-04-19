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
    // email:string = 'negin@gmail.com';
    // password:string = 'abc123';

    email:string;
    password:string;
  
    btnDisabled = false;
  
    constructor(
      private router: Router,
      private rest: RestApiService,
      private data: DataService,
    ) {}

    ngOnInit() {}

    validate() {
        if (this.email) {
          if (this.password) {
            return true;
          } else {
            this.data.error('Password is not entered');
          }
        } else {
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