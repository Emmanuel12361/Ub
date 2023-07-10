import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  DatabaseService  } from './database.service';
import Dexie from 'dexie';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  private db: Dexie;
  private films: any[] = [];
  private sawFilms: any[] = [];
  private userId: number = 1; // ID utente predefinito

  constructor(private http: HttpClient) {
    this.db = new Dexie('mydatabase1');
    this.db.version(1).stores({
      films: '++id, data',
      sawFilms: '++id, data',
      users: '++id, name, password' // Aggiunta della tabella "users"
    });

    // Chiamata asincrona al metodo initializeDatabase()
    this.initializeDatabase().then(() => {
      console.log('Database inizializzato');
      console.log('Dati recuperati dal database', this.films, this.sawFilms);
    });
  }

  getFilms(): any[] {
    return this.films;
  }

  getSawFilms(): any[] {
    return this.sawFilms;
  }

  addFilm(film: any): boolean {
    const existingFilm = this.films.find(f => f.id === film.id);
    if (existingFilm) {
      return false;
    }

    this.films.push(film);
    this.saveDataToDatabase();
    return true;
  }

  addSawFilm(film: any): void {
    const existingFilmIndex = this.films.findIndex(f => f.id === film.id);
    if (existingFilmIndex !== -1) {
      this.films.splice(existingFilmIndex, 1);
    }
    const existingSawFilm = this.sawFilms.find(f => f.id === film.id);
    if (!existingSawFilm) {
      this.sawFilms.push(film);
      this.saveDataToDatabase();
    }
  }

  deleteSawFilm(film: any): boolean {
    const index = this.sawFilms.findIndex(f => f.id === film.id);
    if (index !== -1) {
      this.sawFilms.splice(index, 1);
      this.saveDataToDatabase();
      return true;
    }
    return false;
  }

  async initializeDatabase(): Promise<void> {
    const filmsData = await this.db.table('films').get(this.userId);
    if (!filmsData) {
      await this.db.table('films').add({ id: this.userId, data: JSON.stringify([]) });
    } else {
      this.films = JSON.parse(filmsData.data);
    }

    const sawFilmsData = await this.db.table('sawFilms').get(this.userId);
    if (!sawFilmsData) {
      await this.db.table('sawFilms').add({ id: this.userId, data: JSON.stringify([]) });
    } else {
      this.sawFilms = JSON.parse(sawFilmsData.data);
    }
  }

  async saveDataToDatabase(): Promise<void> {
    await this.db.table('films').put({ id: this.userId, data: JSON.stringify(this.films) });
    await this.db.table('sawFilms').put({ id: this.userId, data: JSON.stringify(this.sawFilms) });

    console.log('Dati salvati nel database');
  }

 async login(username: string, password: string): Promise<boolean> {
  const user = await this.db.table('users').where({ name: username, password: password }).first();
  if (user) {
    this.userId = user.id;
    await this.loadUserData(); // Carica i dati di films e sawFilms dell'utente
    return true;
  }
  return false;
}

async signIn(username: string, password: string): Promise<boolean> {
  const existingUser = await this.db.table('users').where({ name: username, password: password }).first();
  if (existingUser) {
    return false; // L'utente esiste già
  }

  const newUser = { name: username, password: password };
  const userId: string = (await this.db.table('users').add(newUser)).toString();

  this.userId = parseInt(userId);
  await this.loadUserData(); // Inizializza gli array films e sawFilms senza elementi per il nuovo utente registrato
  return true; // Registrazione avvenuta con successo
}

async loadUserData(): Promise<void> {
  const filmsData = await this.db.table('films').get(this.userId);
  if (filmsData) {
    this.films = JSON.parse(filmsData.data);
  } else {
    this.films = [];
  }

  const sawFilmsData = await this.db.table('sawFilms').get(this.userId);
  if (sawFilmsData) {
    this.sawFilms = JSON.parse(sawFilmsData.data);
  } else {
    this.sawFilms = [];
  }
}

  // Resto del codice rimane invariato
}


