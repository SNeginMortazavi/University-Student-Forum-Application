import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../../router.animations';

import { DataService } from '../../../../data.service';
import { RestApiService } from '../../../../rest-api.service';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Component({
    selector: 'app-collapse',
    templateUrl: './collapse.component.html',
    styleUrls: ['./collapse.component.scss'],
    animations: [routerTransition()]
})
export class CollapseComponent  implements OnInit {

// public Courses = [{name: 'Algorithm', instructor: 'Phile', number: 'CS5800',
//     description: 'a good class', credit: '2', semester: 'Spring',
// reviews: 'here', isCollapsed: true},
//     {name: 'Algorithm', instructor: 'Phile', number: 'CS5800',
//         description: 'a good class', credit: '2', semester: 'Spring',
//         reviews: 'here', isCollapsed: true}];
    //
    // name: { type: String, unique: true },
    // instructor: String,
    // number: String, //course number
    // description: String,
    // credit: Number,
    // semester: { type: Schema.Types.ObjectId, ref: 'Semester'},
    // reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
    // created: {
    public courses : any[];
    dataget = {};
    constructor(
        private router: Router,
        private rest: RestApiService,
        private data: DataService,
        private http: HttpClient,
    ) {}

    ngOnInit() {

// let self =this;
//
//          this.rest.get(
//             'http://localhost:3030/api/courses'
//         ).then(data => this.courses = data['courses'] );
//
// console.log(this.courses);
//
//     }


        this.rest.get(
            'http://localhost:3030/api/courses'
        ).then( function (this, res){
           this.courses =  res['courses'];
        },function (err){});

        console.log(this.courses);
        // console.log(dataget)

        }





        // get(link: string) {
        //     return this.http.get(link, { headers: this.getHeaders() }).toPromise();
        // }
            // const data = await this.rest.post(
            // 'http://localhost:3030/api/accounts/login',
            // {
            //     email: this.email,
            //     password: this.password,
            // },
        // this.http.get(link, { headers: this.getHeaders() }).toPromise();
            // .getCourses()
            // .subscribe(
            //  Courses => this.Courses = Courses,
            //     error =>  this.errorMessage = <any>error);
    }


