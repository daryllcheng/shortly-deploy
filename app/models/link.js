var db = require('../config');
var crypto = require('crypto');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });



var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var link = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: String, 
  createdAt: { type: Date, default: Date.now }
});

link.pre('save', function(next) {
  console.log('this.url', this.url);
  console.log('this', this);
  var shasum = crypto.createHash('sha1');
  console.log('shasum', shasum);
  shasum.update(this[url]);
  console.log('shasum', shasum);
  // model.set('code', shasum.digest('hex').slice(0, 5));
  console.log('this after', this);
});

module.exports = mongoose.model('link', link);
