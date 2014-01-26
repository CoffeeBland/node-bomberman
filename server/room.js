var UUID = require('../shared/uuid');

var Room = function(initialName){
  var USER_CAP = 16;
  var id, name, ownerId;
  var users = [];

  var id = UUID();
  var name = initialName;

  function say(data) {
    for (var i = users.length - 1; i >= 0; i--) {
      users[i].getSocket().emit('getChat', data);
    };
  }

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

  function addUser(user) {
    users.push(user);
    sendUpdatedUserList();
    say({
      from: '[Server]',
      text: 'New user joined:' + user.getName()
    });
  }

  function sendUpdatedUserList() {
    var dataToSend = getUsersJsonArray();
    for (var i = users.length - 1; i >= 0; i--)
      if (users[i])
        users[i].getSocket().emit('updatedUsersInRoom', dataToSend);
  }

  function removePlayers(exceptThisId) {
    for (var i = users.length - 1; i >= 0; i--) {
      if (users[i] && users[i].getID() != exceptThisId)
        users[i].getSocket().disconnect();
    };
  }

  function removePlayer(uid) {
    for (var i = users.length - 1; i >= 0; i--) {
      if (users[i] && users[i].getID() == uid)
        users.splice(i,1);
    };
    sendUpdatedUserList();
  }

  function selectNewOwner() {
    for (var i = users.length - 1; i >= 0; i--) {
      if (users[i] != null)
        ownerId = users[i].getID();
    }
  }

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
    },
    getUserCount: function() {
      var realCount = 0;
      for (var i = users.length - 1; i >= 0; i--)
        if (users[i] != null)
          realCount++;
      return realCount;
    },
    getUsers: function() {
      return users;
    },
    addUser: addUser,
    setOwner: function(uid) {
      ownerId = uid;
    },
    getOwnerID: function() {
      return ownerId;
    },
    sendChat: say,
    userCap: USER_CAP,
    removePlayer: removePlayer,
    removePlayers: removePlayers,
    selectNewOwner: selectNewOwner,
    users: users,
    toJson: function() {
      return {
        id: id,
        name: name,
        userCount: users.length,
        userCap: USER_CAP,
        ownerId: ownerId,
        users: getUsersJsonArray()
      };
    }
  };
}

module.exports = Room;
