/* Player
 *
 * Represent a player connected to the game over Socket.IO
 */

var Player = function (socket, name) {
    this.socket = socket;
    this.opponent = null;
    this.name = name;
    this.wins = 0;
    this.losses = 0;
    this.ties = 0;
};

Player.prototype.tell = function (message) {
    this.socket.emit("show message", message);
};

Player.prototype.waitForOpponent = function () {
    this.tell("Waiting for opponent...");
};

Player.prototype.gameJoined = function () {
    this.socket.emit("login successful");
    this.socket.emit("update player", this.asObj());
};

Player.prototype.opponentJoined = function (opponent) {
    this.opponent = opponent;
    this.socket.emit("update opponent", opponent.asObj());
    this.tell("");
};

Player.prototype.opponentLeft = function (opponent) {
    this.opponent = null;
    this.socket.emit("update opponent");
    this.waitForOpponent();
    // Clear the board
    this.socket.emit("update board");
};

Player.prototype.opponentUpdated = function () {
    this.socket.emit("update opponent", this.opponent.asObj());
};

Player.prototype.gameWon = function () {
    this.wins++;
    this.socket.emit("update player", this.asObj());
    this.opponent.opponentUpdated();
};

Player.prototype.gameLost = function () {
    this.losses++;
    this.socket.emit("update player", this.asObj());
    this.opponent.opponentUpdated();
};

Player.prototype.gameTied = function () {
    this.ties++;
    this.socket.emit("update player", this.asObj());
    this.opponent.opponentUpdated();
};

Player.prototype.addChat = function (chat) {
    this.socket.emit("add chat", chat);
};

Player.prototype.updateBoard = function (board) {
    this.socket.emit("update board", board);
};

Player.prototype.getName = function () {
    return this.name;
};

Player.prototype.asObj = function () {
    return {
        name: this.name,
        wins: this.wins,
        losses: this.losses,
        ties: this.ties
    };
};

module.exports = Player;
