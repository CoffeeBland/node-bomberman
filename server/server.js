CLIENT_SERVER_PORT = process.env.PORT || 8080;
SOCKET_SERVER_PORT = 1337;
var express = require('express')
  , app = express()
  , fs = require('fs')
  , engines = require('consolidate');

// Web server part
app.configure(function(){
  app.engine('html', engines.hogan);

  app.use(express.static(__dirname + '/../client/public'));
  app.use(express.static(__dirname + '/../shared'));

  app.set("views", __dirname + "/../client/views")
});

// Routes
app.get('/', function(req, res){
  var host = req.headers.host.replace(CLIENT_SERVER_PORT, SOCKET_SERVER_PORT);
  if (host.indexOf(':') == -1)
    host += ':' + SOCKET_SERVER_PORT;
  res.render("index.html", {host: 'http://' + host});
});

app.listen(CLIENT_SERVER_PORT);

// Sockets.io part
var gameController = require('./gameController');
gameController.boot();

//var GIMME_SOCKETS = gameController.getSockets;


