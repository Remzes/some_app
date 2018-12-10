module.exports.validateEmail = email => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.length > 0 && re.test(String(email).toLowerCase());
};

module.exports.validateUsername = username => {
  const re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return username.trim().length > 5;
};

module.exports.validatePassword = password => {
  const re = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
  return password.length > 10 && re.test(password.toLowerCase())
};

module.exports.validateName = name => {
  return name.length > 2
};
