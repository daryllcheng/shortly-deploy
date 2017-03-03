var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});



userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
  .then(function (hash) {
    this.password = hash;
    next();
  });
});

let User = mongoose.model('User', userSchema);

User.comparePassword = function (attemptedPassword, userpassword , callback) {
  bcrypt.compare(attemptedPassword, userpassword, function (err, isMatch) {
    if(err) callback(err);
    callback(null, isMatch);
  });
};

module.exports = User;