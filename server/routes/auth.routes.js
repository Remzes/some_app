const NurseService = require('../services/nurse.service')
const PatientService = require('../services/patient.service')
const router = require('express').Router()

router.post('/nurse/login', async (req, res, next) => {
    const resp = await NurseService.login(req.body)
    res.json(resp.data)
})

router.post('/patient/login', async (req, res, next) => {
    const resp = await PatientService.login(req.body)
    res.json(resp.data)
})

router.post('/nurse/register', async (req, res, next) => {
    console.log('register')
    const resp = await NurseService.register(req.body)
    res.json(resp.data)
})

router.post('/nurse/logout', async (req, res, next) => {
    const resp = await NurseService.logout()
    res.json(resp.data)
})

router.post('/patient/logout', async (req, res, next) => {
    const resp = await PatientService.logout()
    res.json(resp.data)
})

module.exports = router;
