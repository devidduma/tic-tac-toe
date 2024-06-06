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
    if(this.turn <= 9) {
      if((this.turn + this.turnShift) % 2 == 0) {
        this.noughtsPlay(row, col);
      } else {
        this.crossPlay(row, col);
      }
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
