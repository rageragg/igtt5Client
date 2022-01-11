import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private _showmsg: boolean = false;
  private _userData = {
    id: '',
    name: '',
    email: '',
    rol: '',
    valid: ''
  }

  myFormUserEdit!: FormGroup;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              @Inject(MAT_DIALOG_DATA) public data: {
                id: string,
                name: string,
                email: string,
                rol: string,
                valid: string
              }
             ) {
    this._userData = data;
    this.myFormUserEdit = this.fb.group({
      email: [ this._userData.email, [ Validators.required, Validators.email ] ],
      password: [ '', [Validators.required, Validators.minLength(6) ] ],
      password_confirm: [ '', [Validators.required, Validators.minLength(6) ] ],
      name: [ this._userData.name, [ Validators.required, Validators.minLength(6) ] ],
      rol: [  this._userData.rol, [ Validators.required] ]
    });
  }

  ngOnInit(): void {
  }

  validatorEmail( email: string ): boolean {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(email);
  }

  get showmsg(): boolean {
    return this._showmsg;
  }

  get userData() {
    return this._userData;
  }

  editUser() {

    console.log('editUser');
    const { name, email, password, password_confirm, rol } = this.myFormUserEdit.value;
    this._showmsg = true;

    // validamos el email
    if( this.validatorEmail(email) === false ) {
      Swal.fire( 'Error', 'La direccion Email es incorrecta', 'error' );
      this._showmsg = false;
      return;
    }

    // validamos la clave y su confirmacion
    if( password_confirm != password ) {
      Swal.fire( 'Error', 'No es valida la confirmacion de la clave', 'error' );
      this._showmsg = false;
      return;
    }

    this.userService.edit( this._userData.id, name, email, password, rol )
    .subscribe( resp => {
      this._showmsg = false;
      if( resp === 'OK' ) {
        Swal.fire( 'Informacion', 'Se ha actualizado con exito!', 'info' );
        this.myFormUserEdit.reset();
      } else {
        Swal.fire( 'Error', resp, 'error' );
      }
    });

  }

}
