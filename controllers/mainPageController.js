var mongoose = require('mongoose');

//create schema for the database
var tagsSchema = new mongoose.Schema({
  tag:String,
  popularity:Number
});


//set up database model
var tagModel = mongoose.model('tags',tagsSchema);



module.exports = function(app){
	app.get("/",function(req,res){
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