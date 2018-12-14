const Nurse = require('../../models/Nurse');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    Nurse.findById(id)
        .then(user => {
            done(null, user)
        });
});

const NurseSigninStrategy = new LocalStrategy({
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
  return Nurse.findOne({ username: userData.username }, (err, user) => {
    if (err) return done(err);
    if (!user) {
      const error = new Error("Incorrect email or password");
      error.name = "IncorrectCredentialsError";

      return done(error);
    }

    return Nurse.comparePasswords(userData.password, user.password, (passwordErr, isMatch) => {
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

module.exports = NurseSigninStrategy;
