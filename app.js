var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var session = require('express-session');

var inputRouter = require('./routes/input');
var computeRouter = require('./routes/compute');

var app = express();
const mongoose = require("mongoose");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = require("jquery");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use( express.static( "public" ) );
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'Corva',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use('/', inputRouter);
app.use('/compute', computeRouter);

mongoose.connect("mongodb://vishalkuppili:varun1996@ds123635.mlab.com:23635/corva")

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
