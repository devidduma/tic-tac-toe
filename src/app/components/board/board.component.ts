import {Component, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Observable} from "rxjs";
import {BoardService} from "../../services/board.service";

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

  board!: Observable<number[][]>;

  constructor(private boardService: BoardService) {
  }

  ngOnInit() {
    this.board = this.boardService.getBoard();
  }

  play(row: number, col: number) {
    this.boardService.play(row, col);
  }
}
