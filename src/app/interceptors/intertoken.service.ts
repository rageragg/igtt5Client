import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntertokenService implements HttpInterceptor {

  private _token: string | null = localStorage.getItem('token');

  constructor() { }


  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    const started = Date.now();
    let ok: string;
    const url = req.url;
    let reqClone: HttpRequest<any>;


    if(  this.filterUrl(url) ) {
      reqClone = req;
    } else {
      const headers = new HttpHeaders( {
          'Content-Type':  'application/vnd.api+json',
          'Authorization': `Bearer ${ this._token }`
        });

      reqClone = req.clone( { headers } );
    }

    return next.handle( reqClone )
    .pipe(
      tap(
        event => ok = event instanceof HttpResponse ? 'succeeded' : '',
        error => ok = 'failed'
      ),
      catchError( this.handlerError ),
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}"
           ${ok} in ${elapsed} ms.`;
        console.log(msg);
      })
    );

  }

  handlerError( error: HttpErrorResponse) {
    console.log('Error en Http Service');
    console.warn(error);

    return throwError('Error en Http Interceptor');
  }

  filterUrl( url: string ): boolean {

    let count: number = 0;
    const urls: string[] = [ '/api/v4/token', 'api/v4/login' ];

    urls.forEach( item => {
      if( url.indexOf(item) !== -1 ) {
        count += 1;
      }
    });

    return (count > 0);
  }

}
