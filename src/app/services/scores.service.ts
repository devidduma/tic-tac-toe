import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Scores} from "../commons/scores";

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  scores: BehaviorSubject<Scores> = new BehaviorSubject<Scores>({
    pointsHuman: 0,
    pointsRobot: 0
  });

  constructor() { }

  getScores(): Observable<Scores> {
    return this.scores.asObservable();
  }

  setScores(scores: Scores) {
    this.scores.next(scores);
  }
}
