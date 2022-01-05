import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

import { UsersList } from '../interfaces/iuser-admin.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _baseUrl: string = environment.baseUrl;

  constructor( private http: HttpClient ) { }

  allUsers(): Observable<UsersList> {

    const apiToken  = localStorage.getItem('token');
    const url : string = `${ this._baseUrl }/users`;
    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type':  'application/vnd.api+json',
        'Authorization': `Bearer ${ apiToken }`
      })
    };
    return this.http.get<UsersList>( url, httpOptions );

  }

  pageSortedList(pageIndex: number, pageSize: number, pageSort: string): Observable<UsersList> {

    const apiToken  = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type':  'application/vnd.api+json',
        'Authorization': `Bearer ${ apiToken }`
      })
    };

    pageIndex++;

    if( pageIndex === 0 ) {
      pageIndex = 1;
    }

    if(pageSize === 0) {
      pageSize = 5;
    }

    if( pageSort === undefined || pageSort === '' ) {
      pageSort='name';
    }
    const url : string = `${ this._baseUrl }/users?page[number]=${pageIndex}&page[size]=${pageSize}&sort=${pageSort}`;

    return this.http.get<UsersList>( url, httpOptions );

  }

}
