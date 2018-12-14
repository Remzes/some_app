module.exports = [
    {
        prefix: '/api/patients',
        pin: 'role:patients,cmd:*',
        map: {
            list: {
                GET: true
            },
            add: {
                POST: true
            },
            update: {
                POST: true
            }
        }
    },
]
