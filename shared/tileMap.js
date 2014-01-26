// DOCS
// 0 : hard block
// 1 : block
// 2 : floor

var TileMap = function(w, h) {
	var w = w, h = h;
	var tiles =  new Array(w);
	for (var i = 0; i < w; i++) {
		tiles[i] = new Array(h);
		for (var n = 0; n < h; n++) {
			tiles[i][n] = 0;
		}
	}

	var tileSize = 24;
	var backsprite, backtexture, backContainer;
	var spritesheet = loadFramedSpriteSheet(
		'/res/sprites/tilemap.png', 
		'tileMap', 
		tileSize, 
		tileSize
	);

	this.generateMap = function() {
		return new TileMap(24, 24);
	}

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
		},

		prepareTexture: function() {
			backContainer = new PIXI.DisplayObjectContainer();

			// Construct tilemap
			for (var x = 0; x < w; x++) {
				for (var y = 0; y < h; y++) {
					var tile = new PIXI.Sprite(this.getSpritesheet()[this.getTiles()[x][y]]);
					tile.position.x = x * tileSize;
					tile.position.y = y * tileSize;
					backContainer.addChild(tile);
				}
			}

			// render the tilemap to a render texture
			backTexture = new PIXI.RenderTexture(w * tileSize, h * tileSize);
			backTexture.render(backContainer);

			// create a single background sprite with the texture
			backsprite = new PIXI.Sprite(backTexture);

			currentRenderer.addSprite(this.getBacksprite());
		},
		disposeRender: function() {

		},
		changeTile: function(x, y, id) {
			var os = this.getBackContainer().getChildAt(y + x * h);
			var ns = new PIXI.Sprite(this.getSpritesheet()[id]);
			ns.position.x = x * tileSize;
			ns.position.y = y * tileSize;
			this.getBackContainer().addChildAt(ns, y + x * h);
			this.getBackContainer().removeChild(os);

			this.getBackTexture().render(this.getBackContainer());

			currentRenderer.removeSprite(this.getBacksprite());
			backsprite = new PIXI.Sprite(this.getBackTexture());
			currentRenderer.addSprite(this.getBacksprite());
		},
		getBackContainer: function() {
			return backContainer;
		},
		getBacksprite: function() {
			return backsprite;
		},
		getBackTexture: function() {
			return backTexture;
		},
		getSpritesheet: function() {
			return spritesheet;
		}
	};
};