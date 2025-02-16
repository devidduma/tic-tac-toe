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

  constructor(private boardService: BoardService, private feedbackService: FeedbackService) {
  }

  public startGameWith: number = 0;

  firstToPlayNoughts() {
    this.boardService.firstToPlayNoughts();
    this.startGameWith = 0;
    if(this.boardService.statusIndex == 0)
      this.feedbackService.setFeedbackMessage("Noughts starts first.");
  }

  firstToPlayCross() {
    this.boardService.firstToPlayCross();
    this.startGameWith = 1;
    if(this.boardService.statusIndex == 0)
      this.feedbackService.setFeedbackMessage("Cross starts first.");
  }

  restart() {
    this.boardService.restart();
    this.feedbackService.setFeedbackMessage("Game restarted.");
  }
}
