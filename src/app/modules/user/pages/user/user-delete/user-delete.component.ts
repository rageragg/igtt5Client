import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {

  private _showmsg: boolean = false;

  constructor( private userService: UserService,
               @Inject(MAT_DIALOG_DATA) public data: {
                id: string,
                name: string,
                email: string,
                rol: string,
                valid: string,
                emailVerifiedAt: string,
                uuid: string,
                updatedAt: string,
                createdAt: string
              }) { }

  ngOnInit(): void {
  }

  delete() {

    this._showmsg = true;

    this.userService.delete( this.data.id )
    .subscribe( resp => {
      this._showmsg = false;
      if( resp === 'OK' ) {
        Swal.fire( 'Informacion', 'Se ha eliminado con exito!', 'info' );
      } else {
        Swal.fire( 'Error', resp, 'error' );
      }
    });
  }

}
