var TileMap = function(tileset, w, h) {
	var tileset = tileset;
	var w = w;
	var h = h;
	var tileSize = 24;

	var buffer;
	var bufferCtx;

	var tiles = []; tiles.length = w;
	for (var i = 0; i < w; i ++)
		tiles[i] = []; tiles[i].length = h;

	var createBuffer = function() {
		buffer = document.createElement('canvas');
		buffer.width = w * tileSize;
		buffer.height = h * tileSize;
		bufferCtx = buffer.getContext('2d');
		for (var x = 0; x < w; x++) {
			for (var y = 0; y < h; y++) {
				bufferCtx.drawImage(
					tileset,
					0,
					tiles[x][y] * tileSize,
					tileSize,
					tileSize,
					x * tileSize,
					y * tileSize,
					tileSize,
					tileSize
				);
			}
		}
	}

	return {
		render: function(ctx) {
			ctx.drawImage(buffer, 0, 0);
		},
	}
}