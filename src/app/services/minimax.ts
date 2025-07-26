import {cloneDeep} from "lodash";

/*
 * Minimax algorithm
 * Rewritten from
 * Cledersonbc/tic-tac-toe-minimax
 */

export class Minimax {
  minimax(state: number[][], depth: number, player: number) {
    // Best
    let best: number[];
    if(player == 2) {
      best = [-1, -1, -Infinity];
    } else {
      best = [-1, -1, Infinity];
    }

    // Terminal state
    if(depth == 0 || this.gameOver(state)) {
      const score = this.evaluate(state);
      return [-1, -1, score];
    }

    // Loop board
    for(let r: number = 0; r < 3; r++) {
      for(let c: number = 0; c < 3; c++) {
        // Empty cells
        if(state[r][c] != 0) {
          continue;
        }

        // Evaluate move for player
        state[r][c] = player;
        let score: number[] = this.minimax(cloneDeep(state), depth - 1, player % 2 + 1);
        state[r][c] = 0;
        score[0] = r;
        score[1] = c;

        if(player == 2) {
          if(score[2] > best[2]) {
            best = score;
          }
        } else {
          if(score[2] < best[2]) {
            best = score;
          }
        }
      }
    }

    // Best: return
    return best;
  }

  private gameOver(state: number[][]) {
    return this.checkWinner(state) != 0;
  }

  private evaluate(state: number[][]) {
    const winner = this.checkWinner(state);
    return winner == 2 ? 1 : winner == 1 ? -1 : 0;
  }

  private checkWinner(state: number[][]): number {
    // Rows and Columns
    for(let i = 0; i < 3; i++) {
      let productRows: number = 1;
      let productCols: number = 1;
      for(let ii = 0; ii < 3; ii++) {
        productRows = productRows * state[i][ii];
        productCols = productCols * state[ii][i];
      }
      // Check winner
      if(productRows == 1 || productCols == 1) {
        return 1;
      } else if(productRows == 8 || productCols == 8) {
        return 2;
      }
    }
    // Diagonals
    let productDiag1: number = state[0][0] * state[1][1] * state[2][2];
    let productDiag2: number = state[0][2] * state[1][1] * state[2][0];
    // Check winner
    if(productDiag1 == 1 || productDiag2 == 1) {
      return 1;
    } else if(productDiag1 == 8 || productDiag2 == 8) {
      return 2;
    }

    // No winner
    return 0;
  }
}
