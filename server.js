
var path = require('path');


var express = require('express');
var mainPageController = require(__dirname + "/controllers/mainPageController");




var app = express();

app.set("template engine","ejs");

//static files
app.use(express.static(__dirname +'/public'));

//app.use(express.static(path.resolve(__dirname, 'client')));

mainPageController(app);



app.listen(8080);
