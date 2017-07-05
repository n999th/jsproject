var express = require('express');
var mainPageController = require(__dirname + "/controllers/mainPageController");

var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local'),Strategy;

var app = express();

app.set("template engine","ejs");
app.set('view engine','ejs');
app.use(cookieParser());
//static files
app.use(express.static(__dirname +'/public'));

app.use(session({
	secret:'secret',
	saveUninitialized:true,
	resave:true
}));


app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
	res.locals.success = req.flash('success_msg');
	res.locals.error_message = req.flash('error-msg');
	res.locals.error = req.flash('error');
	next();
});

// In this example, the formParam value is going to get morphed into form body format useful for printing.
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));


var users = require('./routes/users');


app.use('/users',users)


mainPageController(app);



app.listen(8080);
