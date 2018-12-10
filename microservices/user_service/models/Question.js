const mongoose = require('mongoose')
const Schema = require('mongoose').Schema;
const AnswerSchema = require('./Answer')

const QuestionSchema = new Schema({
    name: {
        required: true,
        type: String
    },
    answers: [AnswerSchema]
})

module.exports = QuestionSchema
