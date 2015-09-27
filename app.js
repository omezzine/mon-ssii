var express = require('express');
var fs = require('fs');
var engine = require('ejs-mate');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// use ejs-locals for all ejs templates: 
app.engine('ejs', engine);
 
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'ejs'); // so you can render('index') 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// BootStrap Models
fs.readdirSync(path.join(__dirname, 'app/models')).forEach(function (file) {
  if (~file.indexOf('.js')) require(path.join(__dirname, 'app/models', file));
});

// Init DataBase
require('./config/database-connect');

// load Routes
require('./config/routes')(app);

module.exports = app;
