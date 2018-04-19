import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../../router.animations';

import { DataService } from '../../../../data.service';
import { RestApiService } from '../../../../rest-api.service';
import {HttpClient} from '@angular/common/http';

@Component({
    selector: 'app-collapse',
    templateUrl: './collapse.component.html',
    styleUrls: ['./collapse.component.scss'],
    animations: [routerTransition()]
})
export class CollapseComponent  implements OnInit {

public Courses = [{name: 'Algorithm', instructor: 'Phile', number: 'CS5800',
    description: 'a good class', credit: '2', semester: 'Spring',
reviews: 'here', isCollapsed: true},
    {name: 'Algorithm', instructor: 'Phile', number: 'CS5800',
        description: 'a good class', credit: '2', semester: 'Spring',
        reviews: 'here', isCollapsed: true}];
    //
    // name: { type: String, unique: true },
    // instructor: String,
    // number: String, //course number
    // description: String,
    // credit: Number,
    // semester: { type: Schema.Types.ObjectId, ref: 'Semester'},
    // reviews: [{ type: Schema.Types.ObjectId, ref: 'Review'}],
    // created: {

    constructor(
        private router: Router,
        private rest: RestApiService,
        private data: DataService,
        private http: HttpClient,
    ) {}

    ngOnInit() {
        // this.RestApiService.getCourses()
        //     .subscribe(
        //      Courses => this.Courses = Courses,
        //         error =>  this.errorMessage = <any>error);
    }

}
