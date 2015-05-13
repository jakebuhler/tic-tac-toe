var TicTacToe = require("../../src/server/TicTacToe");


describe("TicTacToe", function () {

    var ticTacToe, players, board;

    beforeEach(function () {
        var playerInterface = [
            "tell", "gameJoined", "opponentJoined", "opponentLeft",
            "waitForOpponent", "getName", "addChat"
        ];
        players = [
            jasmine.createSpyObj("player 1", playerInterface),
            jasmine.createSpyObj("player 2", playerInterface),
            jasmine.createSpyObj("player 3", playerInterface)
        ];
        board = jasmine.createSpyObj("board", ["startGame", "takeCell"]);
        ticTacToe = new TicTacToe(board);
    });

    describe("adding and removing players", function () {

        it("generates sequential player IDs", function () {
            var id1, id2, id3;

            id1 = ticTacToe.addPlayer(players[0]);
            id2 = ticTacToe.addPlayer(players[1]);
            ticTacToe.removePlayer(id2);
            id3 = ticTacToe.addPlayer(players[2]);

            expect(id1).toBe(1);
            expect(id2).toBe(2);
            expect(id3).toBe(3);
        });

        it("does not allow adding more than two players", function () {
            var id3;

            ticTacToe.addPlayer(players[0]);
            ticTacToe.addPlayer(players[1]);
            id3 = ticTacToe.addPlayer(players[2]);

            expect(id3).toBeNull();
            expect(players[2].tell).toHaveBeenCalledWith(
                "Sorry, there's already a game in progress."
            );
        });

        it("tells the first player to wait for opponent", function () {
            ticTacToe.addPlayer(players[0]);
            expect(players[0].waitForOpponent).toHaveBeenCalled();
        });

        it("tells players when an opponent joins", function () {
            ticTacToe.addPlayer(players[0]);
            ticTacToe.addPlayer(players[1]);

            expect(players[0].opponentJoined).toHaveBeenCalledWith(players[1]);
            expect(players[1].opponentJoined).toHaveBeenCalledWith(players[0]);
        });

        it("starts a new game with player 1 as X", function () {
            ticTacToe.addPlayer(players[0]);
            ticTacToe.addPlayer(players[1]);

            expect(board.startGame)
                .toHaveBeenCalledWith(players[0], players[1]);
        });

        it("tells player when opponent leaves the game", function () {
            var id1;

            id1 = ticTacToe.addPlayer(players[0]);
            ticTacToe.addPlayer(players[1]);
            ticTacToe.removePlayer(id1);

            expect(players[1].opponentLeft).toHaveBeenCalled();
        });

        it("returns player given an ID", function () {
            var id1, id2, id3;

            id1 = ticTacToe.addPlayer(players[0]);
            id2 = ticTacToe.addPlayer(players[1]);
            ticTacToe.removePlayer(id2);
            id3 = ticTacToe.addPlayer(players[2]);

            expect(ticTacToe.player(id1)).toBe(players[0]);
            expect(ticTacToe.player(id2)).toBeNull();
            expect(ticTacToe.player(id3)).toBe(players[2]);
        });

        it("returns a player's opponent given an ID", function () {
            var id1, id2, id3;

            id1 = ticTacToe.addPlayer(players[0]);
            id2 = ticTacToe.addPlayer(players[1]);
            ticTacToe.removePlayer(id2);
            id3 = ticTacToe.addPlayer(players[2]);

            expect(ticTacToe.opponentOf(id1)).toBe(players[2]);
            expect(ticTacToe.opponentOf(id2)).toBeNull();
            expect(ticTacToe.opponentOf(id3)).toBe(players[0]);
        });

    });

    describe("chatting", function () {

        it("sends chats to both players", function () {
            var id1, id2;

            id1 = ticTacToe.addPlayer(players[0]);
            id2 = ticTacToe.addPlayer(players[1]);
            ticTacToe.sendChat(id1, "hello");

            expect(players[0].addChat).toHaveBeenCalledWith({
                name: players[0].getName(), text: "hello"
            });
            expect(players[1].addChat).toHaveBeenCalledWith({
                name: players[0].getName(), text: "hello"
            });
        });

        it("doesn't choke when missing opponents", function () {
            var id1;

            id1 = ticTacToe.addPlayer(players[0]);
            ticTacToe.sendChat(id1, "hello");

            expect(players[0].addChat).toHaveBeenCalled();
        });

    });

    describe("making moves", function () {

        it("registers the move on the board", function () {
            var id1;
            var cell = { row: 0, col: 0 };

            id1 = ticTacToe.addPlayer(players[0]);
            ticTacToe.addPlayer(players[1]);
            ticTacToe.takeCell(id1, cell);

            expect(board.takeCell).toHaveBeenCalledWith(players[0], cell);
        });

    });

});
