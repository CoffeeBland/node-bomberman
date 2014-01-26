var Server = function(serverName){
  var currentUserID;
  var currentUsername;
  var currentUsers;

  var joinRoomCallback = null;
  var disconnectCallback = null;

  if (serverName.indexOf("http") == -1)
    serverName = 'http://' + serverName;
  var socket = io.connect(serverName);

  socket.removeAllListeners('setUserId');
  socket.on('setUserId', function(data){
    currentUserID = data.id;
  });

  STATUS.set('Connecting...', 3000);
  socket.on('connect', function(){
    STATUS.set('Connected!', 3000);
    STEPS.goTo(2);

    // Room json
    socket.removeAllListeners('joinedRoom');
    socket.on('joinedRoom', function(data){
      if (joinRoomCallback)
        joinRoomCallback(data);
    });
    // New chat message { from: '', text: '' }
    socket.removeAllListeners('getChat');
    socket.on('getChat', function(data){
      if (CHAT)
        CHAT.append(data);
    });
    // Room new user set
    socket.removeAllListeners('updatedUsersInRoom');
    socket.on('updatedUsersInRoom', function(data){
      currentUsers = data;
      if (CHAT)
        CHAT.updateUsersInRoom(data);
    });
    // Start game rendering
    socket.removeAllListeners('startingGame');
    socket.on('startingGame', function(data){
      STEPS.goTo(5);
      var game = new Game();
      game.start(
        1000 / 60,
        data
      );
    });

    socket.removeAllListeners('disconnect');
    socket.on('disconnect', function(){
      if (disconnectCallback)
        disconnectCallback();
      STATUS.set('Disconnect :(', 3000);
    });
    socket.on('connect_error', function(){
      STATUS.set('Disconnect (connect error):(', 3000);
    });
    socket.on('connect_timeout', function(){
      STATUS.set('Disconnect (timeout):(', 3000);
    });
    socket.on('reconnect_error', function(){
      STATUS.set('Disconnect (reconnect error):(', 3000);
    });
    socket.on('reconnect_error', function(){
      STATUS.set('Disconnect (reconnect_failed):(', 3000);
    });
  });

  function setUsername(name) {
    currentUsername = name;
    socket.emit('setUsername', {name: name});
  }

  function getRooms(callback) {
    socket.removeAllListeners('roomData');
    socket.on('roomData', function(data) {
      STATUS.set('Retrived rooms!', 3000);
      callback(data);
    });
    STATUS.set('Fetching rooms...', 3000);
    socket.emit('getRooms', {});
  }

  function addNewRoom(name, callback) {
    joinRoomCallback = callback;
    socket.emit('createRoom', {
      name: name,
      uid: currentUserID
    });
  }

  function joinRoom(rid, callback) {
    joinRoomCallback = callback;
    socket.emit('joinRoom', {
      rid: rid,
      uid: currentUserID
    });
  }

  function sendChat(data) {
    socket.emit('sendChat', data);
  }

  function quitRoom() {
    socket.emit('quitRoom', {});
  }

  function startGame(rid) {
    socket.emit('startGame', {
      rid: rid
    });
  }

  return {
    getUserID: function() {
      return currentUserID;
    },
    getUsername: function() {
      return currentUsername;
    },
    setDisconnectCallback: function(callback) {
      disconnectCallback = callback;
    },
    getCurrentUsers: function() {
      return currentUsers || {};
    },
    getRooms: getRooms,
    addNewRoom: addNewRoom,
    joinRoom: joinRoom,
    setUsername: setUsername,
    sendChat: sendChat,
    quitRoom: quitRoom,
    startGame: startGame,
    serverName: serverName
  };
}

var SERVER = null;
