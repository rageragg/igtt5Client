import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { IUser } from 'src/app/modules/auth/interfaces/iuser.interface';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private _user!: IUser;
  private _userServiceSubscription: Subscription | undefined;

  constructor(private authService: AuthService,
              private router: Router
             ) { }

  ngOnInit(): void {
    if(this.authService.token) {
      this.authService.apiToken( this.authService.token )
        .subscribe( resp => {
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
