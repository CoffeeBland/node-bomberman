var Engine = function() {
	var interval, time = window.performance.now();
	var update = function() {
		var t = window.performance.now();
		var d = t - time;
		time = t;

		for(var actor in actors) {
			actor.update(d);
		}
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

		start: function(d, p) {
			interval = window.setInterval(update, d);
		},
		stop: function() {
			if (interval)
				window.clearInterval(interval);
		},

		playerCharacter: function(uid) {
			return players[uid];
		}
	};
};

var currentEngine = new Engine(640, 480, 0xff8800);