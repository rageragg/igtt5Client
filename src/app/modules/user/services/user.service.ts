import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse   } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { User, UsersList } from '../interfaces/iuser-admin.interface';

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

  add( name: string, email: string, password: string, rol: string): Observable<string> {

    const apiToken  = localStorage.getItem('token');
    const url : string = `${ this._baseUrl }/users`;
    const user = {
        type: 'users',
        attributes: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password,
            rol: rol
        }
    }

    const body = {
      data: user
    }

    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type':  'application/vnd.api+json',
        'Authorization': `Bearer ${ apiToken }`
      })
    };

    // se trata la respuesta en procesos de cascadas, primero
    // tap, luego map y si hay error catch
    return this.http.post<User>( url, body, httpOptions )
               .pipe(
                  map( data => {
                    if( data.data.attributes  ) {
                      return 'OK'
                    } else {
                      return 'ERROR'
                    }
                  }),
                  catchError( ( resp: any ) => {
                    let msg: string = '';
                    if(resp.error) {
                      if(resp.error.errors.length > 0 ) {
                        msg = resp.error.errors[0]!.title;
                        msg = `${ resp.statusText } (${ resp.error.errors[0]!.detail } )`;
                      }
                    } else {
                      msg = 'Imposible procesar la peticion!';
                    }
                    return of(msg);
                  } )
               );

  }

  edit(id:string, name: string, email: string, password: string, rol: string): Observable<string> {

    const apiToken  = localStorage.getItem('token');
    const url : string = `${ this._baseUrl }/users/${ id }`;
    const user = {
        id: id,
        type: 'users',
        attributes: {
            name: name,
            email: email,
            password: password,
            password_confirmation: password,
            rol: rol
        }
    }

    const body = {
      data: user
    }

    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type':  'application/vnd.api+json',
        'Authorization': `Bearer ${ apiToken }`
      })
    };

    // se trata la respuesta en procesos de cascadas, primero
    // tap, luego map y si hay error catch
    return this.http.patch<User>( url, body, httpOptions )
               .pipe(
                  map( data => {
                    if( data.data.attributes  ) {
                      return 'OK'
                    } else {
                      return 'ERROR'
                    }
                  }),
                  catchError( ( resp: any ) => {
                    let msg: string = '';
                    if(resp.error) {
                      if(resp.error.errors.length > 0 ) {
                        msg = resp.error.errors[0]!.title;
                        msg = `${ resp.statusText } (${ resp.error.errors[0]!.detail } )`;
                      }
                    } else {
                      msg = 'Imposible procesar la peticion!';
                    }
                    return of(msg);
                  } )
               );

  }

  delete( id: string): Observable<string> {
    const apiToken  = localStorage.getItem('token');
    const url : string = `${ this._baseUrl }/users/${ id }`;

    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type':  'application/vnd.api+json',
        'Authorization': `Bearer ${ apiToken }`,
        'observe': 'response'
      })
    };

    return this.http.delete( url, httpOptions )
               .pipe(
                 map( () => {
                    return 'OK';
              }),
              catchError( ( response: HttpErrorResponse ) => {
                let msg: string = '';
                if(response?.message) {
                    msg = response.message;
                    msg = `${ response.statusText } (${ msg } )`;
                } else {
                  msg = 'Imposible procesar la peticion!';
                }
                return of(msg);
              } ))

  }

}
