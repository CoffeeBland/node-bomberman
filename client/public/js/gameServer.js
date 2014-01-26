var GameServer = function(gameId, currentUserId, thaSocket, gameObject) {
  var userId = currentUserId;
  var gameId = gameId;
  var socket = thaSocket;
  var game = gameObject;

  socket.on('playerEvent', function(data){
    console.log(data);
    var char = game.getCharacter(data.uid);
    char[data.func].apply(char, data.args);
  });

  return {

  };
}

var GAME_SERVER = null;
