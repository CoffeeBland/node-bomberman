var Engine = function() {
	var interval, time = window.performance.now();
	var update = function() {
		var t = window.performance.now();
		var d = t - time;
		time = t;

		for(var i = 0; i < actors.length; i++) {
			actors[i].update(d);
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
		getPlayerCharacters: function() {
			return playerCharacters;
		},
		addPlayer: function(name, uid) {
			var c = new Character(0, 0);
			if (currentRenderer != "undefined") {
				c.setSpriteSheet(100);
			}
			this.getActors().push(c);
			playerCharacters[uid] = c;
			return c;
		},

		start: function(d, p) {
			interval = window.setInterval(update, d);
			for (var i = 0; i < p.length; i++) {
				this.addPlayer(p[i].name, p[i].id);
			}
		},
		stop: function() {
			if (interval) {
				window.clearInterval(interval);
				if (getTileMap().isRendering())
					getTileMap().disposeRender();
			}
		},

		playerCharacter: function(uid) {
			return playerCharacters[uid];
		}
	};
};

var currentEngine;