import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor( private router: Router,
               private authService: AuthService
             ) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
    Swal.fire( 'Aviso', 'Se ha desconectado de la aplicacion', 'info' );
    this.router.navigateByUrl('/home');
  }

}
