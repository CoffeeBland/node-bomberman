CLIENT_SERVER_PORT = process.env.PORT || 1337;
var express = require('express')
  , fs = require('fs')
  , engines = require('consolidate');

var app = express()
  , http = require('http');

server = http.createServer(app);

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
  res.render("index.html", {host: 'http://' + host, port: CLIENT_SERVER_PORT});
});

server.listen(CLIENT_SERVER_PORT);

// Sockets.io part
var gameController = require('./gameController');
gameController.boot();


