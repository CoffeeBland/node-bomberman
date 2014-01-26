var io = require('socket.io').listen(8081);

module.exports = (function() {
  var rooms = [];

  function boot() {
    // Sockets.io boot
    io.sockets.on('connection', function (socket) {
      setUpListeners(socket);
    });
  }

  function setUpListeners(socket) {
    socket.on('my other event', function (data) {
      console.log(data);
    });
    socket.on('I love pancakes', function (data) {
      console.log(data);
    });
  }


  return {
    boot: boot
  };
})();
