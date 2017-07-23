var mongoose = require('mongoose');
var tagModel = require('../models/tagModel');
var textModel = require('../models/textModel');
var fs = require('fs');
var counterModel = require('../models/counterModel');
var dateFormat = require('dateformat');

module.exports = function(app){
  function getPostCount(){
    counterModel.find({},function(err,data){
        if(err) throw err;
        console.log(data[0]['_doc'].count);
      });
  }

  function renderAndGetTags(res,req,postData){
    tagModel.find({},function(err,tagData){
        if(err) throw err;
        req.session.tags = tagData;
        res.render("index.ejs", {tags:tagData,posts:postData});
      }).sort({popularity:-1});
  }

	app.get("/",function(req,res){
      textModel.find({},function(err,data){
        if(err) throw err;
        req.session.posts = data;
        renderAndGetTags(res,req,data);
      }).sort({date:-1});
	});
//TODO
  app.post("/loadMore",function(req,res){
    console.log("aqa var");
    console.log(req.session.posts[req.session.posts.length-1]);
  });

	app.get("/uploadPage",authed,function(req,res){
  		tagModel.find({},function(err,data){
    		if(err) throw err;
    		res.render("uploadPage.ejs", {tags:data});
  		}).sort({popularity:-1});
	})
  app.get('/*.pdf',function(req,res){
    let readStream = fs.createReadStream(__dirname +"/.."+ req.path);
    readStream.on('close', () => {
        res.end();
    });
    readStream.pipe(res);
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