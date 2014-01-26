// DOCS
// 0 : hard block
// 1 : block
// 2 : floor

var Tilemap = function(w, h) {
	var tiles =  new Array(w);
	for (var i = 0; i < h; i++) {
		tiles[i] = new Array(h);
	}

	return {
		tiles: tiles
	};
};