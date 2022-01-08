import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-navbar-config',
  templateUrl: './navbar-config.component.html',
  styleUrls: ['./navbar-config.component.css']
})
export class NavbarConfigComponent implements OnInit {


  @Input() userName: string = '';
  @Input() userRol: string | undefined = '';

  public _listMainMenu = [
    {  id: 1, title: 'Home', link: '/home', show: true },
    {  id: 2, title: 'Dashboard', link: '/config/dashboard', show: true },
    {  id: 3, title: 'Configuracion', link: '/config/config', show: true },
    {  id: 4, title: 'Monedas', link: '/config/currency', show: true },
    {  id: 5, title: 'Manual', link: '/user/manual', show: true }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this._listMainMenu.forEach( x => {
      if(x.title != 'Manual' ) {
        x.show = (this.userName != '');
      }

    });
  }

  ngOnDestroy(): void {
  }

  get listMainMenu() {
    return [...this._listMainMenu];
  }

}
