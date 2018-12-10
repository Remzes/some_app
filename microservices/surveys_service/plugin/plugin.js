const ObjectId = require('mongoose').Types.ObjectId;

module.exports = function surveys_api(options) {
    const seneca = this

    seneca.add({ role: 'surveys_api', cmd: 'list' }, (msg, done, stash) => {
        const survey = seneca.make$('surveys')
        const query = msg.request$.body.id ? { _user: new ObjectId(msg.request$.body.id)} : {}
        survey.list$(query, (err, list) => {
            if (err) done({ success: false, message: err })
            done({ success: true, surveys: list })
        })
    })

    seneca.add({ role: 'surveys_api', cmd: 'add' }, (msg, done, stash) => {
        const survey = seneca.make$('surveys')
        const item = msg.args.body.survey
        survey.title = item.title
        let refactoredQuestions = []
        if (item.questions.length > 0) {
            refactoredQuestions = item.questions.map((q, i) => ({
                name: q.name,
                answers: q.answers.map((a, i) => ({ text: a }))
            }))
        }
        survey.questions = refactoredQuestions
        survey.numberOfQuestions = refactoredQuestions.length
        survey.save$((err, survey) => {
            if (err) done({ success: false, message: err })
            done({ success: true, message: "You successfully created a survey!" })
        })
    })
}
