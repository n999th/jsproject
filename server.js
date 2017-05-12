
var http = require('http');
var path = require('path');


var express = require('express');


var app = express();

app.set("template engine","ejs");

app.use(express.static(path.resolve(__dirname, 'client')));

app.get("/",function(req,res){
  res.render(__dirname + "/client/index.ejs");
});

app.post("/",function(req,res){
  res.render(__dirname + "/client/index.ejs");
});

app.listen(8080);
