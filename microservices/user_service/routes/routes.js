module.exports = [
    {
        prefix: '/api/users',
        pin: 'role:auth,cmd:*',
        map: {
            login: {
                POST: true,
                middleware: (req, res, next) =>
                    req.user ? res.json({ success: false, message: "You are already logged in!" }) : next()
            },
            register: {
                POST: true,
                middleware: (req, res, next) =>
                    req.user ? res.json({ success: false, message: "You are already logged in!" }) : next()
            },
            logout: {
                POST: true,
                middleware: (req, res, next) =>
                    req.user ? next() : res.json({ success:false, message: 'You are not logged in!' })
            }
        }
    }
]
