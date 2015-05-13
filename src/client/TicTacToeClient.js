/* TicTacToeClient
 *
 * Communicates with the tic-tac-toe backend over Socket.IO
 */

var TicTacToeClient = function () {
    this.socket = io();

    // Listen to Socket.IO events from the server
    var self = this;
    this.socket.on("login successful", function (user) {
        self.trigger("loginSuccessful", user);
    });
    this.socket.on("update player", function (player) {
        self.trigger("updatePlayer", player);
    });
    this.socket.on("update opponent", function (opponent) {
        self.trigger("updateOpponent", opponent);
    });
    this.socket.on("show message", function (message) {
        self.trigger("showMessage", message);
    });
    this.socket.on("add chat", function (chat) {
        self.trigger("addChat", chat);
    });
    this.socket.on("update board", function (board) {
        self.trigger("updateBoard", board);
    });
};

_.extend(TicTacToeClient.prototype, Backbone.Events, {

    login: function (username) {
        this.socket.emit("login", username);
    },

    takeCell: function (cell) {
        this.socket.emit("take cell", cell);
    },

    chat: function (message) {
        this.socket.emit("chat", message);
    }

});


module.exports = TicTacToeClient;
