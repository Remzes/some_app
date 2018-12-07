import React from 'react'
import { Field } from 'redux-form'
import customField from '../../../../decorators/customField'

class StepOne extends React.Component {
    render() {
        return (
            <div>
                <Field placeholder="Enter a survey title"
                       type="name"
                       name="surveyTitle"
                       id="surveyTitle"
                       component={customField}
                />
            </div>
        )
    }
}

export default StepOne
