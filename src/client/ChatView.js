/* ChatView
 *
 * Render a box showing all of the chats and a text input
 * for submitting chats.
 */

var ChatView = Backbone.View.extend({

    tagName: "div",

    className: "chat",

    events: {
        "keydown input": "submit"
    },

    render: function () {
        this.$el.html(
            '<dl></dl>' +
            '<input type="text" placeholder="Say something..." />'
        );
        this.$el.hide();
        return this;
    },

    submit: function (e) {
        var $input = this.$("input");
        var message = $input.val();
        // The ENTER key
        if (e.keyCode === 13 && message) {
            this.trigger("chatSubmitted", message);
            $input.val("");
        }
    },

    show: function () {
        this.$el.show();
    },

    addChat: function (chat) {
        var $dl = this.$("dl");
        $("<dt></dt>").text(chat.name).appendTo($dl);
        $("<dd></dd>").text(chat.text).appendTo($dl);
        $dl.scrollTop($dl[0].scrollHeight);
    }

});

module.exports = ChatView;
