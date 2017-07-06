var express = require('express');
var router = express.Router();
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var User = require('../models/user');

router.get('/register',function(req,res){
	res.render('register');
});

router.get('/login',function(req,res){
	res.render('login');
});


router.post('/register',function(req,res){
	var name = req.body.name;
	var email = req.body.email;
	var username = req.body.username;
	var pass = req.body.pass;
	var pass2 = req.body.pass2;

	req.checkBody('email', 'Email is empty').notEmpty();
	req.checkBody('email', 'Invalid Email').isEmail();
	req.checkBody('name', 'Name is empty').notEmpty();
	req.checkBody('pass', 'Password is empty').notEmpty();
	req.checkBody('username', 'Username is empty').notEmpty();
	req.checkBody('pass2', 'Passwords must match!').equals(req.body.pass);



	var errors = req.validationErrors();
	if(errors){
		res.render('register',{
			err:errors
		});
	}else{
		var newuser = new User({
			name:name,
			mail:email,
			username:username,
			pass:pass
		});
		User.createUser(newuser,function(err,user){
			if(err) throw err;
			console.log(user);
		});
		req.flash('success_msg','You registered');
		res.redirect('/users/login');
	}
});

passport.use(new localStrategy(
  function(username, password, done) {
    User.getUserByUsername(username,function(err,user){
    	if(err)throw err;
    	if(!user){
    		return done(null,false,{message:'User not found'});
    	}
    	User.comparePassword(password,user.pass,function(err,isMatch){
    		if(err) throw err;
    		if(isMatch){
    			return done(null,user);
    		}else{
    			return done(null,false,{message:'Invalid Password'});
    		}	
    	});
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});



router.post('/login',
  passport.authenticate('local',{successRedirect:'/',failureRedirect:'/users/login',failureFlash:true}),
  function(req, res) {
    res.redirect('/');
});

router.get('/logout',function(req,res){
	req.logout();
	req.flash('success_msg','You logged out');
	res.redirect('/users/login');
});


module.exports = router;