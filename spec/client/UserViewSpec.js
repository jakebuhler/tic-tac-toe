var UserView = require("../../src/client/UserView");


describe("UserView", function () {

    var view;

    beforeEach(function () {
        view = new UserView();
        // Render the view and insert it into the DOM
        view.render().$el.appendTo(document.body);
    });

    it("is initially empty", function () {
        expect(view.$el.html()).toBe("");
    });

    it("renders the user's info", function () {
        view.setUser({ name: "jake", wins: 1, losses: 2, ties: 3 });

        expect(view.$el.find("h2").text()).toBe("jake");
        // \u2013 is the en dash
        expect(view.$el.find("p").text()).toBe("1\u20132\u20133");
    });

    it("replaces a user's info", function () {
        view.setUser({ name: "jake", wins: 1, losses: 2, ties: 3 });
        view.setUser({ name: "bob", wins: 0, losses: 0, ties: 0 });

        expect(view.$el.find("h2").text()).toBe("bob");
        // \u2013 is the en dash
        expect(view.$el.find("p").text()).toBe("0\u20130\u20130");
    });

    it("clear's a users info", function () {
        view.setUser({ name: "jake", wins: 1, losses: 2, ties: 3 });
        view.setUser();

        expect(view.$el.html()).toBe("");
    });

});
