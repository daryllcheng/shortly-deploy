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

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.hashPassword = function (err, password) {
  if (err) throw err;
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(password, null, null).bind(this)
    .then(function (hash) {
      this.password = hash;
    });
};

userSchema.comparePassword = function (attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function (err, isMatch) {
    callback(isMatch);
  });
};




let User = mongoose.model('User', userSchema);
module.exports = User;

// UserSchema.pre('save', function(next) {
//     console.log(this); // logs out empty object {}

//     let hash = crypto.createHash('sha256');
//     let password = this.password;

//     console.log("Hashing password, " + password);

//     hash.update(password);
//     this.password = hash.digest('hex');

//     next();
//   });