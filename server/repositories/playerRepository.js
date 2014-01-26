var PlayerRepository = function() {
  var self = this;
  self.players = [];

  self.findById = function(pid) {
    for (var i = players.length - 1; i >= 0; i--) {
      if (players[i] && players[i].getId() == pid)
        return players[i];
    };
    return null;
  }

  self.addPlayer = function(player) {
    players.push(player);
  }

  self.removePlayer = function(player) {
    for (var i = players.length - 1; i >= 0; i--) {
      if (players[i] && players[i].getId() == player.getId()) {
        players.splice(i, 1);
      }
    };
  }

  return self;
}

module.exports = PlayerRepository;
