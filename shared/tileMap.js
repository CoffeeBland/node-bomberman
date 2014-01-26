// DOCS
// 0 : hard block
// 1 : block
// 2 : floor

var TileMap = function(w, h) {
	var tiles =  new Array(w);
	for (var i = 0; i < h; i++) {
		tiles[i] = new Array(h);
	}
	
	var tileSize = 24;

	return {
		getTiles: function() {
			return tiles;
		},

		longestDistanceForX: function(x, y, distance) {
			var min = Math.min(0, distance);
			var max = Math.max(distance, 0);
			var dist = 0;
			for (var ix = Math.floor(x + min / tileSize); ix < Math.ceil(x+ max / tileSize); ix++) {
				var isClear = true;
				for (var iy = Math.floor(y / tileSize); iy < Math.ceil(y / tileSize); iy++)
					isClear = getTiles()[ix][iy] == 2 && isClear;
				if (isClear)
					dist = ix;
				else
					return dist;
			}
			return dist;
		},
		longestDistanceForY: function(x, y, distance) {
			var min = Math.min(0, distance);
			var max = Math.max(distance, 0);
			var dist = 0;
			for (var iy = Math.floor(y + min / tileSize); iy < Math.ceil(y + max / tileSize); ix++) {
				var isClear = true;
				for (var ix = Math.floor(x / tileSize); ix < Math.ceil(x / tileSize); iy++)
					isClear = getTiles()[ix][iy] == 2 && isClear;
				if (isClear)
					dist = iy;
				else
					return dist;
			}
			return dist;
		}
	};
};