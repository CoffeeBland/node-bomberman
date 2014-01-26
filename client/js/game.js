var Game = function() {
	var interval;
	var update = function() {
		for(var key in keys) {
			if (keyMappings[key])
				keyMappings[key]();
		}
	};

	var renderer = new Renderer(420, 340, 0xff8800);

	var keyMappings = {
		38: function() { // Up

		},
		37: function() { // Left

		},
		39 : function() { // Right

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
		start: function(d){
			interval = window.setInterval(update, d);
			window.onkeydown = keyDown;
			window.onkeyup = keyUp;
			renderer.beginRender();
			currentEngine.start(d);
		},
		stop: function() {
			if (interval)
				window.stopInterval(interval);
			window.onkeydown = null;
			window.onkeyup = null;
			renderer.stopRender();
			currentEngine.stop();
		}
	};
};