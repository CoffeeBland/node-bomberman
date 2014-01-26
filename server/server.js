CLIENT_SERVER_PORT = 8080;
SOCKET_SERVER_PORT = 1337;
var express = require('express')
  , app = express()
  , fs = require('fs');

// Web server part
app.configure(function(){
  app.engine('html', require('consolidate').hogan);

  app.use(express.static(__dirname + '/../client'));
  app.use(express.static(__dirname + '/../shared'));

  app.set("views", __dirname + "/../client/")
});

// Routes
app.get('/', function(req, res){
  res.render("index.html", {host: 'http://' + req.headers.host + ':' + SOCKET_SERVER_PORT});
});

app.listen(CLIENT_SERVER_PORT);

// Sockets.io part
var gameController = require('./gameController');
gameController.boot();

//var GIMME_SOCKETS = gameController.getSockets;


