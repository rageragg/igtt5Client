import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { UserRoutingModule } from './user-routing.module';

import { NavbarUserComponent } from './components/navbar-user/navbar-user.component';
import { MainComponent } from './pages/main/main.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManualComponent } from './pages/manual/manual.component';
import { UserAddComponent } from './pages/user/user-add/user-add.component';
import { TableSampleComponent } from './components/table-sample/table-sample.component';

@NgModule({
  declarations: [
    NavbarUserComponent,
    MainComponent,
    UserListComponent,
    DashboardComponent,
    ManualComponent,
    UserAddComponent,
    TableSampleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MaterialModule
  ]
})
export class UserModule { }
