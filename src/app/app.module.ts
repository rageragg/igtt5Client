import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbHomeComponent } from './component/navb-home/navb-home.component';
import { CarouselHomeComponent } from './component/carousel-home/carousel-home.component';
import { FooterlHomeComponent } from './component/footerl-home/footerl-home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntertokenService } from './interceptors/intertoken.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbHomeComponent,
    CarouselHomeComponent,
    FooterlHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: IntertokenService, multi: true } ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
