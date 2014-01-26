var GameRepository = function() {
  var self = this;
  self.games = [];

  self.findById = function(gid) {
    for (var i = games.length - 1; i >= 0; i--) {
      if (games[i] && games[i].getId() == gid)
        return games[i];
    };
    return null;
  }

  self.addGame = function(game) {
    games.push(game);
  }

  return self;
}

module.exports = GameRepository;
