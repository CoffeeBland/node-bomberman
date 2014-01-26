var Character = function(x, y) {
	var x, y, speed = 0.5;

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

		}
	};
};
