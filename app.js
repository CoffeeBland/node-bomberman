var SERVER_PORT = process.env.PORT || 1337;

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app);

// Boot client app
require('./client/client')(app, SERVER_PORT);

// Boot server app
require('./server/server')(server, SERVER_PORT);

// Now we are configured let's start listening
server.listen(CLIENT_SERVER_PORT);
