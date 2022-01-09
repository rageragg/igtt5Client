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
    {  id: 1, title: 'Home', link: '/home', show: false },
    {  id: 2, title: 'Dashboard', link: '/config/dashboard', show: false },
    {  id: 3, title: 'Configuracion', link: '/config/config', show: false },
    {  id: 4, title: 'Monedas', link: '/config/currency', show: false },
    {  id: 5, title: 'Manual', link: '/config/manual', show: true }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this._listMainMenu.forEach( x => {

      if(x.title != 'Manual' ) {
        x.show = (this.userRol === 'ADMINISTRATOR');
      }

    });

  }

  ngOnDestroy(): void {
  }

  get listMainMenu() {
    return [...this._listMainMenu];
  }

}
