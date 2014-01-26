var Bomb = function(x, y, strength, fuse) {
	var x = x, y = y, strength = strength, fuse = fuse;
	var shouldBeRemoved = false;
	var sprite = new PIXI.Sprite(bombTexture);
	sprite.position.x = x;
	sprite.position.y = y;
	return {
		shouldBeRemoved: shouldBeRemoved,
		getX: function() {
			return x;
		}
		getY: function() {
			return y;
		}
		getStrength: function() {
			return strength;
		}
		getFuse: function() {
			return fuse;
		}
		explode: function() {
			currentEngine.fireUpAt(x, y, strength);
			shouldBeRemoved = true;
		},

		update: function(d) {
			fuse -= d;
			if (fuse < 0) {
				this.explode();
			}
		}
	};
};
