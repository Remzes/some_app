const passport = require('passport');
const router = require('express').Router()
const Validator = require('../helpers/userValidation');

router.post('/login', (req, res, next) => {
  const validationResult = Validator.validateSigninForm(req.body)
  if (!validationResult.success) {
    return res.json({
      success: false,
      message: "Your form has errors",
      errors: validationResult.errors
    })
  }

  return passport.authenticate('local-signin', (err, token, user) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.json({
          success: false,
          message: err.message,
          errors: {}
        })
      }

      return res.json({
        success: false,
        message: err.message,
        errors: {}
      })
    }

    return res.status(200).json({
      success: true, token,
      message: 'You have successfully signed in',
      errors: {}
    })
  })(req, res, next)
});

router.post('/register', (req, res, next) => {
  const validationResult = Validator.validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.json({
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
        return res.json({success: false, message, errors: {}});
      }
      return res.json({
        success: false,
        message: err,
        errors: {}
      })
    }

    return res.status(200).json({
      success: true,
      message: 'You have successfully registered',
      errors: {}
    })
  })(req, res, next)
});

router.post(`/logout`, (req, res, next) => {
  req.logout();
  req.session.user = undefined
  res.status(200).json({
    success: true,
    message: "You successfully logged out!"
  })
})

module.exports = router;