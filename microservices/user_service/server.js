const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const SignupStrategy = require('./strategies/signup');
const SigninStrategy = require('./strategies/signin');
const mongoURL = "mongodb://localhost:27017/testapp"
mongoose.connect(mongoURL, {
    useCreateIndex: true,
    useNewUrlParser: true
});

var Seneca = require('seneca')
var Web = require('seneca-web')

const app = express();
const build = path.resolve(__dirname + '/..' + '/client' + '/build');
app.use(express.static(build));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Models
require('./models/User')
const senecaRoutes = require('./routes/routes')
const senecaPlugin = require('./plugin/plugin')

// Express Session
app.use(session({
  secret: 'secret',
  cookie: { maxAge: 3600000 }
}));

// app.use(
//     cookieSession({
//         maxAge: 30 * 24 * 60 * 60,
//         keys: ['sdfdsfadsfsdfasdfasfsadf']
//     })
// )

//Passport init
passport.use('local-signup', SignupStrategy);
passport.use('local-signin', SigninStrategy);
app.use(passport.initialize());
app.use(passport.session());

// Cookie parser
app.use(cookieParser());

// Validator
app.use(expressValidator());

const config = {
    adapter: require('seneca-web-adapter-express'),
    auth: passport,
    context: app,
    options: { parseBody: false },
    routes: senecaRoutes
}

const seneca = Seneca()
seneca
    .use(senecaPlugin)
    .use(Web, config)
    .ready(() => {
        var server = seneca.export('web/context')()

        server.listen('3002', (err) => {
            console.log(err || 'user_service started on: 3002')
        })
    })

// app.listen(3010, () => {
//   console.log("Listening to the port 3010...");
// });
