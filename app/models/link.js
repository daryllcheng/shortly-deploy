var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number, 
  createdAt: { type: Date, default: Date.now }
});


var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

linkSchema.pre('save', function(next) {
  var code = createSha(this.url);
  this.code = code;
  next();
});

let Link = mongoose.model('Link', linkSchema);

// linkSchema.pre('save', function(next) {
//   var shasum = crypto.createHash('sha1');
//   console.log('this.url:  ',this.url)
//   shasum.update(this.url);

//   this.code = shasum.digest('hex').slice(0, 5);
//   console.log('CODE GETTING DEFINED', this.code);
//   next();
// });



module.exports = Link;
