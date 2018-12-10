const User = require('../models/User');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

passport.serializeUser((user, done) => {
  console.log('serialize user')
    done(null, user._id);
});

//Usage - from session
passport.deserializeUser((id, done) => {
  console.log('deserialize user')
    User.findById(id)
        .then(user => {
            done(null, user)
        });
});

const SigninStrategy = new LocalStrategy({
  usernameField: "username",
  passwordField: "password",
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  if (!username || !password) {
      const error = new Error("Incorrect email or password");
      error.name = "IncorrectCredentialsError";

      return done(error);
  }
  const userData = {username: username.trim(), password: password.trim()}
  return User.findOne({ username: userData.username }, (err, user) => {
    if (err) return done(err);
    if (!user) {
      const error = new Error("Incorrect email or password");
      error.name = "IncorrectCredentialsError";

      return done(error);
    }

    return User.comparePasswords(userData.password, user.password, (passwordErr, isMatch) => {
      if (err) return done(err);

      if (!isMatch) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';

        return done(error);
      } else {
        return jwt.sign({ user }, 'secret_key', {expiresIn: 3600}, (err, token) => {
          if (err) {
            const error = new Error("Internal Server Error");
            return done(error);
          }
          return done(null, token, user);
        })
      }
    })
  })
});

module.exports = SigninStrategy;
