import { Component, OnInit } from '@angular/core';

import { IMainMenu } from 'src/app/interfaces/imain-menu';

@Component({
  selector: 'app-navb-home',
  templateUrl: './navb-home.component.html',
  styleUrls: ['./navb-home.component.css']
})
export class NavbHomeComponent implements OnInit {


  public listMainMenu: IMainMenu[] = [
    {  id: 1, title: 'Seguridad',   link: '/auth' },
    {  id: 2, title: 'Configuracion',   link: '/config' },
    {  id: 3, title: 'Geografico',   link: '/geo' },
    {  id: 4, title: 'Logistica',   link: '/logistic' },
    {  id: 5, title: 'Negocios',   link: '/bussine' },
    {  id: 6, title: 'Empleados',   link: '/employee' }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
