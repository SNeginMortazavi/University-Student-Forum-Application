import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class RestApiService {

  constructor(private http: HttpClient) { }

  // getCourses(){
  //     return this.http.get('http://localhost:3100/course')
  //         .map(this.extractData)
  //         .catch(this.handleError);
  // }
  // private

  getHeaders() {
    const token = localStorage.getItem('token');
    return token ? new HttpHeaders().set('Authorization', token) : null;
  }

  get(link: string) {
    return this.http.get(link, { headers: this.getHeaders() }).toPromise();
  }

  post(link: string, body: any) {
    return this.http.post(link, body, { headers: this.getHeaders() }).toPromise();
  }
}
