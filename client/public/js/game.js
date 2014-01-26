var Game = function() {
	// Input handling
  var keys = {};
	var keyDownMappings = {
		38: function() { // Up

		},
		37: function() { // Left

		},
		39: function() { // Right

		},
		40: function() { // Down

		}
	};
	var keyPressMappings = {
		32: function() { // Spacebar

		}
	};
	var keyReleaseMappings = {
	};

	var keyDown = function(e) {
		keys[e.keyCode] = true;
		if (keyPressMappings[e.keyCode])
			keyPressMappings[e.keyCode]();
	};
	var keyUp = function(e) {
		keys[e.keyCode] = false;
		if (keyReleaseMappings[e.keyCode])
			keyReleaseMappings[e.keyCode]();
	};

	// Canvas
	var canvas = document.getElementById('game-canvas');
	var ctx = canvas.getContext("2d");

	// Game objects
	var tilemap = new TileMap(getOrLoadFile("/res/sprites/tilemap.png"), 20, 20);
	var objs = [];

	// Loops
	var previousTime = Date.now();
	var update = function() {
		var newTime = Date.now();
		var d = newTime - previousTime;
		previousTime = newTime;

		for (var key in keys) {
			if (keys[key] && keyDownMappings[key])
				keyDownMappings[key]();
		}

		for (var i = 0; i < objs.length; i++){
			objs[i].update(d);
		}
	};
	var render = function() {
		tilemap.render(ctx);
	};

	return {

	};
};