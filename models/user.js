var bcrypt = require('bcryptjs');
/*var mongoose = require('mongoose');

mongoose.connect('mongodb://test:test@ds137141.mlab.com:37141/todo');
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
*/