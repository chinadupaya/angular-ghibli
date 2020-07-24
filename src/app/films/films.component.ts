import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Film } from '../film';
import { FilmService }  from '../film.service';
import {Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[]
  origFilms: Film[]
  @Output() valueChange = new EventEmitter();
  private searchTerms = new Subject<string>();
  search(term: string): void{
    
    this.searchTerms.next(term);
    this.valueChange.emit(term);
    if(term){
      this.films = Object.assign([], this.origFilms).filter(
        film => film.title.toLowerCase().indexOf(term.toLowerCase()) > -1
     )
    }else{
      this.films = this.origFilms
    }
  }
  constructor(
    private filmService: FilmService,

  ) { }
  ngOnInit(): void {
    this.getFilms()
  }
  getFilms(): void {
    this.filmService.getFilms()
    .subscribe(films => {
      this.films = films;
      this.origFilms = films
    });
  }


}
