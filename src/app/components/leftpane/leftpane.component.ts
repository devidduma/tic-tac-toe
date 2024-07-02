import {Component, ViewChild} from '@angular/core';
import {BoardComponent} from "../board/board.component";
import {BoardService} from "../../services/board.service";
import {FeedbackService} from "../../services/feedback.service";

@Component({
  selector: 'app-leftpane',
  standalone: true,
  imports: [],
  templateUrl: './leftpane.component.html',
  styleUrl: './leftpane.component.css'
})
export class LeftpaneComponent {

  constructor(private boardService: BoardService, private feedbackService: FeedbackService) {
  }

  firstToPlayNoughts() {
    this.boardService.firstToPlayNoughts();
    if(this.boardService.statusIndex == 0)
      this.feedbackService.setFeedbackMessage("Noughts starts first.");
  }

  firstToPlayCross() {
    this.boardService.firstToPlayCross();
    if(this.boardService.statusIndex == 0)
      this.feedbackService.setFeedbackMessage("Cross starts first.");
  }

  restart() {
    this.boardService.restart();
    this.feedbackService.setFeedbackMessage("Game restarted.");
  }
}
