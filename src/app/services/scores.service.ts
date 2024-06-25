import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {Scores} from "../commons/scores";

@Injectable({
  providedIn: 'root'
})
export class ScoresService implements OnInit {

  scores: BehaviorSubject<Scores> = new BehaviorSubject<Scores>({
    pointsNoughts: 0,
    pointsCross: 0
  });

  ngOnInit() {

  }

  constructor() { }

  getScores(): Observable<Scores> {
    return this.scores.asObservable();
  }

  setScores(scores: Scores) {
    this.scores.next(scores);
  }

  showScores() {
    console.log(this.scores);
  }

}
