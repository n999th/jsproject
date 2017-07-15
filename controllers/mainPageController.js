var mongoose = require('mongoose');

//create schema for the database
var tagsSchema = new mongoose.Schema({
  tag:String,
  popularity:Number
});

var textsSchema = new mongoose.Schema({
  text:String,
  username:String,
  tags:Array
});

//set up database model
var tagModel = mongoose.model('tags',tagsSchema);
var textModel = mongoose.model('texts',textsSchema);



module.exports = function(app){
	app.get("/",function(req,res){
  		tagModel.find({},function(err,data){
    		if(err) throw err;
    		res.render("index.ejs", {tags:data});
  		}).sort({popularity:-1});
	});


	app.get("/uploadPage",authed,function(req,res){
  		tagModel.find({},function(err,data){
    		if(err) throw err;
    		res.render("uploadPage.ejs", {tags:data});
  		}).sort({popularity:-1});
	})

	app.post("/uploadPage/",authed,function(req,res){
		var text = req.body.text;
		var tags = req.body["tagList[]"];
		//TODO add in database for current user
    var username = req.user.username;
    textModel({text,username,tags}).save(function(err,data){
      if(err)throw err;
      
    });
	});

  function authed(req,res,next){
    if(req.isAuthenticated()){
      return next(); 
    }else{
      //you are not logged in
      res.redirect('/users/login');
    }
  }


};