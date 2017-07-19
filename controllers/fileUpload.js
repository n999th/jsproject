var formidable = require('formidable');
var fs = require('fs');
var mkdirp = require('mkdirp');
var express = require('express');
var textModel = require('../models/textModel');
var mongoose = require('mongoose');



function upload(req,res){
	var username = req.user.username;
	console.log(req.user);
	var myDir =  __dirname + "/../uploads/" + username+"/";
	var tagCounter = req.body.counter;
	var filename = ""+req.body.filetoupload;
	var title = req.body.title;
	var desciption = req.body.description;
	var tags=[];
	for(var i =0;i < tagCounter;i+=1){
		tags.push(req.body["tag"+i]);
	}
	try {
  		fs.accessSync(myDir);
	} catch (e) {
		mkdirp(myDir, function(err) { 
			if(err) throw err;
			else{
				var form = new formidable.IncomingForm();
				form.parse(req,function(err,fields,files){
					var oPath = files.filetoupload.path;
					var nPath = myDir + files.filetoupload.name;
					fs.rename(oPath,nPath,function(err){
						if(err) throw err;
					});
				});
			}
		});		
	}
	textModel({title,desciption,username,filename	,tags}).save(function(er,data){
  	if(er)throw er;
  		console.log("data saved is: " + data);
	});	
	res.render('index.ejs',{tags:req.session.tags});
}

module.exports.upload = upload;