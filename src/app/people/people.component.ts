import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { People } from '../people';
import { PeopleService } from '../people.service';
import {Observable, Subject } from 'rxjs';
import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';


@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  people: People[];
  origPeople: People[];
  @Output() valueChange = new EventEmitter();
  private searchTerms = new Subject<string>();
  search(term: string): void {
    this.searchTerms.next(term);
    this.valueChange.emit(term);
    if(term){
      this.people = Object.assign([], this.origPeople).filter(
        person => person.name.toLowerCase().indexOf(term.toLowerCase()) > -1
     )
    }else{
      this.people = this.origPeople
    }
  }
  constructor(
    private peopleService: PeopleService,
  ) { }

  ngOnInit(): void {
    this.getPeople()
  }
  getPeople(): void{
    this.peopleService.getPeople()
    .subscribe(people => {
      this.people = people;
      this.origPeople=people;
    });
  }
  

}
