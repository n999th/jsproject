var formidable = require('formidable');
var fs = require('fs');
var mkdirp = require('mkdirp');
var express = require('express');


	
function upload(req,res){
	var myDir =  __dirname + "/../uploads/" + req.user.username+"/";
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
						res.write("File Uploaded");
						res.end();
					});
				});
			}
		});		
	}
}

module.exports.upload = upload;