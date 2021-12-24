import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myFormLogin: FormGroup = this.fb.group({
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [Validators.required, Validators.minLength(6) ] ]
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

  login(): void {

    const { email, password } = this.myFormLogin.value;

    // validamos el email
    if( this.validatorEmail(email) === false ) {
      Swal.fire( 'Error', 'La direccion Email es incorrecta', 'error' );
      return;
    }

    this.authService.login( email, password )
      .subscribe( resp => {
        if( resp === 'OK' ) {
          this.router.navigateByUrl('/home');
        } else {
          Swal.fire( 'Error', resp, 'error' );
        }
      });

  }

}
