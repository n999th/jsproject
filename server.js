
var http = require('http');
var path = require('path');


var express = require('express');


var app = express();



app.use(express.static(path.resolve(__dirname, 'client')));


app.listen(8080);
