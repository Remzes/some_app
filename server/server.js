const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const checkAuth = require('./middleware/checkAuth')
const mongoURL = "mongodb://localhost:27017/testapp"
const app = express()

mongoose.connect(mongoURL, {
    useCreateIndex: true,
    useNewUrlParser: true
});

// Body Parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Express session
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 3600000 }
}))

// Cookie parser
app.use(cookieParser())

const usersRoutes = require('./routes/user.routes')
const surveysRoutes = require('./routes/survey.routes')
app.use('/api/users', usersRoutes)
app.use('/api/surveys', surveysRoutes)
app.use(checkAuth)


app.listen(3001, () => {
    console.log('Listening to port 3001...')
})
