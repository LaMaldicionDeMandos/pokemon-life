var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var app = express();

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(/*{
    usernameField: 'email',
    passwordField: 'password'
  },*/
  function(username, password, done) {
    console.log("Login: username: " + username + ", password: " + password);
    done(null, "token");
  }
));

app.use(passport.initialize());

app.use('/', routes);

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
