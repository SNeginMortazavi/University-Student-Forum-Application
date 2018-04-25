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
    searchContent: string;

    constructor(
        private router: Router,
        private rest: RestApiService,
        private data: DataService,
        private http: HttpClient
    ) {}

    ngOnInit(){
        if(localStorage.getItem("searchContent") == null){
            this.onGetAll();
        }else{
            var searchContent = localStorage.getItem("searchContent");
            this.searchContent = searchContent;
            console.log("searchContent is: " + searchContent);
            this.onSearch();
        }
        // var searchContent = localStorage.getItem("searchContent");
        // console.log("searchContent is: " + searchContent);
        // // this.onGetAll();
        // if(searchContent == null){
        //     this.onGetAll();
        // }else{
        //     this.onSearch();
        // }
    }

    async onGetAll() {
        console.log("get all!")
        try {
            const data = await this.rest.get(
                "http://localhost:3030/api/courses"
            );
            console.log(data);
            data["success"]
                ? (this.courses = data["courses"])
                : this.data.error(data["message"]);
            for(let course of this.courses){
                console.log(course.name);
            console.log(course.reviews);}
        } catch (error) {
            this.data.error(error["message"]);
            console.log(error);
            console.log(this.data.error);
        }
        console.log(this.courses);
        this.buildCourses(this.courses);
    }

    async onSearch() {
        console.log("search!");
        console.log(this.searchContent);
        const data = await this.rest.get(
            "http://localhost:3030/api/search/course?query=" + this.searchContent
        );
        if (data["success"]) {
            console.log("data is: ");
            console.log(data["content"]["hits"]);
            this.courses = data["content"]["hits"];
        } else {
            console.log("connot get data");
            this.data.error(data["message"]);
        }
    }

    buildCourses(courses: any) {
        for (let course of courses) {
            course.expand = false;
        }
    }
}
