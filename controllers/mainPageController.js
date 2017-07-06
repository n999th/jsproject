var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//connect to database
mongoose.createConnection("mongodb://test:test@ds137141.mlab.com:37141/todo");

//create schema for the database
var tagsSchema = new mongoose.Schema({
  tag:String,
  popularity:Number
});

var textsSchema = new mongoose.Schema({
  text:String,
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


	app.get("/uploadPage",function(req,res){
  		tagModel.find({},function(err,data){
    		if(err) throw err;
    		res.render("uploadPage.ejs", {tags:data});
  		}).sort({popularity:-1});
	})

	app.post("/uploadPage/",function(req,res){
		var text = req.body.text;
		var tags = req.body["tagList[]"];
		//TODO add in database for current user
    textModel({text,tags}).save(function(err,data){
      
    });
	});
};