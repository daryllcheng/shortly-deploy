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

var urls = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number, 
  createdAt: { type: Date, default: Date.now }
});

let Link = mongoose.model('Link', urls);
module.exports = Link;
