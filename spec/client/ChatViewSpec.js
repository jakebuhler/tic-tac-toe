var ChatView = require("../../src/client/ChatView");
var utils = require("./utils");


describe("ChatView", function () {

    var view, listener;

    beforeEach(function () {
        view = new ChatView();
        listener = jasmine.createSpyObj("listener", ["chatSubmitted"]);

        view.on("chatSubmitted", listener.chatSubmitted, listener);
        // Render the view and insert it into the DOM
        view.render().$el.appendTo(document.body);
    });

    it("renders a chat box and input", function () {
        expect(view.$el.find("dl").length).toBe(1);
        expect(view.$el.find("input").length).toBe(1);
    });

    it("hides the element initially", function () {
        expect(view.$el.is(":visible")).not.toBeTruthy();
    });

    it("shows the element when requested", function () {
        view.show();
        expect(view.$el.is(":visible")).toBeTruthy();
    });

    it("renders chat messages", function () {
        view.addChat({ name: "jake", text: "howdy" });
        view.addChat({ name: "bob", text: "hi" });

        expect(view.$el.find("dt").length).toBe(2);
        expect(view.$el.find("dd").length).toBe(2);
        expect(view.$el.find("dt").eq(0).text()).toBe("jake");
        expect(view.$el.find("dd").eq(0).text()).toBe("howdy");
        expect(view.$el.find("dt").eq(1).text()).toBe("bob");
        expect(view.$el.find("dd").eq(1).text()).toBe("hi");
    });

    it("scrolls to bottom when chats are added", function () {
        var $dl = view.$el.find("dl");

        // add a bunch of chats to necessitate scroll
        for (var i = 0; i < 10; i++) {
            view.addChat({ name: "jake", text: "howdy" });
        }

        expect($dl.scrollTop()).toBe($dl[0].scrollHeight);
    });

    it("triggers chatSubmitted on ENTER", function () {
        var $input = view.$el.find("input");

        $input.val("hi there");
        utils.pressEnter($input);

        expect(listener.chatSubmitted).toHaveBeenCalledWith("hi there");
    });

    it("doesn't trigger chatSubmitted with no message", function () {
        var $input = view.$el.find("input");
        utils.pressEnter($input);
        expect(listener.chatSubmitted).not.toHaveBeenCalled();
    });

    it("clears the input on ENTER", function () {
        var $input = view.$el.find("input");

        $input.val("hi there");
        utils.pressEnter($input);

        expect($input.val()).toBe("");
    });

});
