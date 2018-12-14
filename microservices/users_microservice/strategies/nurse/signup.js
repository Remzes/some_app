const LocalStrategy = require('passport-local').Strategy
const Nurse = require('../../models/Nurse');

const NurseSignupStrategy = new LocalStrategy({
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

  const newUser = new Nurse(user);
  newUser.role = "nurse"
  Nurse.createUser(newUser, err => {
    if (err) return done(err, false)
    if (!err) {
      done(null, newUser)
    }
  })
});

module.exports = NurseSignupStrategy;
