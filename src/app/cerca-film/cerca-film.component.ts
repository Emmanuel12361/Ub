
/*'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'*/

/*'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27'*//*&with_genres=27'*/


/*'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc'*/
/*&with_genres=27'*/


/*'https://api.themoviedb.org/3/search/movie?*/   /*query=mission%20impossible&*/  /*include_adult=false&language=en-US&page=1'*/   

/*'https://api.themoviedb.org/3/search/movie?query=mission%20impossible&include_adult=false&language=en-US&page=1'*/
/*'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1'*//*query=mission%20impossible&*/


import Swiper from 'swiper';
import { Component, OnInit, Inject } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { SwiperOptions } from 'swiper';
import { Router } from '@angular/router';
import { FilmService } from '../film.service';

interface Movie {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  id: number;
}

const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTc3OTBiM2Q2NjMwODg5ZTQ2NGI4M2JhMTlhOThmYSIsInN1YiI6IjY0NmEwM2M0YzM1MTRjMDE1NzdhNmI1MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BcCotKilRN6T0QK_9-fkR9qg35aNKixt6ZXrWnGgz-E';
const apiUrl = 'https://api.themoviedb.org/3/';

@Component({
  selector: 'app-cerca-film',
  templateUrl: './cerca-film.component.html',
  styleUrls: ['./cerca-film.component.scss'],
})
export class CercaFilmComponent implements OnInit {
  selectedGenre: string;
  movies: Movie[] = [];
  sortedMovies: Movie[] = [];
  sortedMovies2: Movie[] = [];
  searchQuery: string = '';
  selectedMovie: Movie | undefined;
   selectedMovie2: Movie | undefined;
    selectedMovie3: Movie | undefined;
  saveSuccess = false;
  saveError = false;


  constructor(private http: HttpClient, @Inject(FilmService) private filmService: FilmService) {
    this.selectedGenre = 'Action';
  }

  ngOnInit() {
    this.makeApiCall();
  }

  makeApiCall() {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    this.http
      .get<any>(`${apiUrl}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc`, options)
      .subscribe((response: any) => {
        this.movies = response.results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
        }));

        this.sortMoviesByReleaseDate();
        this.sortMoviesByVote();
      });
  }

  searchByGenre(genreId: string) {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    this.http
      .get<any>(`${apiUrl}discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`, options)
      .subscribe((response: any) => {
        this.movies = response.results.map((movie: Movie) => ({
          id: movie.id,
          title: movie.title,
          poster_path: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
          overview: movie.overview,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
          vote_count: movie.vote_count,
        }));

        this.sortMoviesByReleaseDate();
        this.sortMoviesByVote();
      });
  }

  searchByMovie(query: string) {
    const options = {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
    };

    const encodedQuery = encodeURIComponent(query);
    const url = `${apiUrl}search/movie?query=${encodedQuery}&include_adult=false&language=en-US&page=1`;

    this.http.get<any>(url, options).subscribe((response: any) => {
      this.movies = response.results.map((movie: Movie) => ({
        id: movie.id,
        title: movie.title,
        poster_path: 'https://image.tmdb.org/t/p/original' + movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
      }));

      this.sortMoviesByReleaseDate();
      this.sortMoviesByVote();
    });
  }

  sortMoviesByReleaseDate() {
    this.sortedMovies = [...this.movies].sort((a, b) => {
      const dateA = new Date(a.release_date);
      const dateB = new Date(b.release_date);
      return dateB.getTime() - dateA.getTime();
    });
  }

  sortMoviesByVote() {
    this.sortedMovies2 = [...this.movies].sort((a, b) => {
      if (a.vote_average < b.vote_average) {
        return 1;
      } else if (a.vote_average > b.vote_average) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  saveFilm(selectedMovie: any): void {
  const success = this.filmService.addFilm(selectedMovie);
  if (success) {
    this.saveSuccess = true;
    this.saveError = false;
  } else {
    this.saveSuccess = false;
    this.saveError = true;
  }
}


  

  showMovieDetails(movie: Movie) {
    this.selectedMovie = movie;
  }
    showMovieDetails2(movie: Movie) {
    this.selectedMovie2 = movie;
  }
    showMovieDetails3(movie: Movie) {
    this.selectedMovie3 = movie;
  }
}










  

 



