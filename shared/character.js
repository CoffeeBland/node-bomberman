var Character = function(x, y) {
	var x, y, speed = 0.5;
	var sx, sy, sw, sh;
	var spriteSheet, colorSpriteSheet, a, tmpA;

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
			while (sx > sw)
				sx -= sw;
		  spriteSheet.anchor.x = (sx * sw) / spriteSheet.width;
		  colorSpriteSheet.anchor.x = (sx * sw) / spriteSheet.width;
		},
		getSourceX: function(sourceX) {
			return sx;
		},
		setSourceY: function(sourceY) {
			sy = sourceY;
			while (sy > sh)
				sy -= sh;
			spriteSheet.anchor.y = (sy * sh) / spriteSheet.height;
			colorSpriteSheet.anchor.y = (sy * sh) / spriteSheet.height;
		},

		setSpriteSheet: function(texture, colorTexture, w, h, anim) {
		  frame = new PIXI.Rectangle(0, 0, texture.width / w, texture.height / h);
			spriteSheet = new PIXI.Sprite(new PIXI.Texture(texture, frame));
			colorSpriteSheet = new PIXI.Sprite(new PIXI.Texture(colorTexture, frame));
			sx = 0;
			sy = 0;
			sw = w;
			sh = h;
			a = anim;
			tmpA = anim;
			currentRenderer.addSprite(spriteSheet);
			currentRenderer.addSprite(colorSpriteSheet);
		},
		die: function() {
				if (!spriteSheet)
					return;

				currentRenderer.removeSprite(spriteSheet);
				currentRenderer.removeSprite(colorSpriteSheet);
		},
		update: function(d) {
			if (!spriteSheet)
				return;

			tmpA -= d;
			while (tmpA < 0) {
				tmpA += a;
				this.setSourceX(this.getSourceX() + 1);
			}
			spriteSheet.position.x = x;
			spriteSheet.position.y = y;
		}
	};
};
