var engines = require('consolidate')

module.exports = function(app, port) {

  app.configure(function(){
    app.engine('html', engines.hogan);
    app.use(express.static(__dirname + '/public'));
    app.set("views", __dirname + "/views");
  });

  // Routes
  app.get('/', function(req, res){
    res.render("index.html", {host: 'http://' + req.headers.host, port: port});
  });

}
