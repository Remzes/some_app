const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/User');

const SignupStrategy = new LocalStrategy({
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
  session: false
}, (req, username, password, done) => {
  const { body } = req;
  const user = {
    username, password,
    email: body.email,
    name: body.name,
  }

  const newUser = new User(user);
  User.createUser(newUser, err => {
    if (err) return done(err, false)
    if (!err) {
      done(null, newUser)
    }
  })
});

module.exports = SignupStrategy;
