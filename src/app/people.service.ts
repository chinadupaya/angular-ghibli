import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { People } from './people';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private http: HttpClient) { }
  private peopleUrl = "https://ghibliapi.herokuapp.com/people"
  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPeople(): Observable<People[]>{
    return this.http.get<People[]>(this.peopleUrl)
    .pipe(tap(_ => console.log(`fetched people`)),
    catchError(this.handleError<People[]>('getFilms', []))
    );
  }
  getPerson(id:string): Observable<People> {
    const url = `${this.peopleUrl}/${id}`;
    return this.http.get<People>(url).pipe(
      tap(_ => console.log(`fetched person id=${id}`)),
      catchError(this.handleError<People>(`getPerson id=${id}`))
    );
  }
}
