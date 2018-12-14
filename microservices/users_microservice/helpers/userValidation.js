const Helper = require('./index')

module.exports.validateSignupForm = payload => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if(!payload && payload.name && !Helper.validateName(payload.name)) {
    isFormValid = false;
    errors.name = "Name is invalid"
  }

  if (!payload && payload.email && !Helper.validateEmail(payload.email)) {
    isFormValid = false;
    errors.email = 'Email is invalid';
  }

  if (!payload && payload.username && !Helper.validateUsername(payload.username)) {
    isFormValid = false;
    errors.password = 'Username is invalid';
  }

  if (!payload && payload.password && !Helper.validatePassword(payload.password)) {
    isFormValid = false;
    errors.password = 'Password is invalid';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};

module.exports.validateSigninForm = payload => {
  const errors = {};
  let isFormValid = true;
  let message = '';

  if (!payload || !Helper.validateUsername(payload.username)) {
    isFormValid = false;
    errors.username = 'Username is invalid';
  }

  if (!payload || !payload.password.length > 0) {
    isFormValid = false;
    errors.password = 'Password is invalid';
  }

  if (!isFormValid) {
    message = 'Check the form for errors.';
  }

  return {
    success: isFormValid,
    message,
    errors
  };
};
