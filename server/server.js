CLIENT_SERVER_PORT = process.argv[2] || 8080;
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
  res.render("index.html", {host: 'http://' + req.headers.host.replace(CLIENT_SERVER_PORT, SOCKET_SERVER_PORT)});
});

app.listen(CLIENT_SERVER_PORT);

// Sockets.io part
var gameController = require('./gameController');
gameController.boot();

//var GIMME_SOCKETS = gameController.getSockets;


