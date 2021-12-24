import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { IUser } from '../../interfaces/iuser.interface';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  private _user!: IUser;
  private _userServiceSubscription: Subscription | undefined;

  constructor( private authService: AuthService,
               private router: Router
             ) { }

  ngOnInit(): void {

    if(this.authService.token) {
      this.authService.apiToken( this.authService.token )
        .subscribe( resp => {
          console.log(resp);
          if( resp != 'OK' ) {
            this.router.navigateByUrl('/auth/login');
          }
        });
    } else {
      this.router.navigateByUrl('/auth/login');
    }

    this._userServiceSubscription = this.authService._observableUser
        .subscribe( User => {
          this._user = User;
        }
    );

  }

  ngOnDestroy(): void {
    this._userServiceSubscription?.unsubscribe();
  }

  get user(): IUser {
    return { ...this._user };
  }

}
