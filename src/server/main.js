var express = require("express");
var http = require("http");
var socketio = require("socket.io");

var TicTacToe = require("./TicTacToe");
var Player = require("./Player");
var Board = require("./Board");

var app = express();
var server = http.Server(app);
var io = socketio(server);

var game = new TicTacToe(new Board());

app.use("/", express.static("public"));
app.use("/jquery", express.static("node_modules/jquery/dist"));
app.use("/underscore", express.static("node_modules/underscore"));
app.use("/backbone", express.static("node_modules/backbone"));

io.on("connection", function (socket) {

    console.log("a user connected");

    socket.on("login", function (name) {
        // Store the playerID in the socket session, this will
        // be null if the game is full
        socket.playerID = game.addPlayer(new Player(socket, name));
        console.log("user logged in: " + name);
    });

    socket.on("disconnect", function () {
        if (socket.playerID) {
            game.removePlayer(socket.playerID);
        }
    });

    socket.on("chat", function (message) {
        if (socket.playerID) {
            game.sendChat(socket.playerID, message);
        }
    });

    socket.on("take cell", function (cell) {
        if (socket.playerID) {
            game.takeCell(socket.playerID, cell);
        }
    });

});

server.listen(3000, function () {
    console.log("tic-tac-toe server running on *:3000");
    console.log("hit control+c to quit");
});
