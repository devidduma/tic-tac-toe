import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {ScoresService} from "../../services/scores.service";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.css',
  providers: [
    ScoresService
  ]
})
export class ScoresComponent implements OnInit {
  protected pointsNoughts: number = 0;
  protected pointsCross: number = 0;

  constructor(private scoresService: ScoresService) {
  }

  ngOnInit() {
    this.scoresService.getScores().subscribe(data => {
      this.pointsNoughts = data.pointsNoughts;
      this.pointsCross = data.pointsCross;
    });
  }

  showData() {
    this.scoresService.showScores();
  }
}
