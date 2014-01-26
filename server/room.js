var UUID = require('../shared/uuid');

var Room = function(initialName){
  var id, name;

  var id = UUID();
  var name = initialName;

  return {
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
    }
  };
}

module.exports = Room;
