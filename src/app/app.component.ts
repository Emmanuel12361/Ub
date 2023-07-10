import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component'; // Aggiungi l'import del componen InboxComponent
import { HomeComponent } from './home/home.component'; // Aggiungi l'import del componen HomeComponent
import { CercaFilmComponent } from './cerca-film/cerca-film.component';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Login', url: '/login', icon: 'log-in', component: LoginComponent },
    { title: 'Home', url: '/home', icon: 'home', component: HomeComponent },
    { title: 'Cerca Film', url: '/cerca-film', icon: 'play-circle', component: CercaFilmComponent },
  ];
  constructor() {}
}
