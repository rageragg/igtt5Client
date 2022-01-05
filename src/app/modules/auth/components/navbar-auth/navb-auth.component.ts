import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

import { IUser } from '../../interfaces/iuser.interface';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navb-auth',
  templateUrl: './navb-auth.component.html',
  styleUrls: ['./navb-auth.component.css']
})
export class NavbAuthComponent implements OnInit, OnDestroy, OnChanges {


  @Input() userName: string = '';
  @Input() userRol: string | undefined = '';


  public _listMainMenu = [
    {  id: 1, title: 'Home', link: '/home', show: true },
    {  id: 2, title: 'Dashboard', link: '/auth/dashboard', show: true },
    {  id: 3, title: 'Login', link: '/auth/login', show: true },
    {  id: 4, title: 'Logout', link: '/auth/logout', show: true },
    {  id: 5, title: 'Registro', link: '/auth/register', show: true }
  ];

  constructor( ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

      this._listMainMenu.forEach( x => {
        if(x.title === 'Dashboard' || x.title === 'Logout' ) {
          x.show = (this.userName != '');
        }

        if(x.title === 'Login' ) {
          x.show = (this.userName === '');
        }

      });
  }

  get listMainMenu() {
    const list = this._listMainMenu.filter( x => {
        return x.show === true;
    } );

    return list;
  }

}
