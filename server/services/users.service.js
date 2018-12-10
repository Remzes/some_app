const BaseService = require('./base.service')

const usersService = 'http://localhost:3002/api/users'

class UsersService extends BaseService {

    async login (user) { return await this.makeRequest(usersService, '/login', { method: 'POST', body: user }) }

    async register (user) { return await this.makeRequest(usersService, '/register', { method: 'POST', body: user }) }

    async logout () { return await this.makeRequest(usersService, '/logout', { method: 'POST' }) }

}

module.exports = new UsersService()
