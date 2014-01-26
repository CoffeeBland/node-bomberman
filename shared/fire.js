var fireTextureSheetFrames;

var loadFireSpriteSheets = function() {
	var fw = 24, fh = 24, fcw = 3, fch = 3;
	fireTextureSheetFrames = new Array(fcw);
	for (var nx = 0; nx < fcw; nx++) {
		fireTextureSheetFrames[nx] = new Array(fch);
		for (var ny = 0; ny < fch; ny++) {
			var frame = new PIXI.Rectangle(nx * fw, ny * fh, fw, fh);
			fireTextureSheetFrames[nx][ny] = new PIXI.Texture(fireTexture, frame);
		}
	}
};

var Fire = function(x, y, angle) {
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

		update: function(d) {
			fuse -= d;
			if (fuse < 0) {
				this.explode();
			}
		}
	};
};
