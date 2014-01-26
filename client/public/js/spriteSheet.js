var SpriteSheet = function(img, sw, sh, anim) {
	var img = img;

	var sx = 0;
	var sy = 0;
	var sw = sw;
	var sh = sh;

	var x = 0;
	var y = 0;
	var w = sw;
	var h = sh;

	var fx = img.Width / sw;
	var fy = img.Height / sh;

	var anim = anim;
	var animDur = anim;

	return {
		getImage: function() {
			return img;
		},

		getSourceX: function() {
			return sx;
		},
		setSourceX: function(nx) {
			sx = nx;
			while (sx < 0)
				sx += fx;
			while (sx >= fx)
				sx -= fx;
		},

		getSourceY: function() {
			return sy;
		},
		setSourceY: function(ny) {
			sy = ny;
			while (sy < 0)
				sy += fy;
			while (sy >= fy)
				sy -= fy;
		},

		getWidth: function() {
			return w;
		},
		getHeight: function() {
			return h;
		},

		getAnimationDuration: function() {
			return animDur;
		},

		render: function(ctx) {
			ctx.drawImage(anim, sx, sy, sw, sh, x, y, w, h);
		},
		update: function(d) {
			anim -= d;
			while (anim < 0) {
				anim += animDur;
				this.setSourceX(this.getSourceX() + 1);
			}
		}
	};
}