module.exports = [
    {
        prefix: '/api/surveys',
        pin: 'role:surveys_api,cmd:*',
        map: {
            list: {
                GET: true,
            },
            add: {
                POST: true,
            }
        }
    }
]
