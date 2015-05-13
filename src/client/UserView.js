/* UserView
 *
 * Render the user's name and win-loss record.
 */

var UserView = Backbone.View.extend({

    tagName: "div",

    className: "user",

    template: _.template(
        // Use %- for name since it a user-supplied field and
        // therefore needs HTML escaping
        '<h2><%- name %></h2>' +
        '<p class="win-loss-record">' +
        '<%= wins %>&ndash;<%= losses %>&ndash;<%= ties %>' +
        '</p>'
    ),

    render: function () {
        if (this.model) {
            this.$el.html(this.template(this.model));
        }
        else {
            this.$el.empty();
        }
        return this;
    },

    setUser: function (user) {
        this.model = user;
        this.render()
    }

});


module.exports = UserView;
