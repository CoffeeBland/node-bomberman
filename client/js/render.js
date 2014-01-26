// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);

// create a renderer instance.
var renderer = PIXI.autoDetectRenderer(480, 320);

// add the renderer view element to the DOM
document.getElementById('game').appendChild(renderer.view);


// create a texture from an image path
var texture = PIXI.Texture.fromImage("/res/sprites/lapoule.jpg");
// create a new Sprite using the texture
var lapoule = new PIXI.Sprite(texture);

// center the sprites anchor point
lapoule.anchor.x = 0.45;
lapoule.anchor.y = 0.6;

// move the sprite t the center of the screen
lapoule.position.x = 250;
lapoule.position.y = 150;

stage.addChild(lapoule);

requestAnimFrame(animate);
function animate() {
  requestAnimFrame(animate);
        lapoule.rotation += 0.1;

  // render the stage
  renderer.render(stage);
}
