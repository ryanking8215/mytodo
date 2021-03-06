
/**
 * Module dependencies.
 */

var express = require('express');
//var partials = require('express-partials')
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var todo = require('./controllers/todo');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(partials());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use("/public",express.static(path.join(__dirname, 'public')));

//app.use(express.csrf);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// app.get('/', routes.index);
// app.get('/users', user.list);

app.get('/', todo.index);
app.post('/todo/new', todo.new);
app.get('/todo/:id', todo.view);
app.get('/todo/:id/edit', todo.edit);
app.post('/todo/:id/edit', todo.save);
app.get('/todo/:id/delete', todo.delete);
app.get('/todo/:id/finish', todo.finish);


app.locals = {
    title : "Node TODO"
}

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
