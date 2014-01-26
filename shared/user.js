var UUID = require('./uuid');

var User = function() {
  var id, name, x, y, socket;

  var id = UUID();

  function doStuff() {

  }

  return {
    getSocket: function () {
      return socket;
    },
    setSocket: function (newSocket) {
      socket = newSocket;
    },
    getID: function() {
      return id;
    },
    setID: function(newID) {
      id = newID;
    },
    getName: function() {
      return name;
    },
    setName: function(newName) {
      name = newName;
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

// Obscure node stuff goes here
if (module) {
  module.exports = User;
}
