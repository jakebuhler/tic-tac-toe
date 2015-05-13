var TicTacToe = function (board) {
    // Don't use a playerID -> player hash here because that would
    // make it difficult to determine a player's opponent given the
    // player's ID
    this.players = [];
    this.playerIDs = [];
    this.nextID = 1;
    this.board = board;
};

TicTacToe.prototype.addPlayer = function (player) {
    if (this.isFull()) {
        player.tell("Sorry, there's already a game in progress.");
        return null;
    }
    else {
        var playerID = this.nextID++;
        this.players.push(player);
        this.playerIDs.push(playerID);

        player.gameJoined();

        if (this.isFull()) {
            var opponent = this.opponentOf(playerID);
            player.opponentJoined(opponent);
            opponent.opponentJoined(player);
            this.board.startGame(opponent, player);
        }
        else {
            player.waitForOpponent();
        }

        return playerID;
    }
};

TicTacToe.prototype.removePlayer = function (playerID) {
    var index = this.playerIDs.indexOf(playerID);
    this.playerIDs.splice(index, 1);
    this.players.splice(index, 1);

    if (this.players.length) {
        // ID must be zero since a player just left
        this.players[0].opponentLeft();
    }
};

TicTacToe.prototype.player = function (playerID) {
    var index = this.playerIDs.indexOf(playerID);
    return index === -1 ? null : this.players[index];
};

TicTacToe.prototype.opponentOf = function (playerID) {
    var index = this.playerIDs.indexOf(playerID);
    return index === -1 ? null : this.players[(index + 1) % 2];
};

TicTacToe.prototype.isFull = function () {
    return this.players.length >= 2;
};

TicTacToe.prototype.sendChat = function (playerID, text) {
    var player = this.player(playerID);
    var opponent = this.opponentOf(playerID);
    var chat = { name: player.getName(), text: text };
    player.addChat(chat);
    if (opponent) {
        opponent.addChat(chat);
    }
};

TicTacToe.prototype.takeCell = function (playerID, cell) {
    this.board.takeCell(this.player(playerID), cell);
};

module.exports = TicTacToe;
