var express = require('express');
var router = express.Router();
var fileupload = require('../controllers/fileUpload');

router.post("/fileupload",authed,function(req,res){
	fileupload.upload(req,res);
});
router.get("/fileupload",function(req,res){
	res.redirect('/');
});

function authed(req,res,next){
if(req.isAuthenticated()){
  return next(); 
}else{
  //you are not logged in
  res.redirect('/users/login');
	}
}


module.exports = router;