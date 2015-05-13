var MessageView = require("../../src/client/MessageView");


describe("MessageView", function () {

    var view;

    beforeEach(function () {
        view = new MessageView();
        // Render the view and insert it into the DOM
        view.render().$el.appendTo(document.body);
    });

    it("is initially empty", function () {
        expect(view.$el.text()).toBe("");
    });

    it("displays a message", function () {
        view.setMessage("Hello!");
        expect(view.$el.text()).toBe("Hello!");
    });

    it("overrides message with new message", function () {
        view.setMessage("Hello!");
        view.setMessage("Bye");
        expect(view.$el.text()).toBe("Bye");
    });

});
