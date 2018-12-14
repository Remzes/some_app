module.exports = {
    mongoURLDocker: "mongodb://mongo/testapp",
    mongoURLLocal: "mongodb://localhost:27017/testapp",
    urls: {
        microservices: {
            auth: {
                nurse: {
                    local: 'http://localhost:3002/api/users/nurse',
                    container: 'http://users_microservice:3002/api/users/nurse'
                },
                patient: {
                    local: 'http://localhost:3002/api/users/patient',
                    container: 'http://users_microservice:3002/api/users/patient'
                }
            },
            api: {
                patient: {
                    local: 'http://localhost:3003/api/patients',
                    container: 'http://patient_microservice:3003/api/patients'
                }
            }
        }
    }
}
