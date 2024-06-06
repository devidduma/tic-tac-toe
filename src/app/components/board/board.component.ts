import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
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
      this.statusIndex = 3;
    } else if(product == 8) {
      this.statusIndex = 4;
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

}
