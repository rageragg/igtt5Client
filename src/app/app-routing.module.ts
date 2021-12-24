import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then( m => m.AuthModule )
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then( m => m.UserModule )
  },
  {
    path: 'config',
    loadChildren: () => import('./modules/config/config.module').then( m => m.ConfigModule )
  },
  {
    path: 'geo',
    loadChildren: () => import('./modules/geo/geo.module').then( m => m.GeoModule )
  },
  {
    path: 'logistic',
    loadChildren: () => import('./modules/logistic/logistic.module').then( m => m.LogisticModule )
  },
  {
    path: 'bussine',
    loadChildren: () => import('./modules/bussine/bussine.module').then( m => m.BussineModule )
  },
  {
    path: 'employee',
    loadChildren: () => import('./modules/employee/employee.module').then( m => m.EmployeeModule )
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
