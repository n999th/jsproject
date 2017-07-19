var mongoose = require('mongoose');

var textsSchema = new mongoose.Schema({
  title:String,
  desciption:String,
  username:String,
  filename:String,
  tags:Array
});

var textModel = mongoose.model('texts',textsSchema);

module.exports = textModel;