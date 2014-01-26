var io = require('socket.io').listen(8081);
var Room = require('./room');
var User = require('../shared/user');

module.exports = (function() {
  var users = [];
  var rooms = [];

  function boot() {
    // Sockets.io boot
    io.sockets.on('connection', function (socket) {
      var user = new User();
      user.setSocket(socket);
      users.push(user);

      setUpListeners(user, socket);
    });
  }

  function setUpListeners(user, socket) {
    socket.on('createRoom', function (data) {
      rooms.push(new Room(data.name));
      console.log('Created room: ' + data.name);
    });
    socket.on('joinRoom', function (data) {
      console.log(data);
    });
    socket.on('getRooms', function (data) {

      console.log(data);
    });
  }


  return {
    boot: boot
  };
})();
