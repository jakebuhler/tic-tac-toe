var BoardView = Backbone.View.extend({

    tagName: "table",

    className: "board",

    events: {
        "click td": "onClick"
    },

    render: function () {
        this.$el.empty();
        if (this.board) {
            this._renderBoard();
        }

        return this;
    },

    setBoard: function (board) {
        this.board = board;
        this.render();
    },

    onClick: function (e) {
        var $cell = $(e.target);
        this.trigger("cellClicked", {
            row: $cell.data("row"),
            col: $cell.data("col")
        });
    },

    _renderBoard: function () {
        var tr;

        _.each(this.board, function (row, i) {
            tr = $("<tr></tr>").appendTo(this.$el);
            _.each(row, function (cell, j) {
                $("<td></td>")
                    .data("row", i)
                    .data("col", j)
                    .addClass(cell)
                    .appendTo(tr);
            });
        }, this);
    }

});

module.exports = BoardView;
