var mongoose = require('mongoose');

//create schema for the database
var tagsSchema = new mongoose.Schema({
  tag:String,
  popularity:Number
});


//set up database model
var tagModel = mongoose.model('tags',tagsSchema);

module.exports = tagModel;