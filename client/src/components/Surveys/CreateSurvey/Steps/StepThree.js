import React from 'react'
import {Field} from "redux-form"
import customField from "../../../../decorators/customField"

class StepThree extends React.Component {
    render() {
        return (
            <div>
                <Field placeholder="Enter a survey questions number"
                       type="number"
                       name="surveyQuestionsNumber"
                       id="surveyQuestionsNumber"
                       component={customField}
                />
            </div>
        )
    }
}

export default StepThree
