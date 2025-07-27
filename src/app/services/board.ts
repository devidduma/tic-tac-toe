import {GameStatus} from "../commons/game-status.enum";

export class Board {
  public state: number[][];
  turn!: number;
  // "ReadyToStart", "Playing", "NoughtsWin", "CrossWin", "Draw"
  statusIndex!: GameStatus;

  constructor(state: number[][]) {
    this.state = state;
    this.checkTurn();
    this.checkGameStatus();
  }

  public makeMove(r: number, c: number, player: number) {
    if(this.statusIndex <= GameStatus.Playing) {
      this.state[r][c] = player;
      this.turn += 1;
    }
    this.checkGameStatus();
  }

  checkGameStatus() {
    // Ready to Start
    if(this.turn == 0) {
      this.statusIndex = GameStatus.ReadyToStart;
      return;
    }
    // Playing
    else if(this.turn > 0 && this.turn < 9) {
      this.statusIndex = GameStatus.Playing;
    }

    // Check winner
    for(let i: number = 0; i < 3; i++) {
      let productRows: number = 1;
      let productCols: number = 1;
      for(let ii: number = 0; ii < 3; ii++) {
        productRows = productRows * this.state[i][ii];
        productCols = productCols * this.state[ii][i];
      }

      this.checkWinner(productRows);
      this.checkWinner(productCols);
    }

    let productDiag1: number = 0;
    let productDiag2: number = 0;
    productDiag1 = this.state[0][0] * this.state[1][1] * this.state[2][2];
    productDiag2 = this.state[0][2] * this.state[1][1] * this.state[2][0];

    this.checkWinner(productDiag1);
    this.checkWinner(productDiag2);

    // Draw
    if(this.statusIndex == GameStatus.Playing && this.turn == 9) {
      this.statusIndex = GameStatus.Draw;
    }
  }

  private checkWinner(product: number) {
    if(product == 1) {
      this.statusIndex = GameStatus.HumanWin;
    } else if(product == 8) {
      this.statusIndex = GameStatus.RobotWin;
    }
  }

  checkTurn() {
    let turn = 0;

    for(let i: number = 0; i < 3; i++) {
      for(let ii: number = 0; ii < 3; ii++) {
        if(this.state[i][ii] != 0) {
          turn += 1;
        }
      }
    }
    this.turn = turn;
  }
}
