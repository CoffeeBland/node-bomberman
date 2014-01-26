var Game = function() {
	var interval;
	var update = function() {

	};

	var renderer = new Renderer(420, 340, 0xff8800);
	var engine = new Engine();


	var keys = {};
	var keyDown = function(k) {
		keys[k.keyCode] = true;
	};
	var keyUp = function(k) {
		keys[k.keyCode] = false;
	}

	return {
		start: function(d){
			interval = window.setInterval(update, d);
			window.onkeydown = keyDown;
			window.onkeyup = keyUp;
			renderer.beginRender();
			engine.start(d);
		},
		stop: function() {
			if (interval)
				window.stopInterval(interval);
			window.onkeydown = null;
			window.onkeyup = null;
			renderer.stopRender();
			engine.stop();
		}
	};
};