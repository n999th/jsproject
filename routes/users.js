var express = require('express');
var router = express.Router();


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
		console.log('passed');
		res.render('register');
	}
});

module.exports = router;