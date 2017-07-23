var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var textsSchema = new mongoose.Schema({
  title:String,
  desciption:String,
  username:String,
  filename:String,
  tags:Array,
  date:Number
});

autoIncrement.initialize(mongoose.connection);
textsSchema.plugin(autoIncrement.plugin,{model:'texts',field:'postId'});
var textModel = mongoose.model('texts',textsSchema);

module.exports = textModel;