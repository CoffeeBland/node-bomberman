var GameRepository = require('./repositories/gameRepository')
  , PlayerRepository = require('./repositories/playerRepository')
  , Game = require('./models/game')
  , Player = require('./models/player');

module.exports = function(server, port) {
  var io = require('socket.io').listen(server);

  var games = new GameRepository();

  io.sockets.on('connection', function (socket) {

    socket.on('gamesGet', function(data) {
      // TODO : getting the games list      
      socket.emit('gamesList', {
        games: []
      });
    });

    socket.on('gamesChoose', function(data){
      var player = new Player(data.name, socket);
      var game = null;
      if (data.gid) {
        game = games.findById(data.gid);
      } else if (data.gameName) {
        game = new Game(data.gameName, player.getId());
        games.addGame(game);
      }
      playersSearchingGame.removePlayer(player);
      game.addPlayer(player);
      socket.emit('gameJoin', {
        player: player.toJson(),
        game: game.toJson()
      });
    });

  });

}


