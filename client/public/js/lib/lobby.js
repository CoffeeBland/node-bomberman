var Lobby = function() {
	games = [];

	return {
		listGames: function(list) {
			games = list;
			for (var i = 0; i < list.length; i++) {
				$('#room-select').append(
					'<div class="pull-left room-select">' +
	          games[i].name + ' - ' + games[i].players.length + ' players' +
	          '<a class="pull-right join-room" data-id="' + games[i].id + '">Join</a>' +
          '</div>'
        );
			}
		}
	};
};

var LOBBY = new Lobby();