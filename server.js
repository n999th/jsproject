
var http = require('http');
var path = require('path');


var express = require('express');


var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect("mongodb://test:test@ds137141.mlab.com:37141/todo");

//create schema for the database
var dbSchema = new mongoose.Schema({
  tag:String,
  popularity:Number
});

//set up database model
var tagModel = mongoose.model('tags',dbSchema);


var app = express();

app.set("template engine","ejs");

app.use(express.static(path.resolve(__dirname, 'client')));

app.get("/",function(req,res){
  tagModel.find({},function(err,data){
    if(err) throw err;
    console.log("data is: " + data);
    res.render(__dirname + "/client/index.ejs", {tags:data});
  }).sort({popularity:-1});
});



app.listen(8080);
