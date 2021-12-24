import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './pages/main/main.component';
import { ConfigComponent } from './pages/config/config.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { ListComponent } from './pages/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: 'config', component: ConfigComponent },
      { path: 'currency', component: CurrencyComponent },
      { path: 'list', component: ListComponent },
      { path: '**', redirectTo: 'config' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigRoutingModule { }
