var express = require('express');
var app = express();
var port = process.env.PORT || 5500;
var mongoose = require('mongoose');
var passport = require('passport');

var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database/index.js');
mongoose.connect(configDB.url);

require('./config/passport')(passport);

app.use(express.static(__dirname + '/views'));


app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser());

app.set('view engine', 'ejs');

app.use(session({ secret: 'helloworld'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./routes/routes.js')(app, passport);

app.listen(port);
console.log('Visit \'localhost:5500\'');