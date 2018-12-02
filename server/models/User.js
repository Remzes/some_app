const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    required: true,
    index: { unique: true },
    type: String,
    dropDups: true
  },
  email: {
    require: true,
    index: { unique: true },
    type: String,
    dropDups: true
  },
  password: {
    required: true,
    type: String
  },
  name: {
    require: true,
    type: String
  },
}, {versionKey: false});

const User = module.exports = mongoose.model('User', UserSchema);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  })
});

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    })
  })
};

module.exports.comparePasswords = (userPassword, hash, callback) => {
  bcrypt.compare(userPassword, hash, (err, isMatched) => {
    if(err) throw err;
    callback(null, isMatched);
  })
};