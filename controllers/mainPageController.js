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
      }).sort({date:-1}).limit(3);
	});

  app.get("/oldest",function(req,res){
      textModel.find({},function(err,data){
        if(err) throw err;
        req.session.posts = data;
        renderAndGetTags(res,req,data);
      }).sort({date:1}).limit(3);
  });


  app.get("/loadNew",function(req,res){
    console.log("aqa var");
    console.log("url is: " + req.url);
    var length = req.session.posts.length-1;
    var minDate = req.session.posts[length].date;
    if (typeof minDate === 'undefined')
      return;
    textModel.find({date:{$lt:parseInt(minDate)}},function(err,postData){
      if(err) throw err;
      req.session.posts.push(postData);
      res.send(postData);
    }).sort({date : -1}).limit(3);
  });



  app.get("/loadOld",function(req,res){
    console.log("aqa var");
    console.log("url is: " + req.url);
    var length = req.session.posts.length-1;
    var minDate = req.session.posts[length].date;
    if (typeof minDate === 'undefined')
      return;
    textModel.find({date:{$gt:parseInt(minDate)}},function(err,postData){
      if(err) throw err;
      req.session.posts.push(postData);
      res.send(postData);
    }).sort({date : 1}).limit(3);
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