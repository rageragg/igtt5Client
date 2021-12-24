import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { IMainMenu } from 'src/app/interfaces/imain-menu';

@Component({
  selector: 'app-navb-home',
  templateUrl: './navb-home.component.html',
  styleUrls: ['./navb-home.component.css']
})
export class NavbHomeComponent implements OnInit, OnChanges {


  @Input() userName: string = '';
  @Input() userRol: string | undefined = '';

  public _listMainMenu: IMainMenu[] = [
    {  id: 1, title: 'Seguridad',   link: '/auth', show: true },
    {  id: 2, title: 'Configuracion',   link: '/config', show: true },
    {  id: 3, title: 'Geografico',   link: '/geo', show: true },
    {  id: 4, title: 'Logistica',   link: '/logistic', show: true },
    {  id: 5, title: 'Negocios',   link: '/bussine', show: true },
    {  id: 6, title: 'Empleados',   link: '/employee', show: true },
    {  id: 7, title: 'Usuarios',   link: '/user', show: true }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this._listMainMenu.forEach( x => {
      if(x.title === 'Configuracion' || x.title === 'Usuarios' ) {
        x.show = (this.userRol === 'ADMINISTRATOR');
      }

      if(x.title === 'Geografico' || x.title === 'Logistica' ) {
        x.show = (this.userRol === 'ADMINISTRATOR' || this.userRol === 'LOGISTIC' );
      }

      if(x.title === 'Negocios' ) {
        x.show = (this.userRol === 'ADMINISTRATOR' || this.userRol === 'BUSSINE' );
      }

      if(x.title === 'Empleados' ) {
        x.show = (this.userRol === 'ADMINISTRATOR' || this.userRol === 'EMPLOYEE' );
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
