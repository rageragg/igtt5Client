import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ManualComponent } from './pages/manual/manual.component';
import { TableSampleComponent } from './components/table-sample/table-sample.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'admin', component: UserListComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manual', component: ManualComponent },
      { path: 'sample', component: TableSampleComponent },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
