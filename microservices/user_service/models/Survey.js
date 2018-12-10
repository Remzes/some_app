const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const QuestionSchema = require('./Question')

const SurveySchema = new Schema({
    title: {
        require: true,
        type: String
    },
    numberOfQuestions: {
        require: true,
        type: Number
    },
    questions: [QuestionSchema],
    _user: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, { versionKey: false })

module.exports = mongoose.model("Survey", SurveySchema)

// module.exports.createSurvey = (newSurvey, callback) => {
//     newSurvey.save(callback)
// }
