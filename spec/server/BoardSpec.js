var Board = require("../../src/server/Board");


describe("Board", function () {

    var board, playerX, playerO;

    beforeEach(function () {
        var playerInterface = [
            "updateBoard", "tell", "getName",
            "gameWon", "gameLost", "gameTied"
        ];
        playerX = jasmine.createSpyObj("playerX", playerInterface);
        playerO = jasmine.createSpyObj("playerO", playerInterface);
        board = new Board();

        jasmine.clock().install();
    });

    afterEach(function () {
        jasmine.clock().uninstall();
    });

    it("updates the players' boards on game start", function () {
        board.startGame(playerX, playerO);

        expect(playerX.updateBoard).toHaveBeenCalledWith([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]);
        expect(playerO.updateBoard).toHaveBeenCalledWith([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]);
    });

    it("updates the players' boards on move", function () {
        board.startGame(playerX, playerO);
        board.takeCell(playerX, { row: 1, col: 1 });

        expect(playerX.updateBoard.calls.count()).toBe(2);
        expect(playerO.updateBoard.calls.count()).toBe(2);
        expect(playerX.updateBoard).toHaveBeenCalledWith([
            ['', '', ''],
            ['', 'x', ''],
            ['', '', '']
        ]);
        expect(playerO.updateBoard).toHaveBeenCalledWith([
            ['', '', ''],
            ['', 'x', ''],
            ['', '', '']
        ]);
    });

    it("doesn't let a player move out of turn", function () {
        board.startGame(playerX, playerO);
        board.takeCell(playerO, { row: 1, col: 1 });

        expect(playerO.tell).toHaveBeenCalledWith("It's not your turn");
        expect(playerX.updateBoard.calls.count()).toBe(1);
        expect(playerO.updateBoard.calls.count()).toBe(1);
    });

    it("doesn't let a player steal spaces", function () {
        board.startGame(playerX, playerO);
        board.takeCell(playerX, { row: 1, col: 1 });
        board.takeCell(playerO, { row: 1, col: 1 });

        // Two calls expected, one for the game start and
        // one for the first move, the second move is
        // ignored
        expect(playerX.updateBoard.calls.count()).toBe(2);
        expect(playerO.updateBoard.calls.count()).toBe(2);
    });

    it("tells players whose move it is", function () {
        board.startGame(playerX, playerO);
        expect(playerX.tell.calls.mostRecent().args).toEqual(["It's your move!"]);
        expect(playerO.tell.calls.mostRecent().args).toEqual(["Waiting..."]);

        board.takeCell(playerX, { row: 0, col: 0 });
        expect(playerX.tell.calls.mostRecent().args).toEqual(["Waiting..."]);
        expect(playerO.tell.calls.mostRecent().args).toEqual(["It's your move!"]);
    });

    it("tells players when they won or lost", function () {
        board.startGame(playerX, playerO);
        board.takeCell(playerX, { row: 0, col: 0 });
        board.takeCell(playerO, { row: 1, col: 0 });
        board.takeCell(playerX, { row: 1, col: 1 });
        board.takeCell(playerO, { row: 0, col: 1 });
        board.takeCell(playerX, { row: 2, col: 2 });

        expect(playerX.gameWon).toHaveBeenCalled();
        expect(playerO.gameLost).toHaveBeenCalled();
    });

    it("doesn't allow moves after game is over", function () {
        board.startGame(playerX, playerO);
        board.takeCell(playerX, { row: 0, col: 0 });
        board.takeCell(playerO, { row: 1, col: 1 });
        board.takeCell(playerX, { row: 1, col: 0 });
        board.takeCell(playerO, { row: 0, col: 1 });
        board.takeCell(playerX, { row: 2, col: 0 });

        // This move shouldn't be allowed because X won
        board.takeCell(playerO, { row: 0, col: 2 });

        expect(playerX.updateBoard.calls.count()).toBe(6);
        expect(playerO.updateBoard.calls.count()).toBe(6);
    });

    it("restarts the game after five seconds", function () {
        board.startGame(playerX, playerO);
        board.takeCell(playerX, { row: 1, col: 0 });
        board.takeCell(playerO, { row: 2, col: 1 });
        board.takeCell(playerX, { row: 1, col: 1 });
        board.takeCell(playerO, { row: 2, col: 0 });
        board.takeCell(playerX, { row: 1, col: 2 });

        expect(playerX.tell.calls.mostRecent().args)
            .toEqual(["You won! Restarting in 5..."]);
        expect(playerO.tell.calls.mostRecent().args)
            .toEqual(["You lost. Restarting in 5..."]);

        jasmine.clock().tick(1001);
        expect(playerX.tell.calls.mostRecent().args)
            .toEqual(["You won! Restarting in 4..."]);
        expect(playerO.tell.calls.mostRecent().args)
            .toEqual(["You lost. Restarting in 4..."]);

        jasmine.clock().tick(5001);
        expect(playerX.tell.calls.mostRecent().args).toEqual(["Waiting..."]);
        expect(playerO.tell.calls.mostRecent().args).toEqual(["It's your move!"]);
        expect(playerX.updateBoard.calls.count()).toBe(7);
        expect(playerO.updateBoard.calls.count()).toBe(7);
    });

    it("restarts the game after a draw", function () {
        board.startGame(playerX, playerO);
        board.takeCell(playerX, { row: 0, col: 0 });
        board.takeCell(playerO, { row: 0, col: 2 });
        board.takeCell(playerX, { row: 0, col: 1 });
        board.takeCell(playerO, { row: 1, col: 0 });
        board.takeCell(playerX, { row: 1, col: 2 });
        board.takeCell(playerO, { row: 1, col: 1 });
        board.takeCell(playerX, { row: 2, col: 0 });
        board.takeCell(playerO, { row: 2, col: 2 });
        board.takeCell(playerX, { row: 2, col: 1 });

        expect(playerX.gameTied).toHaveBeenCalled();
        expect(playerO.gameTied).toHaveBeenCalled();
        expect(playerX.tell.calls.mostRecent().args)
            .toEqual(["Cat's game. Restarting in 5..."]);
        expect(playerO.tell.calls.mostRecent().args)
            .toEqual(["Cat's game. Restarting in 5..."]);

        jasmine.clock().tick(5001);
        expect(playerX.tell.calls.mostRecent().args).toEqual(["Waiting..."]);
        expect(playerO.tell.calls.mostRecent().args).toEqual(["It's your move!"]);
        expect(playerX.updateBoard.calls.count()).toBe(11);
        expect(playerO.updateBoard.calls.count()).toBe(11);
    });

});
