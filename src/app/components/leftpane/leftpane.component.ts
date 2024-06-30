import {Component, ViewChild} from '@angular/core';
import {BoardComponent} from "../board/board.component";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-leftpane',
  standalone: true,
  imports: [],
  templateUrl: './leftpane.component.html',
  styleUrl: './leftpane.component.css'
})
export class LeftpaneComponent {

  constructor(private boardService: BoardService) {
  }

  firstToPlayNoughts() {
    this.boardService.firstToPlayNoughts();
  }

  firstToPlayCross() {
    this.boardService.firstToPlayCross();
  }

  restart() {
    this.boardService.restart();
  }
}
