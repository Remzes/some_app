const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const passport = require('passport');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    username: {
        required: true,
        index: { unique: true },
        type: String,
        dropDups: true
    },
    email: {
        require: true,
        index: { unique: true },
        type: String,
        dropDups: true
    },
    password: {
        required: true,
        type: String
    },
    name: {
        require: true,
        type: String
    },
    bodyTemperature: {
        type: String
    },
    heartRate: {
        type: String
    },
    bloodPressure: {
        type: String
    },
    respiratoryRate: {
        type: String
    },
    role: {
        required: true,
        type: String
    },
    _user: {
        type: Schema.Types.ObjectId, ref: 'Nurse'
    }
}, {versionKey: false});

module.exports = mongoose.model('Patient', PatientSchema);

module.exports.createUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            newUser.password = hash;
            newUser.save(callback);
        })
    })
};

module.exports.comparePasswords = (userPassword, hash, callback) => {
    bcrypt.compare(userPassword, hash, (err, isMatched) => {
        if(err) throw err;
        callback(null, isMatched);
    })
};
