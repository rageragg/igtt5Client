import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  myFormRegister: FormGroup = this.fb.group({
    email: [ '', [ Validators.required, Validators.email ] ],
    password: [ '', [Validators.required, Validators.minLength(6) ] ],
    password_confirm: [ '', [Validators.required, Validators.minLength(6) ] ],
    name: [ '', [ Validators.required, Validators.minLength(6) ] ]
  });

  constructor( private fb: FormBuilder,
               private router: Router
             ) { }

  ngOnInit(): void {
  }

  validatorEmail( email: string ): boolean {
    const emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(email);
  }

  register(): void {

    const { name, email, password } = this.myFormRegister.value;

    // validamos el email
    if( this.validatorEmail(email) === false ) {
      Swal.fire( 'Error', 'La direccion Email es incorrecta', 'error' );
      return;
    }

  }

}
