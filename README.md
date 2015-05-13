Tic-Tac-Toe
===========

A simple Socket.IO-based tic-tac-toe game.

Getting Started
---------------

First off, install the dependencies using npm.

```shell
npm install
```

In order to run Grunt tasks, the Grunt command-line interface also
needs to be installed if you don't have it already.

```bash
npm install -g grunt-cli
```

Start the app:

```bash
grunt run
```

The app will then be accessible at \*:3000

Backend
-------

I chose Node for the app's backend.

Frontend
--------

Bootstrap provides some basic structure to the UI.

jQuery is used because since it's required by jQuery, Underscore, and Backbone.

Backbone is used for the front-end.

Testing
-------

TicTacToe is testing using a Jasmine/PhantomJS/Grunt setup. To run the test,
simply run:

```bash
grunt test
```

Dependencies
------------

* *backbone* - provides basic structure and eventing for the frontend
* *underscore* - required for Backbone, simple JavaScript utilities
* *jquery* - required for Underscore, provides basic DOM manipulation
* *express* - a simple web server used to serve static files and route
  requests
* *socket.io* - real time communication between the frontend and backend
* *grunt* - task runner
* *grunt-browserify* - compile CommonJS modules for the browser
* *grunt-contnrib-jasmine* - Grunt task for PhantomJS/Jasmine testing
* *grunt-contrib-watch* - auto-reload server when files change
* *grunt-express-server* - Grunt task for running the Express server
