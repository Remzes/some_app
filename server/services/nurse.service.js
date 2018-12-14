const BaseService = require('./base.service')
const config = require('../config')

const nurseService = config.urls.microservices.auth.nurse.local

class NurseService extends BaseService {

    async login (user) { return await this.makeRequest(nurseService, '/login', { method: 'POST', body: user }) }

    async register (user) { return await this.makeRequest(nurseService, '/register', { method: 'POST', body: user }) }

    async logout () { return await this.makeRequest(nurseService, '/logout', { method: 'POST' }) }

}

module.exports = new NurseService()
