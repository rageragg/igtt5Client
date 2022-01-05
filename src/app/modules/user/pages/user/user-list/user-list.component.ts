import { Component, ViewChild, OnInit, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from "rxjs/operators";

import { UserService } from '../../../services/user.service';

import { UserAddComponent } from '../user-add/user-add.component';
import { userData } from '../../../interfaces/iuser-admin.interface';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {

  private _displayedColumns: string[] = ['id', 'name', 'email', 'rol', 'valid', 'actions'];
  private _dataSource!: MatTableDataSource<userData>;
  private _userdata: userData[] = [];
  public loading: boolean = true;
  public lengthData: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get displayedColumns(): string[] {
    return [...this._displayedColumns];
  }

  get dataSource() {
    return this._dataSource;
  }

  constructor( private userService: UserService,
               public dialog: MatDialog
             ) {
    this._dataSource = new MatTableDataSource(this._userdata);
  }

  ngAfterViewChecked(): void {
  }

  ngAfterViewInit(): void {

    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    if( this.paginator ) {
      this._dataSource.paginator = this.paginator;
    }
    this._dataSource.sort = this.sort;

  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {

    this.userService
        .allUsers()
        .pipe(
            map( ( { data } ) => {
                this.loading = true;
                this._userdata = [];
                data.forEach( element => {
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
                return this._userdata;
            })
        )
        .subscribe(resp => {
          this._userdata = resp;
          this.lengthData = this._userdata.length;
          this._dataSource.data = this._userdata;
        });

  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this._dataSource.filter = filterValue.trim().toLowerCase();

    if (this._dataSource.paginator) {
      this._dataSource.paginator.firstPage();
    }

  }

  newUser(): void {
    const dialogRef = this.dialog.open(UserAddComponent);

    dialogRef.afterClosed().subscribe( result => {
      if(result === true) {
        this.refreshData();
      };
    });

  }

  editUser( id: number ): void {
    console.log('EditUser', id);
  }

  deleteUser( id: number): void {
    console.log('deleteUser ', id );
  }

  infoUser( id: number): void {
    console.log('inforUser ', id );
  }

  hideLoader() {
    this.loading = false;
  }

  ngOnDestroy(): void {
  }

}

