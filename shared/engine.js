var Engine = function() {
	var interval, time = window.performance.now();
	var update = function() {
		var t = window.performance.now();
		var d = t - time;
		time = t;

		var toRemove = [];
		for(var i = actors.length - 1; i >= 0; i--) {
			actors[i].update(d);
			if (actors[i].shouldBeRemoved)
				actors.splice(i, 1);
		}
	};

	var tileMap;
	var actors = [];
	var playerCharacters = {};
	var playerColors = [
		0xFF2200,
		0x0088FF,
		0x66FF22,
		0xEE00BB,
		0x00CCBB,
		0xFFEE00,
		0xEEEEEE,
		0x333333
	];

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
		addPlayer: function(name, uid, playerNumber) {
			var c = new Character(26, 26);
			if (currentRenderer != "undefined") {
				c.setSpriteSheet(100, playerColors[playerNumber]);
			}
			this.getActors().push(c);
			playerCharacters[uid] = c;
			return c;
		},

		start: function(d, p) {
			interval = window.setInterval(update, d);
			tileMap = new TileMap(20, 20);
			var self = this;
			window.setTimeout(function() {
				if (currentRenderer != "undefined") {
					tileMap.startRender();
				}
				for (var i = 0; i < p.length; i++) {
					self.addPlayer(p[i].name, p[i].id, i);
				}
			}, 0);
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
		},

		placeBombAt: function(x, y, strength) {

		},
		fireUpAt: function(x, y strength) {

		}
	};
};

var currentEngine;