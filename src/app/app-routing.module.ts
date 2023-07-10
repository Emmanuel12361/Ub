import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; // Aggiungi l'import del componen InboxComponent
import { HomeComponent } from './home/home.component'; // Aggiungi l'import del componen HomeComponent
import { CercaFilmComponent } from './cerca-film/cerca-film.component'; // Aggiungi l'import del componen HomeComponent
const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login', // Aggiungi la route per 'Inbox'
    component: LoginComponent // Associa il componente InboxComponent alla route 'Inbox'
  },
    {
    path: 'home', // Aggiungi la route per 'Home'
    component: HomeComponent // Associa il componente HomeComponent alla route 'Home'
  },
    {
    path: 'cerca-film', // Aggiungi la route per 'Home'
    component: CercaFilmComponent // Associa il componente HomeComponent alla route 'Home'
  },
  
  {
     path: 'home/:id',
    loadChildren: () => import('./app.module').then( m => m.AppModule )
   
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

