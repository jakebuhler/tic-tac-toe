var LoginView = require("../../src/client/LoginView");
var utils = require("./utils");


describe("LoginView", function () {

    var view, listener;

    beforeEach(function () {
        view = new LoginView();
        listener = jasmine.createSpyObj("listener", ["loginSubmitted"]);

        view.on("loginSubmitted", listener.loginSubmitted, listener);
        // Render the view and insert it into the DOM
        view.render().$el.appendTo(document.body);
    });

    it("prompts the user for their name", function () {
        var pTags = view.$el.find("p");
        expect(pTags.eq(0).text()).toBe("What is your name?");
        expect(pTags.eq(1).find("input").length).toBe(1);
    });

    it("triggers loginSubmitted on ENTER", function () {
        var $input = view.$el.find("input");

        $input.val("jake");
        utils.pressEnter($input);

        expect(listener.loginSubmitted).toHaveBeenCalledWith("jake");
    });

    it("doesn't trigger loginSubmitted with no name", function () {
        var $input = view.$el.find("input");
        utils.pressEnter($input);
        expect(listener.loginSubmitted).not.toHaveBeenCalled();
    });

});
