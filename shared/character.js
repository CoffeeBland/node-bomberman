var Character = function(x, y) {
	var x, y, speed = 0.5;
	var sx, sy, sw, sh, spriteSheet, a, tmpA;

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
			tmp = sx * sw
			while (tmp > spriteSheet.width)
				tmp -= spriteSheet.width;
			spriteSheet.anchor.x = tmp / spriteSheet.width
		},
		getSourceX: function(sourceX) {
			return sx;
		},
		setSourceY: function(sourceY) {
			sy = sourceY;
			tmp = sy * sh
			while (tmp > spriteSheet.height)
				tmp -= spriteSheet.height;
			spriteSheet.anchor.y = tmp / spriteSheet.height
		},

		setSpriteSheet: function(texture, w, h, anim) {
			console.log(texture);
			spriteSheet = new PIXI.Sprite(texture);
			console.log(texture);
			sx = 0;
			sy = 0;
			sw = w;
			sh = h;
			a = anim;
			currentRenderer.addSprite(spriteSheet);
		},
		die: function() {
				currentRenderer.removeSprite(spriteSheet);
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
