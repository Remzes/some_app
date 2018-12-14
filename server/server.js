const express = require('express')
const session = require('express-session');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const checkAuth = require('./middleware/checkAuth')
const config = require('./config')
const app = express()

mongoose.connect(config.mongoURLLocal, {
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

const authRoutes = require('./routes/auth.routes')
const patientRoutes = require('./routes/patient.routes')
app.use('/api/users', authRoutes)
app.use('/api/patients', patientRoutes)
//app.use(checkAuth)

app.listen(3001, () => {
    console.log('Listening to port 3001...')
})
