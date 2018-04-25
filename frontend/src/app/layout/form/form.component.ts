import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
// import { DataService } from ' ../../data.service';
// import { RestApiService } from '../../rest-api.service';
import {Router} from '@angular/router';
import {DataService} from "../../data.service";
import {HttpClient} from "@angular/common/http";
import {RestApiService} from "../../rest-api.service";

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    public Courses : any[];
    public Semesters : any[];
    public semester:any;
    public course:any;
    public Title : any;
    public rate = 5;
    public semesterID:any;
    public Description : any;
    constructor(private router: Router,
                private rest: RestApiService,
                private data: DataService,
                private http: HttpClient ) {
  }

    async ngOnInit() {
        try {
            const data = await this.rest.get(
                'http://localhost:3030/api/semesters'
            );
            data['success']? (this.Semesters = data['semesters']):this.data.error(data['message']);

        }catch(error){
            this.data.error(error['message']);
            console.log('error');

        }
    }

    setSemester(semObj:any){
        this.semester= semObj;
        console.log('here set semester'+this.semester);
        this.getCourses( );
    }

    async getCourses(){
        for(let sem of this.Semesters){
            if(sem.name === this.semester){
                this.semesterID=sem._id;
                break;
            }
        }
        try {
            const data = await this.rest.get(
                'http://localhost:3030/api/semesters/' + this.semesterID
            );
            data['success']? (this.Courses = data['courses']):this.data.error(data['message']);
            console.log(data['courses']);
            console.log(this.Courses);

        }catch(error){
            this.data.error(error['message']);
            console.log('error');

        }
    }

    setCourse(courseS:any){
        this.course=courseS;
        console.log('here set course'+this.course);
    }
    setRate(rateSelect:any){
        this.rate=rateSelect;
    }
    async updateReview(){
        var token = localStorage.token;
            // this.AuthToken.getToken();
        console.log('review :'+this.Title+this.rate+this.Description+this.course);

        try {
        const data = await this.rest.post(
            'http://localhost:3030/api/review',

            {

        title: this.Title,
                rating: this.rate,
                description: this.Description,
                course: this.course
            }
        );
            console.log(data);
        }catch(error){
            this.data.error(error['message']);
            console.log('error');

        }


    }
}
