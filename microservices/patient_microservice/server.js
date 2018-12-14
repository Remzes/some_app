const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

const dbConfig = require('./config')
mongoose.connect(dbConfig.mongoURLLocal, {
    useCreateIndex: true,
    useNewUrlParser: true
});

const Seneca = require('seneca')
const Web = require('seneca-web')

const app = express();
const build = path.resolve(__dirname + '/..' + '/client' + '/build');
app.use(express.static(build));

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Models
const senecaRoutes = require('./routes/index')
const senecaPlugin = require('./plugin/index')

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
    .use('basic').use('entity')
    .use(Web, config)
    .use('mongo-store', {
        name:'testapp',
        host:'localhost',
        port:27017
    })
    .use(senecaPlugin)
    .ready(() => {
        var server = seneca.export('web/context')()

        server.listen('3003', (err) => {
            console.log(err || 'patient_microservice started on: 3003')
        })
    })

// app.listen(3010, () => {
//   console.log("Listening to the port 3010...");
// });
