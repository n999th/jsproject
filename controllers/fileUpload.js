var formidable = require('formidable');
var fs = require('fs');
var mkdirp = require('mkdirp');
var express = require('express');
var textModel = require('../models/textModel');
var mongoose = require('mongoose');



function upload(req,res){
	var username = req.user.username;
	var myDir =  __dirname + "/../uploads/" + username+"/";
	try {
  		fs.accessSync(myDir);
	} catch (e) {
		mkdirp(myDir, function(err) { 
			if(err) throw err;
		});		
	}

	var form = new formidable.IncomingForm();
	form.parse(req,function(err,fields,files){
		if(err) throw err;
		var tagCounter = fields.counter;
		var filename = ""+files.filetoupload.name;
		var title = fields.title;
		var desciption = fields.description;
		var tags=[];
		for(var i =0;i < tagCounter;i+=1){
			tags.push(fields["tag"+i]);
		}
		// console.log("Username: "+ username);
		// console.log("tagCounter: "+ tagCounter);
		// console.log("desciption: "+ desciption);
		// console.log("title: "+ title);
		// console.log("tags: "+ tags);

		var oPath = files.filetoupload.path;
		var nPath = myDir + files.filetoupload.name;
		console.log("path is: " + nPath);
		fs.rename(oPath,nPath,function(er){
			if(er) throw err;
			textModel({title,desciption,username,filename	,tags}).save(function(er,data){
		  	if(er)throw er;
		  		console.log("data saved is: " + data);
			});	
			res.render('index.ejs',{tags:req.session.tags});
		});
	});
}

module.exports.upload = upload;