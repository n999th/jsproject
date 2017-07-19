var mongoose = require('mongoose');
var tagModel = require('../models/tagModel');
var textModel = require('../models/textModel');


module.exports = function(app){
	app.get("/",function(req,res){
      // if(typeof req.session.posts ==='undefined'){
      //   console.log(textModel.find({}).min({postId}));
      // }
      if(typeof req.session.tags === 'undefined'){
  		tagModel.find({},function(err,data){
    		if(err) throw err;
        req.session.tags = data;
    		res.render("index.ejs", {tags:data});
  		}).sort({popularity:-1});
    }else{
        res.render("index.ejs", {tags:req.session.tags});
    }
	});


	app.get("/uploadPage",authed,function(req,res){
  		tagModel.find({},function(err,data){
    		if(err) throw err;
    		res.render("uploadPage.ejs", {tags:data});
  		}).sort({popularity:-1});
	})

	// app.post("/uploadPage/",authed,function(req,res){
	// 	var text = req.body.text;
	// 	var tags = req.body["tagList[]"];
	// 	//TODO add in database for current user
 //    var username = req.user.username;

	// });

  function authed(req,res,next){
    if(req.isAuthenticated()){
      return next(); 
    }else{
      //you are not logged in
      res.redirect('/users/login');
    }
  }


};