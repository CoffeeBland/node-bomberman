var UUID = require('../utilities/uuid');

var USER_POSSIBLE_PLACES = [
    [1, 1], [10, 1], [19, 1],
    [1, 10], [10, 10], [19, 10],
    [1, 19], [10, 19], [19, 19]
  ];

var Game = function(newName, newOwnerId) {
  var id = UUID();
  var ownerId = newOwnerId;
  var name = newName;
  var players = [];

  return {
    getId: function() {
      return id;
    },
    setId: function(newId) {
      id = newId;
    },
    getName: function() {
      return name;
    },
    setName: function(newName) {
      name = newName;
    },
    getPlayers: function() {
      return players;
    },
    addPlayer: function(player) {
      players.push(player);
    },
    count: function() {
      var i = 0;
      for (var i = players.length - 1; i >= 0; i--) {
        if (players[i])
          i++;
      };
      return i;
    },
    toJson: function() {
      return {
        id: id,
        name: name,
        players: getPlayersJson()
      };
    }
  };
};

module.exports = Game;
