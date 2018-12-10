const UsersService = require('../services/users.service')
const router = require('express').Router()

router.post('/login', async (req, res, next) => {
    console.log('login')
    const resp = await UsersService.login(req.body)
    res.json(resp.data)
})

router.post('/register', async (req, res, next) => {
    console.log('register')
    const resp = await UsersService.register(req.body)
    res.json(resp.data)
})

router.post('/logout', async (req, res, next) => {
    console.log('logout')
    const resp = await UsersService.logout()
    res.json(resp.data)
})

module.exports = router;
