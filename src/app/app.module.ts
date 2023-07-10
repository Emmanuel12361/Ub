import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CercaFilmComponent } from './cerca-film/cerca-film.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { FilmService } from './film.service';

import {  DatabaseService  } from './database.service';
import Dexie from 'dexie';





import Swiper from 'swiper';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomeComponent, CercaFilmComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    FilmService,
     DatabaseService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    // Imposta il modulo Swiper come modulo globale
    Swiper.use([]);
  }
}

