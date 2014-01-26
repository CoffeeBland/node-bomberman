function loadFramedSpriteSheet(textureUrl, textureName, frameWidth, frameHeight, cb)
{
    var image = new PIXI.ImageLoader(textureUrl);
    var texture = image.texture.baseTexture;
    var frames=[];
    image.addEventListener("loaded", function (event) {
        var cols = Math.floor(texture.width / frameWidth);
        var rows = Math.floor(texture.height / frameHeight);

        var i=0;
        for (var y=0; y<rows; y++)
        {        
            for (var x=0; x<cols; x++,i++)
            {        
                PIXI.TextureCache[textureName+'-'+i] = new PIXI.Texture(texture, {
                    x: x*frameWidth,
                    y: y*frameHeight,
                    width: frameWidth,
                    height: frameHeight
                });    

                frames.push(PIXI.TextureCache[textureName+'-'+i]);
            }
        }
        
        if (typeof cb == 'function')
        {
            cb(frames);
        }
    });
    image.load();
    return frames;
}
loadFramedSpriteSheet('tileset.png', 'terrain', 32, 24, function(frames) {

    var terrain = new PIXI.Sprite(frames[8]);
    //we can also create the sprite from textureCache : 
   //var terrain = PIXI.Sprite.fromFrame('terrain-8');

    terrain.position.x = 0;
    terrain.position.y = 0;
    stage.addChild(terrain);

    renderer.render(stage);

});