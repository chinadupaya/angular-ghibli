import { Component, OnInit, Input } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { People } from '../people';
import { PeopleService } from '../people.service';

import { Film } from '../film';
import { FilmService } from '../film.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {
  person: People;
  film: Film;
  constructor(
    private peopleService: PeopleService,
    private filmService: FilmService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.getPerson()
  }
  getPerson(): void{
    const id = this.route.snapshot.paramMap.get('id');

    this.peopleService.getPerson(id)
      .subscribe(person => {
        this.person = person;
        var filmId = this.person.films[0].split('/')
        console.log("filmid: " + filmId[filmId.length-1])
        this.filmService.getFilm(filmId[filmId.length-1]).subscribe(film => this.film = film);});
  }
  goBack(): void {
    this.location.back();
  }
}
