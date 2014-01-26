var Engine = function() {
	var interval;
	var update = function() {

	};

	var tileMap;
	var actors = [];
	var playerCharacters = {};

	return {
		getTileMap: function() {
			return tileMap;
		},
		getActors: function() {
			return actors;
		},

		start: function(d) {
			interval = window.setInterval(update, d);
		},
		stop: function() {
			if (interval)
				window.stopInterval(interval);
		},

		playerCharacter: function(uid) {
			return players[uid];
		}
	};
};

var currentEngine = new Engine();