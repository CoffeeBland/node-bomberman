// create a texture from an image path
// var texture = PIXI.Texture.fromImage("/res/sprites/lapoule.jpg");
// create a new Sprite using the texture
// var lapoule = new PIXI.Sprite(texture);

var Renderer = function(w, h, c) {
	var stage = new PIXI.Stage(c);
	var renderer = PIXI.autoDetectRenderer(w, h);
	document.getElementById('game').appendChild(renderer.view);

	var abortRender = false;
	var render = function() {
		if (abortRender) {
			abortRender = false;
			return;
		}
		requestAnimFrame(render);
		renderer.render(stage);
	}

	return {
		addTexture: function(texture) {
			stage.addChild(texture);
		},
		removeTexture: function(texture) {
			stage.removeChild(texture);
		},

		beginRender: function() {
			requestAnimFrame(render);
			render();
		},
		stopRender: function() {
			abortRender = true;
		},

		stage: function() {
			return stage;
		},
		renderer: function() {
			return renderer;
		}
	};
}
