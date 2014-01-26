var Bomb = function(x, y, strength) {
	var x = x, y = y, strength = strength;
	return {
		getX: function() {
			return x;
		}
		getY: function() {
			return y;
		}
		getStrength: function() {
			return strength;
		}
	};
};
