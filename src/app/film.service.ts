import { Injectable } from '@angular/core';
import { Film } from './film';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  constructor(private http: HttpClient) { }
  private filmUrl = "https://ghibliapi.herokuapp.com/films"
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getFilms(): Observable<Film[]>{
    return this.http.get<Film[]>(this.filmUrl)
    .pipe(tap(_ => console.log(`fetched films`)),
    catchError(this.handleError<Film[]>('getFilms', []))
    );
  }

    /** GET player by lastname and firstname. Will 404 if id not found */
    getFilm(id:string): Observable<Film> {
      const url = `${this.filmUrl}/${id}`;
      return this.http.get<Film>(url).pipe(
        tap(_ => console.log(`fetched film id=${id}`)),
        catchError(this.handleError<Film>(`getFilm id=${id}`))
      );
    }
}
