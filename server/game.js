var Game = function(gameUsers) {
  var id = UUID();
  var users = gameUsers || [];

  function getUsersJsonArray() {
    var usersData = [];
    for (var i = users.length - 1; i >= 0; i--) {
      var uData = users[i].toJson();
      if (uData.id == ownerId)
        uData.owner = true;
      else
        uData.owner = false;
      usersData.push(uData);
    };
    return usersData;
  }

  function startGame() {
    for (var i = users.length - 1; i >= 0; i--) {
      if (users[i]) {
        users[i].getSocket().emit('startingGame', {id: id, users: getUsersJsonArray()});
      }
    };
  }

  return {
    startGame: startGame,
    toJson: function() {
      return {
        id: id,
        users: getUsersJsonArray()
      };
    }
  };
}

module.exports = Game;
