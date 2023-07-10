import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: any[] = [];
  items2: any[] = [];
  
  seleziona_film: boolean = false;
  film_selezionato: boolean = false;
  filmPP: any;
  seleziona_film2: boolean = false;
  film_selezionato2: boolean = false;
  
  film_selezionato3: boolean = false;
  filmPP2: any;
  filmPP3: any;
  
  

  constructor(private http: HttpClient, private filmService: FilmService) { 
  
   this.loadFilmData();
    
  }
  
  

  ngOnInit(): void {
  
  }

  



  salvaFilm(film: any): void {
  
  
  
  this.items = this.items.filter((f) => f.id !== film.id);
  this.items2.push(film);
  this.filmService.addSawFilm(film);
  this.seleziona_film = false;
  this.film_selezionato = false;
  }

  rifiuta(): void {
   this.seleziona_film = false;
 this.film_selezionato = false;
 this.filmPP = null;
   setTimeout(() => {
    this.seleziona_film = false;
  });
 
}
  funzione11(): void {
 this.filmPP3 = null;
   setTimeout(() => {
    this.film_selezionato2 = true;
  });
   
 
}  funzione12(): void {
 this.filmPP2 = null;
   setTimeout(() => {
    this.film_selezionato3 = true;
  });

}
 funzione21(film: any): void  {
 this.filmPP3 = null;
 this.filmPP2 = null;
   setTimeout(() => {
    this.film_selezionato2 = false;
    
    this.film_selezionato3 = false;
      this.seleziona_film2 = false;
  });
   
 this.items2 = this.items2.filter((f) => f.id !== film.id);
   this.items.push(film);
   this.filmService.addFilm(film);
   
   this.filmService.deleteSawFilm(film)
}  


funzione22(): void {
 this.filmPP2 = null;
 this.filmPP3 = null;
   setTimeout(() => {
   
    this.film_selezionato2 = false;
    
    this.film_selezionato3 = false;
      this.seleziona_film2 = false;
  });

} 
funzione31(film: any): void {
 this.filmPP3 = null;
 this.filmPP2 = null;
   setTimeout(() => {
    this.film_selezionato2 = false;
    
    this.film_selezionato3 = false;
      this.seleziona_film2 = false;
  });
   
   
 this.items2 = this.items2.filter((f) => f.id !== film.id);
 
   this.filmService.deleteSawFilm(film)
} 

 funzione32(): void {
 this.filmPP2 = null;
 this.filmPP3 = null;
   setTimeout(() => {
   
    this.film_selezionato2 = false;
    
    this.film_selezionato3 = false;
      this.seleziona_film2 = false;
  });
 

}

salva(){}

  async loadFilmData() {
 /* await this.filmService.initializeDatabase();*/
  this.items = this.filmService.getFilms();
  this.items2 = this.filmService.getSawFilms();
  
  
}
}



 


  

/*
  items = [
    
    {
      image: 'http://image.tmdb.org/t/p/w185/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
      title: 'mission '
    },
    {
      image: 'http://image.tmdb.org/t/p/w185/fRJLXQBHK2wyznK5yZbO7vmsuVK.jpg',
      title: 'Slide 2'
    },
    {
      image: 'http://image.tmdb.org/t/p/w185/psiWp3VTjznfokmGQG9uqiiknQQ.jpg',
      title: 'Slide 3'
    },
    {
      image: 'http://image.tmdb.org/t/p/w185/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
      title: 'Slide 4'
    },
     {
      image: 'http://image.tmdb.org/t/p/w185/fRJLXQBHK2wyznK5yZbO7vmsuVK.jpg',
      title: 'Slide 5'
    },
    {
      image: 'http://image.tmdb.org/t/p/w185/psiWp3VTjznfokmGQG9uqiiknQQ.jpg',
      title: 'Slide 6'
    },
     {
      image: 'http://image.tmdb.org/t/p/w185/psiWp3VTjznfokmGQG9uqiiknQQ.jpg',
      title: 'Slide 7'
    },
     {
      image: 'http://image.tmdb.org/t/p/w185/NNxYkU70HPurnNCSiCjYAmacwm.jpg',
      title: 'Slide 8'
    },
    {
      image: 'http://image.tmdb.org/t/p/w185/fRJLXQBHK2wyznK5yZbO7vmsuVK.jpg',
      title: 'Slide 9'
    }

  ];
*/




