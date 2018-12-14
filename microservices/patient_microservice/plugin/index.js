const ObjectId = require('mongoose').Types.ObjectId;
const bcrypt = require('bcryptjs')

module.exports = function plugin(options) {
    const seneca = this

    seneca.add({ role: 'patients', cmd: 'add' }, (msg, done, stash) => {
        const patient = seneca.make$('patients')
        const item = msg.args.body.patient
        patient.username = item.username
        patient.email = item.email
        patient.password = item.password
        patient.name = item.name
        patient._nurse = new ObjectId(item._user)
        patient.role = "patient"

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(patient.password, salt, (err, hash) => {
                patient.password = hash;
                patient.save$(() => {
                    if (err) done({ success: false, message: err })
                    done({ success: true, message: "You successfully created a new patient!" })
                });
            })
        })

        //
        // patient.save$((err, patient) => {
        //     if (err) done({ success: false, message: err })
        //     done({ success: true, message: "You successfully created a survey!" })
        // })
    })

    seneca.add({ role: 'patients', cmd: 'list'}, (msg, done, stash) => {
        const patient = seneca.make$('patients')
        const query = msg.request$.body.id ? { _user: ObjectId(msg.request$.body.id)} : {}
        patient.list$({}, (err, list) => {
            if (err) done({ success: false, message: err })
            done({ success: true, patients: list })
        })
    })
}
