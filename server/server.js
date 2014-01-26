var express = require('express')
  , app = express()
  , fs = require('fs');

// Web server part
app.configure(function(){
  app.engine('html', require('ejs').renderFile);

  app.use(express.static(__dirname + '/../client'));
  app.use(express.static(__dirname + '/../shared'));

  app.set("views", __dirname + "/../client/")
});

// Routes
app.get('/', function(req, res){
  res.render("index.html");
});

app.listen(8080);

// Sockets.io part
var gameController = require('./gameController');
gameController.boot();


