const ObjectId = require('mongoose').Types.ObjectId;
const SurveysService = require('../services/surveys.service')
const checkAuth = require('../middleware/checkAuth')
const router = require('express').Router()

router.get('/list/my', checkAuth, async (req, res, next) => {
    const list = await SurveysService.getAllSurveys(req.user.id)
    res.json(list.data)
})

router.get('/list', checkAuth, async (req, res, next) => {
    const list = await SurveysService.getAllSurveys()
    res.json(list.data)
})

router.post('/add', checkAuth, async (req, res, next) => {
    const survey = req.body
    survey._user = new ObjectId(req.user.id)
    const resp = await SurveysService.addSurvey(survey)
    res.json(resp.data)
})

module.exports = router
