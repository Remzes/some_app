const ObjectId = require('mongoose').Types.ObjectId;
const PatientService = require('../services/patient.service')
const checkAuthNurse = require('../middleware/checkAuthNurse')
const router = require('express').Router();

router.get('/list', checkAuthNurse, async (req, res, next) => {
    const resp = await PatientService.list()
    res.json(resp.data)
})

router.post('/add', checkAuthNurse, async (req, res, next) => {
    const patient = req.body
    patient._nurse = new ObjectId(req.user.id)
    const resp = await PatientService.add(patient)
    res.json(resp.data)
})

module.exports = router;
