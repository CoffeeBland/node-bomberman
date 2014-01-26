var GameRepository = require('./repositories/gameRepository')
  , PlayerRepository = require('./repositories/playerRepository')
  , Game = require('./models/game')
  , Player = require('./models/player');

module.exports = function(server, port) {
  var io = require('socket.io').listen(server);

  var games = new GameRepository();
  var playersSearchingGame = new PlayerRepository();

  io.sockets.on('connection', function (socket) {

    socket.on('gamesGet', function(data){
      var player = new Player(data.name, socket);
      playersSearchingGame.addPlayer(player);
      socket.emit('playerConnection', {
        playerInfo: player.toJson(),
        games: []
      });
    });

    socket.on('gamesChoose', function(data){
      var player = playersSearchingGame.findById(data.pid);
      var game = null;
      if (data.rid) {
        game = games.findById(data.rid);
      } else if (data.gameName) {
        game = new Game(data.gameName, player.getId());
        games.addGame(game);
      }
      playersSearchingGame.removePlayer(player);
      game.addPlayer(player);
      socket.emit('gameJoin', game.toJson());
    });

  });

}


