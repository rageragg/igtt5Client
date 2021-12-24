import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'user', component: UserListComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
