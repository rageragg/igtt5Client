import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IUserData } from '../interfaces/iuser-data.interface';
import { IUser, IApiJData, IApiJDataUser, IApiJListUser } from '../interfaces/iuser.interface';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _baseUrl: string = environment.baseUrl;
  private _user: IUser = {
    id: '',
    name: '',
    email: '',
    valid: '',
    rol: '',
    apiToken: '',
    device_id:'',
  };
  private _userData: IUserData = {
    data: {
      id: '',
      name: '',
      email: '',
      valid: '',
      rol: '',
      apiToken: '',
      device_id:'',
    }
  };

  private _listUserData: IApiJListUser = { data: [] };

  private _subjectUser: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this._user);
  public readonly _observableUser: Observable<IUser> = this._subjectUser.asObservable();

  constructor( private http: HttpClient ) { }

  get user(): IUser {
    return { ...this._user };
  }

  get token(): string | null {
    return localStorage.getItem('token');
  }

  setUserInfo( user: IUser ): void {
    localStorage.setItem('token', user.apiToken!);
    this._user = user;
    this._subjectUser.next(this._user);
  }

  login( email: string, password: string ): Observable<string> {

    const url : string = `${ this._baseUrl }/login`;
    const body = { email: email, password: password, device_id: 'rage-001' };

    // se trata la respuesta en procesos de cascadas, primero
    //  tap, luego map y si hay error catch
    return this.http.post<IUserData>( url, body )
               .pipe(
                  tap( resp => {

                    if( resp.data ) {
                      this.setUserInfo( resp.data );
                    }
                  }),
                  map( resp => {
                    if( resp.data  ) {
                      return 'OK'
                    } else {
                      return 'ERROR'
                    }
                  }),
                  catchError( resp => {
                    let msg: string = '';

                    if(resp.error) {
                      if(resp.error.errors.length > 0 ) {
                        msg = resp.error.errors[0]!.title;
                        msg = `${ resp.statusText } (${ resp.error.errors[0]!.detail } )`;
                      }
                    }
                    return of(msg);
                  } )
               );

  }

  logout(): void {
    localStorage.removeItem('token');
    this._user = {
      id: '',
      name: '',
      email: '',
      valid: '',
      rol: '',
      apiToken: '',
      device_id:'',
    };
    this._subjectUser.next(this._user);
  }

  apiToken( apiToken: string ): Observable<string> {

    const url : string = `${ this._baseUrl }/token`;
    const body = { apiToken: apiToken };

    // se trata la respuesta en procesos de cascadas, primero
    //  tap, luego map y si hay error catch
    return this.http.post<IUserData>( url, body )
               .pipe(
                  tap( resp => {

                    if( resp.data ) {
                      this.setUserInfo( resp.data );
                    }
                  }),
                  map( resp => {
                    if( resp.data  ) {
                      return 'OK'
                    } else {
                      return 'ERROR'
                    }
                  }),
                  catchError( resp => {
                    let msg: string = '';

                    if(resp.error) {
                      if(resp.error.errors.length > 0 ) {
                        msg = resp.error.errors[0]!.title;
                        msg = `${ resp.statusText } (${ resp.error.errors[0]!.detail } )`;
                      }
                    }
                    return of(msg);
                  } )
               );

  }

  register( name: string, email: string, password: string, rol: string): Observable<string> {
    const url : string = `${ this._baseUrl }/users`;
    const user: IUser = {
        name: name,
        email: email,
        password: password,
        device_id: 'rage-001',
        rol: rol
    }
    const data: IApiJData = {
        type: 'users',
        attributes: user
    }

    const body:  IApiJDataUser = {
      data: data
    }

    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type':  'application/vnd.api+json',
        'Authorization': `Bearer ${ this._user.apiToken! }`
      })
    };

    // se trata la respuesta en procesos de cascadas, primero
    //  tap, luego map y si hay error catch
    return this.http.post<IApiJDataUser>( url, body, httpOptions )
               .pipe(
                  map( resp => {
                    if( resp.data  ) {
                      console.log( resp.data );
                      return 'OK'
                    } else {
                      return 'ERROR'
                    }
                  }),
                  catchError( resp => {
                    let msg: string = '';

                    console.log(resp);

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

  listUsers(): Observable<String> {

    const url : string = `${ this._baseUrl }/users`;
    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type':  'application/vnd.api+json',
        'Authorization': `Bearer ${ this._user.apiToken! }`
      })
    };

    console.log( this._user );

    return this.http.get<IApiJListUser>( url, httpOptions )
    .pipe(
       map( resp => {
         if( resp.data  ) {
           this._listUserData.data = resp.data;
           console.log( this._listUserData.data );
           return 'OK'
         } else {
          this._listUserData.data = [];
          return 'ERROR'
         }
       }),
       catchError( resp => {
         let msg: string = '';

         console.log(resp);

         if(resp.error) {
           if(resp.error.errors?.length > 0 ) {
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

  get listUserData() {
    return this._listUserData.data;
  }

}
