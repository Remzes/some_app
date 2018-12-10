const router = require('express').Router();
const User = require('../../models/User')
const Survey = require('../../models/Survey')

router.get('/list', async (req, res) => {
    try {
        const list = await Survey.find({ _user: req.user.id })
        res.json({
            success: true,
            message: "Surveys!",
            surveys: list
        })
    } catch (e) {
        res.json({ success: false, message: "Internal Service Error" })
    }
})

router.post('/newSurvey', async (req, res) => {
    const { title, questions, numberOfQuestions } = req.body
    const refactoredQuestions = questions.map((q, i) => ({
        name: q.name,
        answers: q.answers.map((a, i) => ({ text: a }))
    }))
    const newSurvey = new Survey({
        title, questions: refactoredQuestions, numberOfQuestions, _user: req.user.id
    })
    try {
        await newSurvey.save()
        res.json({ success: true, message: "You successfully created a survey!" })
    } catch (e) {
        res.json({ success: false, message: e })
    }
})

module.exports = router;
