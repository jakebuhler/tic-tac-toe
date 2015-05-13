var TicTacToeClient = require("./TicTacToeClient");
var LoginView = require("./LoginView");
var MessageView = require("./MessageView");
var ChatView = require("./ChatView");
var UserView = require("./UserView");
var BoardView = require("./BoardView");


$(function () {

// Create objects
var client = new TicTacToeClient();
var loginView = new LoginView();
var messageView = new MessageView();
var chatView = new ChatView();
var playerView = new UserView();
var opponentView = new UserView();
var boardView = new BoardView();

// Connect event handlers
loginView.on("loginSubmitted", client.login, client);
client.on("loginSuccessful", loginView.remove, loginView);
client.on("loginSuccessful", chatView.show, chatView);
client.on("updatePlayer", playerView.setUser, playerView);
client.on("updateOpponent", opponentView.setUser, opponentView);
client.on("showMessage", messageView.setMessage, messageView);
client.on("addChat", chatView.addChat, chatView);
client.on("updateBoard", boardView.setBoard, boardView);
chatView.on("chatSubmitted", client.chat, client);
boardView.on("cellClicked", client.takeCell, client);

// Render top level views and append them to the DOM
$("#leftColumn").append(playerView.render().el);
$("#centerColumn").append(loginView.render().el);
$("#centerColumn").append(boardView.render().el);
$("#centerColumn").append(messageView.render().el);
$("#centerColumn").append(chatView.render().el);
$("#rightColumn").append(opponentView.render().el);

});
