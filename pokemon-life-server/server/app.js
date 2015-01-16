var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Requerido
var session = require('express-session');
var routes = require('./routes/index');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

var app = express();

//Este se llama al logearte
passport.serializeUser(function(user, done) {
    console.log("Serealize User: " + user);
  done(null, user);
});

//Este se llama antes de enrutar un request
passport.deserializeUser(function(user, done) {
  console.log("Deserealize User: " + user.openId);
  done(null, user);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//No voy a usar session, asi que esto no deberia ir.
//app.use(session({secret: 'ohhhh!!', saveUninitialized: true, resave: true}));
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new LocalStrategy(
  function(username, password, done) {
//    User.findOne({ username: username }, function (err, user) {
//      if (err) { return done(err); }
//      if (!user) {
//        return done(null, false, { message: 'Incorrect username.' });
//      }
//      if (!user.validPassword(password)) {
//        return done(null, false, { message: 'Incorrect password.' });
//      }
//      return done(null, user);
//    });
  }
));

app.use(passport.initialize());
//No voy a usar sessions
//app.use(passport.session());

app.use('/', routes);

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
