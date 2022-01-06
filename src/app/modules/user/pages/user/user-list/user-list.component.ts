import { Component, ViewChild, OnInit, AfterViewInit, AfterViewChecked, OnDestroy } from '@angular/core';

import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { map } from "rxjs/operators";

import { UserService } from '../../../services/user.service';
import { userData } from '../../../interfaces/iuser-admin.interface';

import { UserAddComponent } from '../user-add/user-add.component';
import { UserEditComponent } from '../user-edit/user-edit.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { UserDeleteComponent } from '../user-delete/user-delete.component';


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
  @ViewChild(MatTable) table!: MatTable<any>;

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
    this.loading = true;

  }

  ngOnInit(): void {
    this.refreshData();
  }

  refreshData() {

    this.loading = true;

    this.userService
        .allUsers()
        .pipe(
            map( ( { data } ) => {
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
          this.table.renderRows();
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

  editUser( row: userData ): void {
    console.log('EditUser', row);
    const dialogRef = this.dialog.open(UserEditComponent, {
      data: {
        id: row.id,
        name: row.name,
        email: row.email,
        rol: row.rol,
        valid: row.valid
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result === true) {
        this.refreshData();
      };
    });

  }

  deleteUser( row: userData  ): void {

    const dialogRef = this.dialog.open(UserDeleteComponent, {
      data: {
        id: row.id,
        name: row.name,
        email: row.email,
        rol: row.rol,
        valid: row.valid,
        emailVerifiedAt: row.emailVerifiedAt,
        uuid: row.uuid,
        updatedAt: row.updatedAt,
        createdAt: row.createdAt
      }
    });

    dialogRef.afterClosed().subscribe( result => {

      console.log(result);

      if(result === true) {
        this.refreshData();
      };

    });

  }

  infoUser( row: userData ): void {
    console.log('inforUser ', row );

    const dialogRef = this.dialog.open(UserInfoComponent, {
      data: {
        id: row.id,
        name: row.name,
        email: row.email,
        rol: row.rol,
        valid: row.valid,
        emailVerifiedAt: row.emailVerifiedAt,
        uuid: row.uuid,
        updatedAt: row.updatedAt,
        createdAt: row.createdAt
      }
    });

    dialogRef.afterClosed().subscribe( result => {
      if(result === true) {
        this.refreshData();
      };
    });

  }

  hideLoader() {
    this.loading = false;
  }

  ngOnDestroy(): void {
  }

}

