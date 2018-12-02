const User = require('../../models/User');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');


const SigninStrategy = new LocalStrategy({
  usernameField: "username",
  passwordField: "password",
  session: true,
  passReqToCallback: true
}, (req, username, password, done) => {
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