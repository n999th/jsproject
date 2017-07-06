var bcrypt = require('bcryptjs');
var mongoose = require('mongoose');

var database = mongoose.connection;
//some code from guide

var schema = mongoose.Schema({
	username:{
		index:true,
		type:String
	},
	pass:{
		type:String
	},
	mail:{
		type:String
	},
	name:{
		type:String
	}
});

var User = mongoose.model('User',schema);
module.exports = User;

function createUser(newUser,cb){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.pass, salt, function(err, hash) {
	        newUser.pass = hash;
	        newUser.save(cb); 
	    });
	});
}


module.exports.createUser = createUser;

function getUserByUsername(username,cb){
	var qr = {username:username};
	User.findOne(qr,cb);
}
function getUserById(id,cb){
	User.findById(id,cb);
}

function comparePassword(potentialPass,hash,cb){
	bcrypt.compare(potentialPass, hash, function(err, res) {
    	if(err) throw err;
    	cb(null,res);
	});
}

module.exports.getUserByUsername = getUserByUsername;
module.exports.getUserById = getUserById;
module.exports.comparePassword = comparePassword;




