var mongoose = require('mongoose');

var counterSchema = new mongoose.Schema({
  model:String,
  field:Number,
  counter:Number
});


var counterModel = mongoose.model('identitycounters',counterSchema);

module.exports = counterModel;