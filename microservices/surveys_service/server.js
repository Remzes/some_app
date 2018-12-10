const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const mongoURL = "mongodb://localhost:27017/testapp"
mongoose.connect(mongoURL, {
    useCreateIndex: true,
    useNewUrlParser: true
});

const seneca = require('seneca')();
const Web = require('seneca-web');
const senecaPlugin = require('./plugin/plugin')
const senecaRoutes = require('./routes/routes')

const app = express();
// const build = path.resolve(__dirname + '/..' + '/client' + '/build');
// app.use(express.static(build));

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Cookie parser
app.use(cookieParser());

// Validator
app.use(expressValidator());

const config = {
    adapter: require('seneca-web-adapter-express'),
    context: app,
    options: { parseBody: false },
    routes: senecaRoutes
}

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
        const server = seneca.export('web/context')()

        server.listen('3003', (err) => {
            console.log(err || 'user_service started on: 3003')
        })
    })
