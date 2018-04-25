import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../../../../router.animations';

import { DataService } from '../../../../data.service';
import { RestApiService } from '../../../../rest-api.service';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  constructor(private router: Router,
              private rest: RestApiService,
              private data: DataService,
              private http: HttpClient,) { }
  public semesters: any[];
  public courses: any[];
  public semester:any;
  public semesterID: any;
    async ngOnInit() {
      try {
          const data = await this.rest.get(
              'http://localhost:3030/api/semesters'
          );
          data['success']? (this.semesters = data['semesters']):this.data.error(data['message']);


      }catch(error){
          this.data.error(error['message']);
          console.log('error');

      }
  }
  setSemesterName(name:any){
        this.semester=name;
  }
  async onClick(){
        for(let sem of this.semesters){
            if(sem.name === this.semester){
                this.semesterID=sem._id;
                break;
            }
        }
      try {
          const data = await this.rest.get(
              'http://localhost:3030/api/semesters/' + this.semesterID
          );
          data['success']? (this.courses = data['courses']):this.data.error(data['message']);


      }catch(error){
          this.data.error(error['message']);
          console.log('error');

      }

  }

}
