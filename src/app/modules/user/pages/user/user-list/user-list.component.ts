import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';

import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { IUser } from 'src/app/modules/auth/interfaces/iuser.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, AfterViewInit {

  private _userList: IUser[] = [
    { id: 1, name: 'Ronald Guerra', email: 'rageragg2004@gmail.com', valid: 'Y', rol: 'ADMINISTRATOR' },
    { id: 2, name: 'Yaneth Guedez', email: 'yguedez2004@gmail.com', valid: 'Y', rol: 'LOGISTIC' }
  ];

  private _displayedColumns: string[] = ['id', 'name', 'email', 'rol', 'valid', 'actions'];
  public dataSource!: MatTableDataSource<IUser>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  get userList(): IUser[] {
    return [...this._userList];
  }

  get displayedColumns(): string[] {
    return [...this._displayedColumns];
  }

  constructor() {
    this.dataSource = new MatTableDataSource(this.userList);
   }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  newUser(): void {
    console.log('NewUser');
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

}
