import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { routerTransition } from "../../../../router.animations";

import { DataService } from "../../../../data.service";
import { RestApiService } from "../../../../rest-api.service";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

@Component({
    selector: "app-collapse",
    templateUrl: "./collapse.component.html",
    styleUrls: ["./collapse.component.scss"],
    animations: [routerTransition()]
})
export class CollapseComponent implements OnInit {
    public courses: any[];

    constructor(
        private router: Router,
        private rest: RestApiService,
        private data: DataService,
        private http: HttpClient
    ) {}

    async ngOnInit() {
        try {
            const data = await this.rest.get(
                'http://localhost:3030/api/courses'
            );
            console.log(data);
data['success']? (this.courses = data['courses']):this.data.error(data['message']);



        }catch(error){
            this.data.error(error['message']);
            console.log(error);
            console.log(this.data.error);

        }
        console.log(this.courses);
        // this.buildCourses(this.courses);
    }

    buildCourses(courses: any) {
        for (let course of courses) {
            course.expand = false;
        }
    }
}
