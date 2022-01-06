import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  private _showmsg: boolean = false;

  myFormUserAdd: FormGroup = this.fb.group({
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [Validators.required, Validators.minLength(6) ] ],
    password_confirm: [ '', [Validators.required, Validators.minLength(6) ] ],
    name: [ '', [ Validators.required, Validators.minLength(6) ] ],
    rol: [ '', [ Validators.required] ]
  });

  constructor(private fb: FormBuilder,
              private userService: UserService
             ) { }

  ngOnInit(): void {
  }

  validatorEmail( email: string ): boolean {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(email);
  }

  addUser() {
    console.log('addUser');
    const { name, email, password, password_confirm, rol } = this.myFormUserAdd.value;
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

    this.userService.add( name, email, password, rol )
      .subscribe( resp => {
        this._showmsg = false;
        if( resp === 'OK' ) {
          Swal.fire( 'Informacion', 'Se ha registrado con exito!', 'info' );
          this.myFormUserAdd.reset();
        } else {
          Swal.fire( 'Error', resp, 'error' );
        }
    });
  }

  get showmsg(): boolean {
    return this._showmsg;
  }

}
