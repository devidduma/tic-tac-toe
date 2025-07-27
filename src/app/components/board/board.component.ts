import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Observable} from "rxjs";
import {BoardService} from "../../services/board.service";
import {Board} from "../../services/board";

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {

  board!: Observable<Board>;

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    this.board = this.boardService.getBoard();
  }

  humanPlay(row: number, col: number) {
    this.boardService.humanPlay(row, col);
  }
}
