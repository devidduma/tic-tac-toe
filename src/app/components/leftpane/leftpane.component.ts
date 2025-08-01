import {Component, OnInit} from '@angular/core';
import {BoardService} from "../../services/board.service";
import {AsyncPipe, NgClass} from "@angular/common";
import {Observable} from "rxjs";

@Component({
  selector: 'app-leftpane',
  standalone: true,
  imports: [
    NgClass,
    AsyncPipe
  ],
  templateUrl: './leftpane.component.html',
  styleUrl: './leftpane.component.css'
})
export class LeftpaneComponent implements OnInit {

  public firstToPlay!: Observable<number>;

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    this.firstToPlay = this.boardService.getFirstToPlay();
  }

  firstToPlayHuman() {
    this.boardService.firstToPlayHuman();
  }

  firstToPlayRobot() {
    this.boardService.firstToPlayRobot();
  }

  restart() {
    this.boardService.restart();
  }
}
