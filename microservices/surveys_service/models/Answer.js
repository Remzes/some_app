const Schema = require('mongoose').Schema

const AnswerSchema = new Schema({
    text: {
        required: true,
        type: String
    }
})

module.exports = AnswerSchema
