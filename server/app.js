/**
 * Module dependencies.
 */

var express = require('express'),
    socket = require('./socket.js');

var app = module.exports = express.createServer();

// Hook Socket.io into Express
var io = require('socket.io').listen(app);

// Configuration
app.configure(function(){
  // app.set('views', __dirname + '/views');
  // app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/../'));
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

// app.get('/', routes.index);
// app.get('/partials/:name', routes.partials);

// redirect all others to the index (HTML5 history)
// app.get('*', routes.index);

// Socket.io Communication
io.sockets.on('connection', socket);

// Start server
app.listen(8080, function(){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
