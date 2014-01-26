var characterTextureSheetFrames;
var characterColorTextureSheetFrames;

var loadCharacterSpriteSheets = function() {
	var fw = 24, fh = 32, fcw = 3, fch = 4;
	characterTextureSheetFrames = new Array(fcw);
	characterColorTextureSheetFrames = new Array(fcw);
	for (var nx = 0; nx < fcw; nx++) {
		characterTextureSheetFrames[nx] = new Array(fch);
		characterColorTextureSheetFrames[nx] = new Array(fch);
		for (var ny = 0; ny < fch; ny++) {
			var frame = new PIXI.Rectangle(nx * fw, ny * fh, fw, fh);
			characterTextureSheetFrames[nx][ny] = new PIXI.Texture(characterTexture, frame);
			characterColorTextureSheetFrames[nx][ny] = new PIXI.Texture(characterColorTexture, frame);
		}
	}
}

var Character = function(x, y) {
	var x, y, speed = 0.5;
	var sx, sy, sw, sh;
	var sprite, colorSprite, a, tmpA;

	return {
		getX: function() {
			return x;
		},
		getY: function() {
			return y;
		},
		getSpeed: function() {
			return speed;
		},
		goUp: function() {
			y += currentEngine.getTileMap().longestDistanceForY(this.getX(), this.getY(), -this.getSpeed());
		},
		goLeft: function() {
			x += currentEngine.getTileMap().longestDistanceForX(this.getX(), this.getY(), -this.getSpeed());
		},
		goRight: function() {
			x += currentEngine.getTileMap().longestDistanceForX(this.getX(), this.getY(), this.getSpeed());
		},
		goDown: function() {
			y += currentEngine.getTileMap().longestDistanceForY(this.getX(), this.getY(), this.getSpeed());
		},
		placeBomb: function() {

		},

		setSourceX: function(sourceX) {
			sx = sourceX;
			while (sx >= sw)
				sx -= sw;
		  sprite.setTexture(characterTextureSheetFrames[sx][sy]);
		  colorSprite.setTexture(characterColorTextureSheetFrames[sx][sy]);
		},
		getSourceX: function(sourceX) {
			return sx;
		},
		setSourceY: function(sourceY) {
			sy = sourceY;
			while (sy >= sh)
				sy -= sh;
		  sprite.setTexture(characterTextureSheetFrames[sx][sy]);
		  colorSprite.setTexture(characterColorTextureSheetFrames[sx][sy]);
		},

		setSpriteSheet: function(anim) {
			if (!characterTextureSheetFrames || !characterColorTextureSheetFrames)
				loadCharacterSpriteSheets();

			sprite = new PIXI.Sprite(characterTextureSheetFrames[0][0]);
			colorSprite = new PIXI.Sprite(characterColorTextureSheetFrames[0][0]);
			sx = 0;
			sy = 0;
			sw = characterTextureSheetFrames.length;
			sh = characterTextureSheetFrames[0].length;
			a = anim;
			tmpA = anim;
			currentRenderer.addSprite(sprite);
			currentRenderer.addSprite(colorSprite);
		},
		die: function() {
				if (!sprite)
					return;

				currentRenderer.removeSprite(sprite);
				currentRenderer.removeSprite(colorSprite);
		},
		update: function(d) {
			if (!sprite)
				return;

			tmpA -= d;
			while (tmpA < 0) {
				tmpA += a;
				this.setSourceX(this.getSourceX() + 1);
			}
			sprite.position.x = x;
			colorSprite.position.y = y;
		}
	};
};
