const BaseService = require('./base.service')

const securityService = 'http://localhost:3003/api/surveys'

class SurveysService extends BaseService {
    async getAllSurveys (id) { return await this.makeRequest(securityService, '/list', { body: {id} } ) }

    async addSurvey (survey) { return await this.makeRequest(securityService, '/add', { method: 'POST', body: {survey} }) }
}

module.exports = new SurveysService()
