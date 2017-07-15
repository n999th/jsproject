var express = require('express');
var router = express.Router();
var fileupload = require('../models/fileUpload');

router.post("/fileupload",function(req,res){
	fileupload.upload(req,res);
});

module.exports = router;