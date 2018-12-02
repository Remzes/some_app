const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const SignupStrategy = require('./services/strategies/signup');
const SigninStrategy = require('./services/strategies/signin');
const mongoURL = "mongodb://localhost:27017/testapp"

mongoose.connect(mongoURL, {
  useCreateIndex: true,
  useNewUrlParser: true
});

const app = express();
const build = path.resolve(__dirname + '/..' + '/react_redux_express' + '/build');
app.use(express.static(build));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Models
require('./models/User')

// Express Session
// app.use(session({
//   secret: 'secret',
//   saveUnitialized: true,
//   resave: true,
//   cookie: { maxAge: 3600000 }
// }));

// Routes
const usersRoutes = require('./routes/users');
app.use('/api/users', usersRoutes);

// Cookie parser
app.use(cookieParser());

// Validator
app.use(expressValidator());

// Passport init
app.use(passport.initialize());
app.use(passport.session());
passport.use('local-signup', SignupStrategy);
passport.use('local-signin', SigninStrategy);
// app.get('*', (req, res) => {
//   app.use(express.static(build));
//   res.sendFile(path.resolve(__dirname + '/..' + '/react_redux_express' + '/public') + '/index.html')
// })

app.listen(3010, () => {
  console.log("Listening to the port 3010...");
});