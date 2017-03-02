var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
  username: String,
  password: String
});

module.exports = mongoose.model('user', user);


// UserSchema.pre('save', function(next) {
//     console.log(this); // logs out empty object {}

//     let hash = crypto.createHash('sha256');
//     let password = this.password;

//     console.log("Hashing password, " + password);

//     hash.update(password);
//     this.password = hash.digest('hex');

//     next();
//   });