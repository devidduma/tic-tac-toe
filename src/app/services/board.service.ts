import {Injectable, OnInit} from '@angular/core';
import {ScoresService} from "./scores.service";
import {FeedbackService} from "./feedback.service";
import {Scores} from "../commons/scores";
import {BehaviorSubject, Subject, take} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  board: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([
    [0,0,0], [0,0,0], [0,0,0]
  ]);

  private turn: number = 0;
  private turnShift: number = 0;

  // "ReadyToStart", "Playing", "NoughtsWin", "CrossWin", "Draw"
  public statusIndex: number = 0;

  private winningLine: [number, number][] = [];

  constructor(private scoresService: ScoresService, private feedbackService: FeedbackService) {
  }

  firstToPlayNoughts() {
    if(this.turn == 0)
      this.turnShift = 0;
  }
  firstToPlayCross() {
    if(this.turn == 0)
      this.turnShift = 1;
  }

  play(row: number, col: number) {
    if(this.turn == 0)
      this.statusIndex = 1;

    this.feedbackService.setFeedbackMessage("");

    if(this.turn <= 9 && this.statusIndex == 1) {

      if((this.turn + this.turnShift) % 2 == 0) {
        this.noughtsPlay(row, col);
      } else {
        this.crossPlay(row, col);
      }

      this.checkGameStatus();
    }
    if(this.turn == 9 && this.statusIndex == 1) {
      this.statusIndex = 4;
      this.setNewScores(0.5, 0.5);
    }

  }

  setNewScores(addPointsNoughts: number, addPointsCross: number) {
    let newScores: Scores = {
      pointsNoughts: 0,
      pointsCross: 0
    };

    this.scoresService.getScores().pipe(take(1)).subscribe(data => {
      newScores.pointsNoughts = data.pointsNoughts + addPointsNoughts;
      newScores.pointsCross = data.pointsCross + addPointsCross;
    });

    this.scoresService.setScores(newScores);

    if(addPointsNoughts == 1)
      this.feedbackService.setFeedbackMessage("Noughts wins!");
    else if(addPointsNoughts == 0)
      this.feedbackService.setFeedbackMessage("Cross wins!");
    else if(addPointsNoughts == 0.5)
      this.feedbackService.setFeedbackMessage("It's a draw.");
  }

  checkGameStatus() {

    for(let i: number = 0; i < 3; i++) {

      // break
      if(this.statusIndex != 1)
        break;

      // check winner
      let productRows: number = 1;
      let productCols: number = 1;
      for(let ii: number = 0; ii < 3; ii++) {

        this.board.pipe(take(1)).subscribe(data => {
          productRows = productRows * data[i][ii];
          productCols = productCols * data[ii][i];
        });
      }

      this.checkWinner(productRows);
      this.checkWinner(productCols);
    }

    let productDiag1: number = 0;
    let productDiag2: number = 0;

    this.board.pipe(take(1)).subscribe(data => {
      productDiag1 = data[0][0] * data[1][1] * data[2][2];
      productDiag2 = data[0][2] * data[1][1] * data[2][0];
    });

    this.checkWinner(productDiag1);
    this.checkWinner(productDiag2);
  }

  checkWinner(product: number) {
    if(product == 1) {
      this.statusIndex = 2;
      this.setNewScores(1,0);
    } else if(product == 8) {
      this.statusIndex = 3;
      this.setNewScores(0, 1);
    }
  }

  private noughtsPlay(row: number, col: number) {
    this.board.pipe(take(1)).subscribe(data => {
      if(data[row][col] == 0) {
        data[row][col] = 1;
        this.turn++;
      }
    });
  }

  private crossPlay(row: number, col: number) {
    this.board.pipe(take(1)).subscribe(data => {
      if(data[row][col] == 0) {
        data[row][col] = 2;
        this.turn++;
      }
    });
  }

  restart() {
    this.board.next([
      [0,0,0], [0,0,0], [0,0,0]
    ]);
    this.turn = 0;
    this.turnShift = 0;
    this.statusIndex = 0;
    this.winningLine = [];
  }

}
