import {Component, ViewChild} from '@angular/core';
import {BoardComponent} from "../board/board.component";
import {BoardService} from "../../services/board.service";
import {FeedbackService} from "../../services/feedback.service";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-leftpane',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './leftpane.component.html',
  styleUrl: './leftpane.component.css'
})
export class LeftpaneComponent {

  constructor(private boardService: BoardService) {
  }

  public startGameWith: number = 0;

  firstToPlayNoughts() {
    this.boardService.firstToPlayNoughts();
    this.startGameWith = this.boardService.turnShift;
  }

  firstToPlayCross() {
    this.boardService.firstToPlayCross();
    this.startGameWith = this.boardService.turnShift;
  }

  restart() {
    this.boardService.restart();
  }
}
