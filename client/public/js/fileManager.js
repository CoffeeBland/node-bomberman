var cachedFiles = {};

var getOrLoadFile = function(filepath) {
	if (cachedFiles[filepath])
		return cachedFiles[filepath];
	else {
		var img = new Image();
		img.src = filepath;
		return img;
	}
}