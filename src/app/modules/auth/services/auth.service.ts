import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject  } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { IUserData } from '../interfaces/iuser-data.interface';
import { IUser } from '../interfaces/iuser.interface';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private _baseUrl: string = environment.baseUrl;
  private _user: IUser = {
    id: 0,
    name: '',
    email: '',
    valid: '',
    rol: '',
    api_token: '',
    device_id:'',
  };
  private _userData: IUserData = {
    data: {
      id: 0,
      name: '',
      email: '',
      valid: '',
      rol: '',
      api_token: '',
      device_id:'',
    }
  };

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
    localStorage.setItem('token', user.api_token!);
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
      id: 0,
      name: '',
      email: '',
      valid: '',
      rol: '',
      api_token: '',
      device_id:'',
    };
    this._subjectUser.next(this._user);
  }

  apiToken( api_token: string ): Observable<string> {

    const url : string = `${ this._baseUrl }/token`;
    const body = { api_token: api_token };

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


}
