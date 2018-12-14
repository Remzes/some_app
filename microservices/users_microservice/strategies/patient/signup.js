const LocalStrategy = require('passport-local').Strategy
const Patient = require('../../models/Patient');

const PatientSignupStrategy = new LocalStrategy({
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

  const newUser = new Patient(user);
  Patient.createUser(newUser, err => {
    if (err) return done(err, false)
    if (!err) {
      done(null, newUser)
    }
  })
});

module.exports = PatientSignupStrategy;
