const validate = values => {
    const errors = {}
    if (!values.surveyTitle) {
        errors.surveyTitle = 'Required'
    }
    if (!values.questions || !values.questions.length) {
        errors.questions = { _error: 'At least one question must be entered' }
    } else {
        const questionsArrayErrors = []
        values.questions.forEach((q, qIndex) => {
            const questionsErrors = {}
            if (!q || !q.name) {
                questionsErrors.name = 'Required'
                questionsArrayErrors[qIndex] = questionsErrors
            }
            if (q && q.answers && q.answers.length) {
                const answersArrayErrors = []
                q.answers.forEach((a, aIndex) => {
                    if (!a || !a.length) {
                        answersArrayErrors[aIndex] = 'Required'
                    }
                })
                if (answersArrayErrors.length) {
                    questionsErrors.answers = answersArrayErrors
                    questionsArrayErrors[qIndex] = questionsErrors
                }
            }
        })
        if (questionsArrayErrors.length) {
            errors.questions = questionsArrayErrors
        }
    }
    console.log(errors)
    return errors
}

export default validate
