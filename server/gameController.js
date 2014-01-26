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

      socket.emit('setUserId', { id: user.getID() });
    });
  }

  function findById(items, id) {
    for (var i = items.length - 1; i >= 0; i--) {
      if (items[i].getID() == id) {
        return items[i];
      }
    };
    return null;
  }

  function getAbbreviatedRoomData() {
    var roomData = [];
    for (var i = rooms.length - 1; i >= 0; i--) {
      roomData.push(rooms[i].toJson());
    };
    return roomData;
  }

  function setUpListeners(user, socket) {

    //  Needs
    //    data.name - New room name
    //    data.uid - User id creating room
    socket.on('createRoom', function (data) {
      var room = new Room(data.name);
      room.addUser(findById(users, data.uid));
      room.setOwner(data.uid);
      rooms.push(room);
      socket.emit('joinedRoom', room.toJson());
      console.log('Created room: ' + room.getName() + ' (' + room.getID() + ')');
    });

    //  Needs
    //    data.uid - User joining room
    //    data.rid - Room being joined
    socket.on('joinRoom', function (data) {
      var user = findById(users, data.uid);
      var room = findById(rooms, data.rid);
      room.addUser(user);
      socket.emit('joinedRoom', room.toJson());
      console.log('User "' + user.getName() + '" joined room: ' + room.getName() + ' (' + room.getID() + ')');
    });

    //  Needs nothing
    //    Emits 'roomData'
    socket.on('getRooms', function (data) {
      var roomData = getAbbreviatedRoomData();
      socket.emit('roomData', roomData);
    });

    //  Needs
    //    data.name - New name for user
    socket.on('setUsername', function (data) {
      user.setName(data.name);
      console.log('User "' + user.getID() + '" is now known as: "' + user.getName() + '"');
    });

    socket.on('sendChat', function(data){
      console.log(data);
      var room = findById(rooms, data.rid);
      if (room)
        room.sendChat(data);
      else
        console.log('WARN: Could not find room ' + data.rid);
    });

    // Disconnect
    socket.on('disconnect', function () {
      for (var i = users.length - 1; i >= 0; i--) {
        if (users[i].getID() == user.getID())
          users.splice(i, 1);
      };
      for (var i = rooms.length - 1; i >= 0; i--) {
        if (rooms[i]) {
          if (rooms[i].getOwnerID() == user.getID()) {
            if (rooms[i].getUserCount() > 0) {
              rooms[i].removePlayer(user.getID());
              rooms[i].selectNewOwner();
            } else {
              rooms[i].removePlayers(user.getID());
              rooms.splice(i, 1);
            }
          } else {
            for (var i = rooms[i].getUsers().length - 1; i >= 0; i--) {
              var uid = rooms[i].getUsers()[i].getID();
              if (uid == user.getID())
                rooms[i].removePlayer(uid);
            }
          }
        } // non null check
      }
    });
  }


  return {
    boot: boot,
    getSockets: function() {
      return io.sockets;
    }
  };
})();
