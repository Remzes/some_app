const jwt = require('jsonwebtoken');
const User = require('../models/User')

/**
 *  The Auth Checker middleware function.
 */
module.exports = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).end();
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization;

    // decode the token using a secret key-phrase
    return jwt.verify(token, 'secret_key', (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) { return res.status(401).end(); }

        const userId = decoded.user._id;
        // check if a user exists
        return User.findById(userId, (userErr, user) => {
            if (userErr || !user) {
                console.log(userErr, 'or just no user')
                return res.status(401).end();
            }
            // pass user details onto next route
            req.user = user
            return next();
        });
    });
};
