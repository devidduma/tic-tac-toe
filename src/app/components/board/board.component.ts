import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ScoresService} from "../../services/scores.service";
import {Observable, take} from "rxjs";
import {Scores} from "../../commons/scores";
import {FeedbackService} from "../../services/feedback.service";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {

  board: number[][] = [
    [0,0,0], [0,0,0], [0,0,0]
  ];

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    this.boardService.board.subscribe(data => {
      this.board = data;
    });
  }

  play(number: number, index: number) {
    this.boardService.play(number, index);
  }
}
