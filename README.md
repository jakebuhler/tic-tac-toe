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

The app will then be accessible at `*:3000`.

Backend
-------

I chose Node for the app's backend. Node provided a couple of advantages over
a Python/gevent backend which would have been my second choice. First, Node
provided more natural support for Socket.IO. Second, using Node simplified
the application setup, preventing the need for separate sets of dependencies
for the frontend and backend. This enables you to get the app up and running
with a simple `npm install`, `grunt run` combo.

All of the business logic executes on the backend. When the user interacts
with the app, the backend receives messages and processes them to update the
game state. Any modified game elements are then sent back to the frontend for
rendering.

Everything in the app lives in memory, there is no database. This choice was
made mostly for simplicty of setup and implementation.

Frontend
--------

The frontend utilizes Backbone views and events to provide some basic
structure. The frontend is pretty simple, having only two basic
responsibilities: handling user interaction and rendering the game's state.
All of the tic-tac-toe business logic happens on the backend. On user action,
the frontend sends a message to the backend. On receiving a message from the
backend, the frontend renders the updated component of the game.

I used Bootstrap to get some basic UI such as decent typography and the column
layout. I also wrote a small amount of custom CSS to get the look that I
wanted.

Communication Protocol
----------------------

The backend and frontend communicate over Socket.IO. The backend keeps track
of most of the game state, and updates the frontend when necessary so that
things can be rendered. The frontend handles user interactions and notifies
the backend regarding actions that the user has taken. The frontend sends
these messages to the backend:

* *login* - sent when the user submits the login form
* *take cell* - sent when the user clicks on a cell
* *chat* - sent when the user submits a chat

The backend processes these messages, modifies the game state as appropriate,
and then updates the frontend with whatever state has changed. Every entity
in the game's UI has a corresponding message used to update that entity. Here
are the messages the backend sends to the frontend.

* *login successful* - sent when the user successfully logs in
* *update player* - update the player's information
* *update opponent* - update the opponent's information
* *show message* - set the message displayed below the board
* *add chat* - append a chat message to the chat window
* *update board* - update the board

Testing
-------

TicTacToe is testing using a Jasmine/PhantomJS/Grunt setup. To run the test,
simply run:

```bash
grunt test
```

Normally for a project like this I would want some end-to-end tests. However,
for the sake of time and simplicity of setup I omitted them. For a real
project I would create a slightly more comprehensive test suite.

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

Known Issues
------------

* Nothing about the user is saved after disconnecting. If a user
  disconnects and reconnects, their win-loss record is gone.
* No more than two players can connect at once. I would like to
  implement some sort of matchmaking system so that multiple
  games could be going simultaneously.
