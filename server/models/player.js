var UUID = require('../utilities/uuid');

var Player = function(newName, newSocket) {
  var id = UUID();
  var name = newName;
  var socket = newSocket;
  var x, y;

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
    getSocket: function () {
      return socket;
    },
    setSocket: function (newSocket) {
      socket = newSocket;
    },
    toJson: function() {
      return {
        id: id,
        name: name,
        x: x,
        y: y
      };
    }
  };
};

module.exports = Player;
