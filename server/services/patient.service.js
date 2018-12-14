const BaseService = require('./base.service')
const config = require('../config')

const patientService = config.urls.microservices.auth.patient.local
const patientAPI = config.urls.microservices.api.patient.local

class PatientService extends BaseService {

    async login (user) { return await this.makeRequest(patientService, '/login', { method: 'POST', body: user }) }

    async logout () { return await this.makeRequest(patientService, '/logout', { method: 'POST' }) }

    async list () { return await this.makeRequest(patientAPI, '/list') }

    async add (patient) { return await this.makeRequest(patientAPI, '/add', { method: 'POST', body: {patient} }) }

}

module.exports = new PatientService()
