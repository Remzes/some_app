const jwt = require('jsonwebtoken');
const User = require('../models/User')

/**
 *  The Auth Checker middleware function.
 */
module.exports = async (req, res, next) => {
    if (!req.headers.authorization) {
        await res.status(401).end();
    }

    // get the last part from a authorization header string like "bearer token-value"
    const token = req.headers.authorization;

    // decode the token using a secret key-phrase
    await jwt.verify(token, 'secret_key', async (err, decoded) => {
        // the 401 code is for unauthorized status
        if (err) { await res.status(401).end(); }
        const userId = decoded.user._id;
        // check if a user exists
        const user = await User.findById(userId)
        if (!user) await res.status(401).end();
        req.user = user
        await next();
    });
};
