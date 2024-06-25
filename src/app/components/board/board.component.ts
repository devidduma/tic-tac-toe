import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ScoresService} from "../../services/scores.service";
import {Observable, take} from "rxjs";
import {Scores} from "../../commons/scores";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent {

  board: number[][] = [
    [0,0,0], [0,0,0], [0,0,0]
  ];

  private turn: number = 0;
  private turnShift: number = 0;

  // "ReadyToStart", "Playing", "NoughtsWin", "CrossWin", "Draw"
  private statusIndex: number = 0;

  private winningLine: [number, number][] = [];

  constructor(private scoresService: ScoresService) {
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

    if(this.turn <= 9 && this.statusIndex == 1) {

      if((this.turn + this.turnShift) % 2 == 0) {
        this.noughtsPlay(row, col);
      } else {
        this.crossPlay(row, col);
      }

      this.checkGameStatus();
    }
    else if(this.turn == 10) {
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

        productRows = productRows * this.board[i][ii];
        productCols = productCols * this.board[ii][i];
      }

      this.checkWinner(productRows);
      this.checkWinner(productCols);
    }

    let productDiag1: number = this.board[0][0] * this.board[1][1] * this.board[2][2];
    let productDiag2: number = this.board[0][2] * this.board[1][1] * this.board[2][0];

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
    if(this.board[row][col] == 0) {
      this.board[row][col] = 1;
      this.turn++;
    }
  }

  private crossPlay(row: number, col: number) {
    if(this.board[row][col] == 0) {
      this.board[row][col] = 2;
      this.turn++;
    }
  }

  restart() {
    this.board = [
      [0,0,0], [0,0,0], [0,0,0]
    ];
    this.turn = 0;
    this.turnShift = 0;
    this.statusIndex = 0;
    this.winningLine = [];
  }
}
