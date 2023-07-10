import Dexie from 'dexie';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private db!: Dexie;
  private filmdb!: Dexie.Table<any, number>;
  private sawFilmdb!: Dexie.Table<any, number>;

  constructor() {
    this.createDatabase();
  }

 async createDatabase(): Promise<void> {
  try {
    this.db = new Dexie('MyDatabase');
    this.db.version(1).stores({
      filmdb: '++id',
      sawFilmdb: '++id'
    });

    const isDbExists = await this.isDatabaseExists();

    if (isDbExists) {
      console.log('Il database esiste già.');
    } else {
      console.log('Il database non esiste. Creazione in corso...');

      this.filmdb = this.db.table('filmdb');
      this.sawFilmdb = this.db.table('sawFilmdb');

      await this.db.transaction('rw', this.filmdb, this.sawFilmdb, async () => {
        await this.filmdb.bulkPut([
          { text: 'Film 1' },
          { text: 'Film 2' },
          { text: 'Film 3' }
        ]);

        await this.sawFilmdb.bulkPut([
          { text: 'Saw Film 1' },
          { text: 'Saw Film 2' }
        ]);
      });

      console.log('Database creato con successo.');
    }
  } catch (error) {
    console.error('Errore durante la creazione del database:', error);
  }
}


  private async isDatabaseExists(): Promise<boolean> {
    try {
      const databaseNames = await Dexie.getDatabaseNames();
      const isDbExists = databaseNames.includes('MyDatabase');

      if (isDbExists) {
        console.log('Il database esiste.');
      } else {
        console.log('Il database non esiste.');
      }

      return isDbExists;
    } catch (error) {
      console.error('Errore durante la verifica dell\'esistenza del database:', error);
      return false;
    }
  }

  async getFilmsdb(): Promise<any[]> {
    try {
      if (!this.filmdb) {
        throw new Error('Database non inizializzato correttamente.');
      }

      return await this.db.transaction('r', [this.filmdb], async () => {
        return await this.filmdb.toArray();
      });
    } catch (error) {
      console.error('Errore durante l\'accesso al database filmdb:', error);
      throw error; // Rilancia l'errore per gestirlo al livello superiore se necessario
    }
  }

  async getSawFilmsdb(): Promise<any[]> {
    try {
      if (!this.sawFilmdb) {
        throw new Error('Database non inizializzato correttamente.');
      }

      return await this.db.transaction('r', [this.sawFilmdb], async () => {
        return await this.sawFilmdb.toArray();
      });
    } catch (error) {
      console.error('Errore durante l\'accesso al database sawFilmdb:', error);
      throw error; // Rilancia l'errore per gestirlo al livello superiore se necessario
    }
  }
}



