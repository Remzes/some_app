const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser');
const checkAuth = require('./middleware/checkAuth')
const expressValidator = require('express-validator');
const SignupStrategy = require('./services/strategies/signup');
const SigninStrategy = require('./services/strategies/signin');
const mongoURL = "mongodb://localhost:27017/testapp"

mongoose.connect(mongoURL, {
  useCreateIndex: true,
  useNewUrlParser: true
});

const app = express();
const build = path.resolve(__dirname + '/..' + '/client' + '/build');
app.use(express.static(build));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Models
require('./models/User')
require('./models/Survey')

// Express Session
// app.use(session({
//   secret: 'secret',
//   cookie: { maxAge: 3600000 }
// }));
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60,
        keys: ['sdfdsfadsfsdfasdfasfsadf']
    })
)

//Passport init
app.use(passport.initialize());
app.use(passport.session());

passport.use('local-signup', SignupStrategy);
passport.use('local-signin', SigninStrategy);

// Routes
app.use('/api/surveys', checkAuth)
const usersRoutes = require('./routes/users');
const surveyRoutes = require('./routes/surveys')
app.use('/api/users', usersRoutes);
app.use('/api/surveys', surveyRoutes)

// Cookie parser
app.use(cookieParser());

// Validator
app.use(expressValidator());

// app.get('*', (req, res) => {
//   app.use(express.static(build));
//   res.sendFile(path.resolve(__dirname + '/..' + '/client' + '/public') + '/index.html')
// })

app.listen(3010, () => {
  console.log("Listening to the port 3010...");
});
