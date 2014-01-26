var UUID = require('../shared/uuid');

var USER_POSSIBLE_PLACES = [
    [1, 1], [10, 1], [19, 1],
    [1, 10], [10, 10], [19, 10],
    [1, 19], [10, 19], [19, 19]
  ];

var Game = function(gameUsers, ownerId) {
  var id = UUID();
  var ownerId = ownerId;
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
    var usersNeeded = 0;
    var usersReady = 0;
    console.log(users);
    for (var i = users.length - 1; i >= 0; i--) {
      if (users[i]) {
        usersNeeded++;
        // Make him start rendering
        users[i].getSocket().emit('startingGame', {id: id, users: getUsersJsonArray()});
        // W8 for every body to login
        var me = users[i];
        me.getSocket().on('joinedGame', function(){
          if (usersReady == usersNeeded) {
            nextPlace = 0;
            for (var j = users.length - 1; j >= 0; j--) {
              if (users[j]) {
                users[j].getSocket().emit('playerEvent', {
                  uid: users[j].getID(),
                  func: 'teleport',
                  args: USER_POSSIBLE_PLACES[nextPlace]
                });
                nextPlace++;
              }
            };
          }
          me.getSocket().removeAllListeners('joinedGame');
        });
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
