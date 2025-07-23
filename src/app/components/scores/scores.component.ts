import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ScoresService} from "../../services/scores.service";
import {AsyncPipe} from "@angular/common";
import {Scores} from "../../commons/scores";

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.css',
})
export class ScoresComponent implements OnInit {

  scores!: Observable<Scores>;

  constructor(private scoresService: ScoresService) {
  }

  ngOnInit() {
    this.scores = this.scoresService.getScores();
  }
}
