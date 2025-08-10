import {Board} from "./board";
import {GameStatus} from "../commons/game-status.enum";

/*
 * Minimax algorithm
 * Rewritten from
 * Cledersonbc/tic-tac-toe-minimax
 */

export class Minimax {
  minimax(board: Board, player: number): [number, number, number] {
    // Best
    let best: [number, number, number][];
    if(player == 2) {
      best = [[-1, -1, -Infinity]];
    } else {
      best = [[-1, -1, Infinity]];
    }

    // Game status
    board.checkGameStatus();

    // Terminal state
    if(board.statusIndex > GameStatus.Playing) {
      const score = this.evaluate(board.statusIndex);
      return [-1, -1, score];
    }

    // Loop board
    for(let r: number = 0; r < 3; r++) {
      for(let c: number = 0; c < 3; c++) {
        // Empty cells
        if(board.state[r][c] != 0) {
          continue;
        }

        // Evaluate move for player
        board.state[r][c] = player;
        board.turn += 1;
        let score: [number, number, number] = this.minimax(board, player % 2 + 1);
        board.state[r][c] = 0;
        board.turn -= 1;
        score[0] = r;
        score[1] = c;

        if(player == 2) {
          if(score[2] > best[0][2]) {
            best = [score];
          } else if(score[2] == best[0][2]) {
            best.push(score);
          }
        } else {
          if(score[2] < best[0][2]) {
            best = [score];
          } else if(score[2] == best[0][2]) {
            best.push(score);
          }
        }
      }
    }

    // Best: return
    const randomBest = Math.floor(Math.random() * best.length);
    return best[randomBest];
  }

  private evaluate(statusIndex: GameStatus) {
    return statusIndex == GameStatus.RobotWin ? 1 : statusIndex == GameStatus.HumanWin ? -1 : 0;
  }
}
