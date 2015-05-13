module.exports = {

    pressEnter: function ($el) {
        var e = $.Event( "keydown", { keyCode: 13 } );
        $el.trigger(e);
    }

};
