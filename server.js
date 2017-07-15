var express = require('express');
var mainPageController = require(__dirname + "/controllers/mainPageController");

var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local'),Strategy;

var app = express();
//set up body parser module
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect("mongodb://test:test@ds137141.mlab.com:37141/todo");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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


//git instructions
app.use(function(req,res,next){
	res.locals.success = req.flash('success_msg');
	res.locals.error_message = req.flash('error_msg');
	res.locals.error = req.flash('error');
  res.locals.user = req.user || null; 
	next();
});



var users = require('./routes/users');
var uploadPage = require('./routes/uploadPage');

app.use('/users',users)
app.use(uploadPage);

mainPageController(app);



app.listen(8080);
