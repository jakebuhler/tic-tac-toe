/* LoginView
 *
 * View for the user login form shown when the app is first launched.
 */

var LoginView = Backbone.View.extend({

    tagName: "div",

    className: "login",

    events: {
        "keydown input": "submit"
    },

    render: function () {
        this.$el.html(
            '<p>What is your name?</p>' +
            '<p><input type="text" autofocus /></p>'
        );
        return this;
    },

    submit: function (e) {
        var name = this.$("input").val();
        // The ENTER key
        if (e.keyCode === 13 && name) {
            this.trigger("loginSubmitted", name);
        }
    }

});


module.exports = LoginView;
