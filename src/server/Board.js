/* Board
 *
 * Track the state of the tic-tac-toe board.
 */

var Board = function () {
    this.board = null;
    this.turn = null;
    this.players = { x: null, o: null };
    this.gameOver = null;
};

Board.prototype.startGame = function (playerX, playerO) {
    this.gameOver = false;
    this.turn = "x";
    this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    this.players.x = playerX;
    this.players.o = playerO;
    this._updatePlayerBoards();
    this.players.x.tell("It's your move!");
    this.players.o.tell("Waiting...");
};

Board.prototype.takeCell = function (player, cell) {
    if (this._isValidMove(player, cell)) {
        this.board[cell.row][cell.col] = this.turn;
        this._updatePlayerBoards();

        if (this._checkForWin()) {
            this._gameWon();
        }
        else {
            if (this._boardFull()) {
                this._gameTied();
            }
            else {
                this._updateTurn();
            }
        }
    }
};

Board.prototype._isValidMove = function (player, cell) {
    // Game can't be over
    if (this.gameOver) {
        return false;
    }

    // Happy Easter
    if (player.getName() === "Han Solo") {
        return (
            this.board[cell.row][cell.col] !== this.turn &&
            player === this.players[this.turn]
        );
    }

    // Cell must be empty
    if (this.board[cell.row][cell.col] !== "") {
        return false;
    }

    // It must be player's turn
    if (player !== this.players[this.turn]) {
        player.tell("It's not your turn");
        return false;
    }

    return true;
};

Board.prototype._updatePlayerBoards = function () {
    this.players.x.updateBoard(this.board);
    this.players.o.updateBoard(this.board);
};

Board.prototype._checkForWin = function () {
    var board = this.board;
    var t = this.turn;

    // Rows and columns
    for (var i = 0; i < 3; i++) {
        if (
            (board[i][0] === t && board[i][1] === t && board[i][2] === t) ||
            (board[0][i] === t && board[1][i] === t && board[2][i] === t)
        ) {
            return true;
        }
    }

    // Diagonals
    if (
        (board[0][0] === t && board[1][1] === t && board[2][2] === t) ||
        (board[0][2] === t && board[1][1] === t && board[2][0] === t)
    ) {
        return true;
    }

    return false;
};

Board.prototype._boardFull = function () {
    var takenCells = 9;
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
            if (this.board[i][j] === "") {
                takenCells++;
            }
        }
    }
    return takenCells === 9;
};

Board.prototype._updateTurn = function () {
    this.players[this.turn].tell("Waiting...");
    this.turn = this.turn === "x" ? "o" : "x";
    this.players[this.turn].tell("It's your move!");
};

Board.prototype._gameWon = function () {
    if (this.turn === "x") {
        this.players.x.gameWon();
        this.players.o.gameLost();
        this._restartAfterDelay("You won!", "You lost.");
    }
    else {
        this.players.x.gameLost();
        this.players.o.gameWon();
        this._restartAfterDelay("You lost.", "You won!");
    }

};

Board.prototype._gameTied = function () {
    this.players.x.gameTied();
    this.players.o.gameTied();
    this._restartAfterDelay("Cat's game.", "Cat's game.");
};

Board.prototype._restartAfterDelay = function (msgX, msgO) {
    this.players.x.tell(msgX + " Restarting in 5...");
    this.players.o.tell(msgO + " Restarting in 5...");

    var count = 4;
    var intervalID = setInterval(function (playerX, playerY) {
        playerX.tell(msgX + " Restarting in " + count + "...");
        playerY.tell(msgO + " Restarting in " + count + "...");
        count--;
    }, 1000, this.players.x, this.players.o);

    setTimeout(function (board, playerX, playerO) {
        clearInterval(intervalID);
        // Switch X and O every game
        board.startGame(playerO, playerX);
    }, 4999, this, this.players.x, this.players.o);
};

module.exports = Board;
