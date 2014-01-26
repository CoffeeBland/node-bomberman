PIXI.Texture.SCALE_MODE.DEFAULT = PIXI.Texture.SCALE_MODE.NEAREST;
var characterTexture = PIXI.BaseTexture.fromImage("/res/sprites/character.png");
var characterColorTexture = PIXI.BaseTexture.fromImage("/res/sprites/character_color.png");
var tilemapTexture = PIXI.BaseTexture.fromImage("/res/sprites/tilemap.png");
var bombTexture = PIXI.BaseTexture.fromImage("/res/sprites/bomb.png");
var fireTexture = PIXI.BaseTexture.fromImage("/res/sprites/texture.png");

var Renderer = function(w, h, c) {
	var stage = new PIXI.Stage(c);
	var renderer = PIXI.autoDetectRenderer(w, h);
	document.getElementById('game').appendChild(renderer.view);;

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
		addSprite: function(sprite) {
			stage.addChild(sprite);
		},
		removeSprite: function(sprite) {
			stage.removeChild(sprite);
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

var currentRenderer;