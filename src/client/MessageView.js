var MessageView = Backbone.View.extend({

    tagName: "p",

    className: "message",

    render: function () {
        this.$el.text(this.message || "");
        return this;
    },

    setMessage: function (message) {
        this.message = message;
        this.render();
    }

});

module.exports = MessageView;
