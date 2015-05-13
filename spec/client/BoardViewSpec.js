var BoardView = require("../../src/client/BoardView");
var utils = require("./utils");


describe("BoardView", function () {

    var view, listener;

    beforeEach(function () {
        view = new BoardView();
        listener = jasmine.createSpyObj("listener", ["cellClicked"]);

        view.on("cellClicked", listener.cellClicked, listener);
        // Render the view and insert it into the DOM
        view.render().$el.appendTo(document.body);
    });

    it("renders a tic-tac-toe board", function () {
        var rows, cols;
        var board = [
            ['x', '', ''],
            ['', 'y', ''],
            ['', '', 'y'],
        ];

        view.setBoard(board);

        rows = view.$el.find("tr");
        expect(rows.length).toBe(3);
        rows.each(function (i) {
            cols = $(this).find("td");
            expect(cols.length).toBe(3);
            cols.each(function (j) {
                if (board[i][j]) {
                    expect($(this).hasClass(board[i][j])).toBeTruthy();
                }
            });
        });
    });

    it("clears the board", function () {
        view.setBoard([
            ['x', '', ''],
            ['', 'o', ''],
            ['', '', 'o'],
        ]);
        view.setBoard();

        expect(view.$el.find("tr").length).toBe(0);
    });

    it("updates the board", function () {
        view.setBoard([
            ['x', '', ''],
            ['', 'y', ''],
            ['', '', 'y'],
        ]);
        view.setBoard([
            ['x', '', ''],
            ['', 'y', ''],
            ['x', '', 'y'],
        ]);

        expect(view.$el.find("tr").length).toBe(3);
    });

    it("announces when cell is clicked", function () {
        view.setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ]);

        // Cell 4 is second row first column
        view.$el.find("td").eq(3).click();

        expect(listener.cellClicked).toHaveBeenCalledWith({ row: 1, col: 0 });
    });

});
