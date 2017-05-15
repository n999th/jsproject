var express = require('express');
var mainPageController = require(__dirname + "/controllers/mainPageController");




var app = express();

app.set("template engine","ejs");

//static files
app.use(express.static(__dirname +'/public'));


mainPageController(app);



app.listen(8080);
