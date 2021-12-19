import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfigRoutingModule } from './config-routing.module';
import { MainComponent } from './pages/main/main.component';
import { ConfigComponent } from './pages/config/config.component';
import { CurrencyComponent } from './pages/currency/currency.component';
import { ListComponent } from './pages/list/list.component';
import { RolsComponent } from './pages/rols/rols.component';


@NgModule({
  declarations: [
    MainComponent,
    ConfigComponent,
    CurrencyComponent,
    ListComponent,
    RolsComponent
  ],
  imports: [
    CommonModule,
    ConfigRoutingModule
  ]
})
export class ConfigModule { }