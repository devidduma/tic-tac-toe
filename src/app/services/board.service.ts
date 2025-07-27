import {Injectable} from '@angular/core';
import {ScoresService} from "./scores.service";
import {FeedbackService} from "./feedback.service";
import {Scores} from "../commons/scores";
import {BehaviorSubject, Observable} from "rxjs";
import {GameStatus} from "../commons/game-status.enum";
import {Minimax} from "./minimax";
import {Board} from "./board";
import {cloneDeep} from "lodash";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private board: BehaviorSubject<Board> = new BehaviorSubject<Board>(
    new Board([[0,0,0], [0,0,0], [0,0,0]])
  );

  getBoard(): Observable<Board> {
    return this.board.asObservable();
  }

  private firstToPlay: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  getFirstToPlay(): Observable<number> {
    return this.firstToPlay.asObservable();
  }

  constructor(private scoresService: ScoresService, private feedbackService: FeedbackService) {
  }

  firstToPlayHuman() {
    this.restart(false);
    this.firstToPlay.next(0);
    this.feedbackService.setFeedbackMessage("Human starts first.");
  }

  async firstToPlayRobot() {
    this.restart(false);
    this.firstToPlay.next(1);
    this.feedbackService.setFeedbackMessage("Robot starts first.");

    await this.wait(750);
    this.robotPlay();
  }

  private setNewScores(addPointsHuman: number, addPointsRobot: number) {
    let newScores: Scores = {
      pointsHuman: 0,
      pointsRobot: 0
    };

    let data = this.scoresService.scores.getValue();

    newScores.pointsHuman = data.pointsHuman + addPointsHuman;
    newScores.pointsRobot = data.pointsRobot + addPointsRobot;
    this.scoresService.setScores(newScores);

    if(addPointsHuman == 1)
      this.feedbackService.setFeedbackMessage("Human wins!");
    else if(addPointsRobot == 1)
      this.feedbackService.setFeedbackMessage("Robot wins!");
    else if(addPointsHuman == 0 && addPointsRobot == 0)
      this.feedbackService.setFeedbackMessage("It's a draw.");
  }

  private checkGameStatus() {
    const board = this.board.getValue();
    board.checkGameStatus();

    if(board.statusIndex <= GameStatus.Playing) {
      this.feedbackService.setFeedbackMessage("");
    } else if(board.statusIndex == GameStatus.HumanWin) {
      this.setNewScores(1,0);
    } else if(board.statusIndex == GameStatus.RobotWin) {
      this.setNewScores(0, 1);
    } else if(board.statusIndex == GameStatus.Draw) {
      this.setNewScores(0, 0);
    }
  }

  async humanPlay(row: number, col: number) {
    const board = this.board.getValue();

    if(board.statusIndex > GameStatus.Playing) {
      return;
    }

    if((board.turn + this.firstToPlay.getValue()) % 2 != 0) {
      return;
    }

    if(board.state[row][col] == 0) {
      board.makeMove(row, col, 1);
      this.board.next(board);

      this.checkGameStatus();

      await this.wait(500);
      this.robotPlay();
    }
  }

  private robotPlay() {
    const board = this.board.getValue();

    if(board.statusIndex > GameStatus.Playing) {
      return;
    }

    if((board.turn + this.firstToPlay.getValue()) % 2 != 1) {
      return;
    }

    const minimax = new Minimax();
    const [row, col, score] = minimax.minimax(cloneDeep(board), 2);
    console.log(row, col, score);

    if(board.state[row][col] == 0) {
      board.makeMove(row, col, 2);
      this.board.next(board);

      this.checkGameStatus();
    }
  }

  async restart(message: boolean = true) {
    const board = new Board([[0,0,0], [0,0,0], [0,0,0]]);
    this.board.next(board);

    this.feedbackService.setFeedbackMessage("Game restarted.");

    if(this.firstToPlay.getValue() == 1) {
      await this.wait(750);
      this.robotPlay();
    }
  }

  wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
