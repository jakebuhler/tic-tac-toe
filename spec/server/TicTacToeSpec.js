var TicTacToe = require("../../src/server/TicTacToe");


describe("TicTacToe", function () {

    var ticTacToe, board, player, opponent, third;

    beforeEach(function () {
        board = jasmine.createSpyObj("board", ["startGame", "takeCell"]);
        ticTacToe = new TicTacToe(board);

        var playerInterface = [
            "tell", "gameJoined", "opponentJoined", "opponentLeft",
            "getName", "addChat"
        ];
        player = jasmine.createSpyObj("player", playerInterface);
        opponent = jasmine.createSpyObj("opponent", playerInterface);
        third = jasmine.createSpyObj("third", playerInterface);
    });

    describe("adding players", function () {

        it("generates sequential player IDs", function () {
            var id1 = ticTacToe.addPlayer(player);
            var id2 = ticTacToe.addPlayer(opponent);
            ticTacToe.removePlayer(id2);
            var id3 = ticTacToe.addPlayer(third);

            expect(id1).toBe(1);
            expect(id2).toBe(2);
            expect(id3).toBe(3);
        });

        describe("when the game is full", function () {

            beforeEach(function () {
                ticTacToe.addPlayer(player);
                ticTacToe.addPlayer(opponent);
            });

            it("does not add more players", function () {
                var id = ticTacToe.addPlayer(third);

                expect(id).toBeNull();
                expect(third.tell).toHaveBeenCalledWith(
                    "Sorry, there's already a game in progress."
                );
            });

        });

        describe("when there isn't an opponent", function () {

            it("tells the first player to wait for opponent", function () {
                ticTacToe.addPlayer(player);
                expect(player.tell).toHaveBeenCalledWith(
                    "Waiting for opponent..."
                );
            });

        });

        describe("when there is an opponent", function () {

            beforeEach(function () {
                ticTacToe.addPlayer(opponent);
            });

            it("tells players their opponent joined", function () {
                ticTacToe.addPlayer(player);

                expect(player.opponentJoined).toHaveBeenCalledWith(opponent);
                expect(opponent.opponentJoined).toHaveBeenCalledWith(player);
            });

            it("starts a new game with the first player as X", function () {
                ticTacToe.addPlayer(player);

                expect(board.startGame).toHaveBeenCalledWith(opponent, player);
            });

        });

    });

    describe("removing players", function () {


        describe("when there is an opponent", function () {

            var opponentID;

            beforeEach(function () {
                opponentID = ticTacToe.addPlayer(opponent);
            });

            it("tells player when opponent leaves the game", function () {
                ticTacToe.addPlayer(player);
                ticTacToe.removePlayer(opponentID);

                expect(player.opponentLeft).toHaveBeenCalled();
            });

        });

    });

    describe("taking cells", function () {

        it("registers the move on the board", function () {
            var cell = { row: 0, col: 0 };

            var playerID = ticTacToe.addPlayer(player);
            ticTacToe.addPlayer(opponent);
            ticTacToe.takeCell(playerID, cell);

            expect(board.takeCell).toHaveBeenCalledWith(player, cell);
        });

    });

    describe("chatting", function () {

        describe("when there is an opponent", function () {

            var opponentID;

            beforeEach(function () {
                opponentID = ticTacToe.addPlayer(opponent);
            });

            it("sends chats to both players", function () {
                playerID = ticTacToe.addPlayer(player);
                ticTacToe.sendChat(playerID, "hello");

                expect(player.addChat).toHaveBeenCalledWith({
                    name: player.getName(), text: "hello"
                });
                expect(opponent.addChat).toHaveBeenCalledWith({
                    name: player.getName(), text: "hello"
                });
            });

        });

        describe("when there isn't an opponent", function () {

            it("sends chat to the player", function () {
                var playerID = ticTacToe.addPlayer(player);
                ticTacToe.sendChat(playerID, "hello");

                expect(player.addChat).toHaveBeenCalled();
            });

        });

    });

});
