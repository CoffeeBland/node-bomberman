var Game = function() {
	var interval;
	var uid;
	var update = function() {
		for(var key in keys) {
			if (keys[key] && keyMappings[key])
				keyMappings[key]();
		}
	};

	var keyMappings = {
		38: function() { // Up
			currentEngine.playerCharacter(uid).goUp();
		},
		37: function() { // Left
			currentEngine.playerCharacter(uid).goLeft();
		},
		39 : function() { // Right
			currentEngine.playerCharacter(uid).goRight();
		},
		40: function() { // Down
			currentEngine.playerCharacter(uid).goDown();
		}
	};
	var keyPressMappings = {
		32: function() { // Spacebar
			currentEngine.playerCharacter(uid).placeBomb();
		}
	};
	var keyReleaseMappings = {
	};

	var keys = {};
	var keyDown = function(e) {
		keys[e.keyCode] = true;
		if(keyPressMappings[e.keyCode]) 
			keyPressMappings[e.keyCode]();
	};
	var keyUp = function(e) {
		keys[e.keyCode] = false;
		if(keyReleaseMappings[e.keyCode]) 
			keyReleaseMappings[e.keyCode]();
	}

	return {
		start: function(d, p){
			if (!currentRenderer)
				currentRenderer = new Renderer(640, 480, 0xff8800);
			if (!currentEngine)
				currentEngine = new Engine();

			interval = window.setInterval(update, d);
			window.onkeydown = keyDown;
			window.onkeyup = keyUp;
			uid = SERVER.getUserID();
			currentRenderer.beginRender();
			currentEngine.start(d, p);
		},
		stop: function() {
			if (interval)
				window.clearInterval(interval);
			window.onkeydown = null;
			window.onkeyup = null;
			currentRenderer.stopRender();
			currentEngine.stop();
		}
	};
};