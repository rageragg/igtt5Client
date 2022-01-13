import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private _showmsg: boolean = false;

  myFormRegister: FormGroup = this.fb.group({
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [Validators.required, Validators.minLength(6) ] ],
    password_confirm: [ '', [Validators.required, Validators.minLength(6) ] ],
    name: [ '', [ Validators.required, Validators.minLength(6) ] ],
    rol: [ '', [ Validators.required] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router,
               private authService: AuthService
             ) { }

  ngOnInit(): void {
  }

  validatorEmail( email: string ): boolean {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(email);
  }

  register(): void {

    const { name, email, password, password_confirm, rol } = this.myFormRegister.value;
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

    this.authService.register( name, email, password, rol )
    .subscribe( resp => {
      this._showmsg = false;
      if( resp === 'OK' ) {
        Swal.fire( 'Informacion', 'Se ha registrado con exito!', 'info' );
        this.myFormRegister.reset();
      } else {
        Swal.fire( 'Error', resp, 'error' );
      }
    });

  }

  get showmsg(): boolean {
    return this._showmsg;
  }

}
