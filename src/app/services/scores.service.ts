import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {Scores} from "../commons/scores";

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  scores: Scores = new Scores();

  constructor() { }

  getScores(): Observable<Scores> {
    return of(this.scores);
  }

}
