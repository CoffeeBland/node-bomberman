var express = require('express')
  , app = express()
  , io = require('socket.io').listen(8081)
  , fs = require('fs');

app.configure(function(){
  app.engine('html', require('ejs').renderFile);

  app.use(express.static(__dirname + '/../client'));
  app.use(express.static(__dirname + '/../shared'));

  app.set("views", __dirname + "/../client/")
});

app.listen(8080);

// Routes
app.get('/', function(req, res){
  res.render("index.html");
});

// Sockets (todo: move it somewhere else)
io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  socket.on('I love pancakes', function (data) {
    console.log(data);
  });
});