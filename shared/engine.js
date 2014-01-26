var Engine = function() {
	var interval;
	var update = function() {

	};

	var tilemap;
	var actors = [];

	return {
		tilemap: tilemap,
		actors: actors,

		start: function(d) {
			interval = window.setInterval(update, d);
		},
		stop: function() {
			if (interval)
				window.stopInterval(interval);
		}
	};
};