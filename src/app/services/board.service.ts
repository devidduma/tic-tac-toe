import {Injectable} from '@angular/core';
import {ScoresService} from "./scores.service";
import {FeedbackService} from "./feedback.service";
import {Scores} from "../commons/scores";
import {BehaviorSubject, Observable} from "rxjs";
import {GameStatus} from "../commons/game-status.enum";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private board: BehaviorSubject<number[][]> = new BehaviorSubject<number[][]>([
    [0,0,0], [0,0,0], [0,0,0]
  ]);

  getBoard(): Observable<number[][]> {
    return this.board.asObservable();
  }

  private turn: number = 0;
  private firstToPlay: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getFirstToPlay(): Observable<number> {
    return this.firstToPlay.asObservable();
  }

  // "ReadyToStart", "Playing", "NoughtsWin", "CrossWin", "Draw"
  public statusIndex: GameStatus = GameStatus.ReadyToStart;

  constructor(private scoresService: ScoresService, private feedbackService: FeedbackService) {
  }

  firstToPlayNoughts() {
    if(this.turn == 0)
      this.firstToPlay.next(0);

    if(this.statusIndex == GameStatus.ReadyToStart)
      this.feedbackService.setFeedbackMessage("Noughts starts first.");
  }

  firstToPlayCross() {
    if(this.turn == 0)
      this.firstToPlay.next(1);

    if(this.statusIndex == GameStatus.ReadyToStart)
      this.feedbackService.setFeedbackMessage("Cross starts first.");
  }

  play(row: number, col: number) {
    if(this.turn == 0)
      this.statusIndex = GameStatus.Playing;

    if(this.statusIndex <= GameStatus.Playing)
      this.feedbackService.setFeedbackMessage("");

    if(this.turn <= 9 && this.statusIndex == GameStatus.Playing) {

      if((this.turn + this.firstToPlay.getValue()) % 2 == 0) {
        this.noughtsPlay(row, col);
      } else {
        this.crossPlay(row, col);
      }

      this.checkGameStatus();
    }

    if(this.turn == 9 && this.statusIndex == GameStatus.Playing) {
      this.statusIndex = GameStatus.Draw;
      this.setNewScores(0, 0);
    }
  }

  setNewScores(addPointsNoughts: number, addPointsCross: number) {
    let newScores: Scores = {
      pointsNoughts: 0,
      pointsCross: 0
    };

    let data = this.scoresService.scores.getValue();

    newScores.pointsNoughts = data.pointsNoughts + addPointsNoughts;
    newScores.pointsCross = data.pointsCross + addPointsCross;
    this.scoresService.setScores(newScores);

    if(addPointsNoughts == 1)
      this.feedbackService.setFeedbackMessage("Noughts wins!");
    else if(addPointsCross == 1)
      this.feedbackService.setFeedbackMessage("Cross wins!");
    else if(addPointsNoughts == 0 && addPointsCross == 0)
      this.feedbackService.setFeedbackMessage("It's a draw.");
  }

  checkGameStatus() {
    for(let i: number = 0; i < 3; i++) {
      // break
      if(this.statusIndex != GameStatus.Playing)
        break;

      // check winner
      let productRows: number = 1;
      let productCols: number = 1;
      for(let ii: number = 0; ii < 3; ii++) {

        let data = this.board.getValue();

        productRows = productRows * data[i][ii];
        productCols = productCols * data[ii][i];
        this.board.next(data);
      }

      this.checkWinner(productRows);
      this.checkWinner(productCols);
    }

    let productDiag1: number = 0;
    let productDiag2: number = 0;

    let data = this.board.getValue();

    productDiag1 = data[0][0] * data[1][1] * data[2][2];
    productDiag2 = data[0][2] * data[1][1] * data[2][0];
    this.board.next(data);

    this.checkWinner(productDiag1);
    this.checkWinner(productDiag2);
  }

  checkWinner(product: number) {
    if(product == 1) {
      this.statusIndex = GameStatus.NoughtsWin;
      this.setNewScores(1,0);
    } else if(product == 8) {
      this.statusIndex = GameStatus.CrossWin;
      this.setNewScores(0, 1);
    }
  }

  private noughtsPlay(row: number, col: number) {
    let data = this.board.getValue()

    if(data[row][col] == 0) {
      data[row][col] = 1;
      this.turn++;
    }
    this.board.next(data);
  }

  private crossPlay(row: number, col: number) {
    let data = this.board.getValue();

    if(data[row][col] == 0) {
      data[row][col] = 2;
      this.turn++;
    }
    this.board.next(data);
  }

  restart() {
    this.board.next([
      [0,0,0], [0,0,0], [0,0,0]
    ]);
    this.turn = 0;
    this.statusIndex = GameStatus.ReadyToStart;

    this.feedbackService.setFeedbackMessage("Game restarted.");
  }
}
