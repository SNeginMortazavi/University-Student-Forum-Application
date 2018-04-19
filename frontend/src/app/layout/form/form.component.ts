import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
// import { DataService } from ' ../../data.service';
// import { RestApiService } from '../../rest-api.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss'],
    animations: [routerTransition()]
})
export class FormComponent implements OnInit {
    public Courses = [{}];
    public Semesters = [{name: '2017 Spring'},
        {name: '2017 Summer'}
    ];
    public Title = '';
    public Description = '';
    constructor( ) {
  }

    ngOnInit() {
        // this.Courses = this.rest.get(
        //     'http://localhost:3030/aping/courses') ;
    }
}
