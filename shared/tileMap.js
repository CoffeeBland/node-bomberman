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
			tiles[i][n] = i != 0 ? Math.floor(Math.random() * 3) : 2;
			if (Math.random() < 0.50)
				tiles[i][n] = 2;
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
	var isRendering = false;

	this.generateMap = function() {
		return new TileMap(24, 24);
	}

	return {
		getTiles: function() {
			return tiles;
		},

		longestDistanceForX: function(x, y, distance) {
			distance = Math.max(Math.min(distance, ((w - characterSize) * tileSize - x)), -x);

			tx = (x + distance) / tileSize;
			ty = y / tileSize;
			for (var ix = Math.floor(tx); ix < Math.ceil(tx + characterSize); ix++)
				for (var iy = Math.floor(ty); iy < Math.ceil(ty + characterSize); iy++)
					if (this.getTiles()[ix][iy] != 2)
						return 0;
			return distance;
		},
		longestDistanceForY: function(x, y, distance) {
			distance = Math.max(Math.min(distance, ((h - characterSize) * tileSize - y)), -y);

			tx = x / tileSize;
			ty = (y + distance) / tileSize;
			for (var ix = Math.floor(tx); ix < Math.ceil(tx + characterSize); ix++)
				for (var iy = Math.floor(ty); iy < Math.ceil(ty + characterSize); iy++)
					if (this.getTiles()[ix][iy] != 2)
						return 0;
			return distance;
		},

		startRender: function() {
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
			isRendering = true;
		},
		disposeRender: function() {
			currentRenderer.removeSprite(this.getBacksprite());
			isRendering = false;
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
		},
		isRendering: function() {
			return isRendering;
		}
	};
};