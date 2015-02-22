var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var db = require('./services/db');

var app = express();
console.log("Starting server!!");
var config = require('./config/config-' + app.get('env'));
console.log("Config: config-" + config.name + ".json");

// Routers
var catalog = require('./routes/catalog');

//Authorization
var authorization = require('./services/authorization').getService(db, config);



app.set('view engine', 'jade');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log("Login: username: " + username + ", password: " + password);
    var promise = authorization.authorizate(username, password);
    promise.then(function(token) {
        if (token != undefined) {
            done(null, token);
        } else {
            var err = new Error('Invalid user or password');
            done(err);
        }
    });
  }
));

app.use(passport.initialize());

app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, token, info) {
    if (err) { return next(err); }
    if (token) {
        console.log("Token: " + token);
        return res.send(token);
    } else {
        return res.status(404).end();
    }
  })(req, res, next);
});

//Use Routers
app.all('/api/*', function(req, res, next) {
    var token = req.get('token');
    var promise = authorization.authenticate(token);
    promise.then(function(user) {next()}, next);
});
app.use('/api/catalog', catalog);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
