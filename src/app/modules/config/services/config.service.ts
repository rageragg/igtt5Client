import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse   } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { Attributes as ConfAttibutes, ConfigurationItem } from '../interfaces/confurations.interface';
import { CountriesList } from '../interfaces/countries.interface';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private _baseUrl: string = environment.baseUrl;
  private _configID: number = environment.configurationID;

  constructor( private http: HttpClient  ) { }

  getConfig(): Observable<ConfigurationItem> {

    const apiToken  = localStorage.getItem('token');
    const url : string = `${ this._baseUrl }/configurations/${ this._configID }`;

    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type':  'application/vnd.api+json',
        'Authorization': `Bearer ${ apiToken }`
      })
    };
    return this.http.get<ConfigurationItem>( url, httpOptions );

  }

  getListCountries(): Observable<CountriesList> {

    const apiToken  = localStorage.getItem('token');
    const url : string = `${ this._baseUrl }/countries`;

    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type':  'application/vnd.api+json',
        'Authorization': `Bearer ${ apiToken }`
      })
    };
    return this.http.get<CountriesList>( url, httpOptions );

  }

  getListCurrencies(): Observable<string[]> {
    return of( [ 'Bs', '$'] );
  }

  edit( body: ConfigurationItem ): Observable<string> {

    const apiToken  = localStorage.getItem('token');
    const url : string = `${ this._baseUrl }/configurations/${ this._configID }`;

    const httpOptions = {
      headers: new HttpHeaders( {
        'Content-Type':  'application/vnd.api+json',
        'Authorization': `Bearer ${ apiToken }`
      })
    };

    // se trata la respuesta en procesos de cascadas, primero
    // tap, luego map y si hay error catch
    return this.http.patch<ConfigurationItem>( url, body, httpOptions )
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

}
