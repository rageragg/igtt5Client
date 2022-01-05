import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges  } from '@angular/core';

@Component({
  selector: 'app-navbar-user',
  templateUrl: './navbar-user.component.html',
  styleUrls: ['./navbar-user.component.css']
})
export class NavbarUserComponent implements OnInit, OnChanges, OnDestroy {


  @Input() userName: string = '';
  @Input() userRol: string | undefined = '';

  public _listMainMenu = [
    {  id: 1, title: 'Home', link: '/home', show: true },
    {  id: 2, title: 'Dashboard', link: '/user/dashboard', show: true },
    {  id: 3, title: 'Administracion', link: '/user/admin', show: true },
    {  id: 4, title: 'Manual', link: '/user/manual', show: true }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    this._listMainMenu.forEach( x => {
      if(x.title === 'Dashboard' || x.title === 'Administracion' ) {
        x.show = (this.userName != '');
      }

      if(x.title === 'Login' ) {
        x.show = (this.userName === '');
      }

    });
  }

  ngOnDestroy(): void {
  }

  get listMainMenu() {
    return [...this._listMainMenu];
  }

}
