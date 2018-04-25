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
    public Title = '';
    public Description = '';
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
        this.getCourses(semObj);
    }

    async getCourses(semObj:any){
        try {
            const data = await this.rest.get(
                'http://localhost:3030/api/semesters/' + semObj._id
            );
            data['success']? (this.Courses = data['courses']):this.data.error(data['message']);


        }catch(error){
            this.data.error(error['message']);
            console.log('error');

        }
    }
}
