import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showSignInButton: boolean = false;
  signInSuccess: boolean = false;
  loginSuccess: boolean = false;
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private filmService: FilmService) {}

  async login(): Promise<void> {
    const loginSuccess: boolean = await this.filmService.login(this.username, this.password);
    if (loginSuccess) {
      this.loginSuccess = true;
      this.signInSuccess = false;
      this.showSignInButton = false;
    } else {
      this.loginSuccess = false;
      this.showSignInButton = true;
    }
  }

  async signIn(): Promise<void> {
    const signInSuccess: boolean = await this.filmService.signIn(this.username, this.password);
    if (signInSuccess) {
      this.signInSuccess = true;
      this.showSignInButton = false;
    }
  }
}

/*
  signInWithMario(): void {
    this.filmService.signIn('ullu', 'ullu').then(result => {
      if (result) {
        console.log('Sign-in success with username "mario"');
      } else {
        console.log('Sign-in failed with username "mario"');
      }
    });
  }

  loginWithMario(): void {
    this.filmService.login('elle', 'elle').then(result => {
      if (result) {
        console.log('Login success with username "mario"');
      } else {
        console.log('Login failed with username "mario"');
      }
    });
  }
*/


  
  
  
  
  
  
  
  


