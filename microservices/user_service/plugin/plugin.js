const Validator = require('../../helpers/userValidation')
const passport = require('passport')

module.exports = function plugin (options) {
    const seneca = this

    seneca.add({ role: 'auth', cmd: 'login' }, (msg, done, stash) => {
        const req = msg.request$
        if (typeof stash === 'string') return done({ success: false, message: stash })
        const validationResult = Validator.validateSigninForm(req.body)
        if (!validationResult.success) {
            return done({
                success: false,
                message: "Your form has errors",
                errors: validationResult.errors
            })
        }

        return passport.authenticate('local-signin', (err, token, user) => {
            if (err) {
                if (err.name === 'IncorrectCredentialsError') {
                    return done({
                        success: false,
                        message: err.message,
                        errors: {}
                    })
                }

                return done({
                    success: false,
                    message: err.message,
                    errors: {}
                })
            }

            return req.login(user, (err) => {
                return done({
                    success: true, token,
                    message: 'You have successfully signed in',
                    errors: {}
                })
            })
        })(req, done)
    })

    seneca.add({ role: 'auth', cmd: 'register' }, (msg, done, stash) => {
        const req = msg.request$
        if (typeof stash === 'string') return done({ success: false, message: stash })
        const validationResult = Validator.validateSignupForm(req.body)
        console.log(validationResult, req.body)
        if (!validationResult.success) {
            return done({
                success: false,
                message: "Your form has errors",
                errors: validationResult.errors
            })
        }

        return passport.authenticate('local-signup', (err, user) => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    let message;
                    if (err.errmsg.indexOf('email') > -1) message = "This email is already exists";
                    if (err.errmsg.indexOf('username') > -1) message = "This username is already exists";
                    return done({success: false, message, errors: {}});
                }
                return done({
                    success: false,
                    message: err,
                    errors: {}
                })
            }

            return done({
                success: true,
                message: 'You have successfully registered',
                errors: {}
            })
        })(req, done)
    })

    seneca.add({ role: 'auth', cmd: 'logout' }, (msg, done, stash) => {
        const req = msg.request$
        if (typeof stash === 'string') done({ success: false, message: stash })
        req.logout();
        return done({
            success: true,
            message: "You successfully logged out!"
        })
    })
}
