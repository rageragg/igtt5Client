import { CollectionViewer, DataSource } from "@angular/cdk/collections";

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Observable, of as observableOf, merge, BehaviorSubject } from 'rxjs';
import { catchError, map, startWith, switchMap } from "rxjs/operators";

import { UserService } from "../services/user.service";
import { userData, UsersList } from "../interfaces/iuser-admin.interface";


export class UserDataTableSource extends DataSource<userData> {

  private _userdata: userData[] = [];

  private _loadingData = new BehaviorSubject<boolean>(false);

  constructor( private paginator: MatPaginator,
               private sort: MatSort,
               private userService: UserService
             ) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<userData[]> {

    const dataMutations = [
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations)
                .pipe(
                  startWith({}),
                  switchMap( () => {
                    console.log('Servicio API');
                    this._loadingData.next(true);
                    return this.userService
                          .pageSortedList( this.paginator.pageIndex, this.paginator.pageSize, this.sort.active );
                  }),
                  map( resp => {
                    this._userdata = [];
                    resp.data.forEach( element => {
                      const user: userData = {
                          id: element.id,
                          name: element.attributes.name,
                          email: element.attributes.email,
                          rol: element.attributes.rol,
                          uuid: element.attributes.uuid,
                          createdAt: element.attributes.createdAt,
                          updatedAt: element.attributes.updatedAt,
                          valid: element.attributes.valid,
                          apiToken: element.attributes.apiToken,
                          password:element.attributes.password,
                          emailVerifiedAt: element.attributes.emailVerifiedAt
                      }
                      this._userdata.push(user);
                    });
                    this.paginator.length = resp.meta.page.total;
                    return this._userdata;
                  })
                );
  }

  disconnect(collectionViewer: CollectionViewer): void {
  }

  get data():  userData[] {
    return [...this._userdata];
  }

  set data( newdata: userData[] ) {
    this._userdata = newdata;
  }

  loading(): Observable<boolean>{
    return this._loadingData.asObservable();
  }

}
