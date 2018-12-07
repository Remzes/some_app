import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { List, Button } from 'antd'
import customField from '../../../../decorators/customField'
import './questions.css'


const Questions = ({ fields, meta: { touched, error }, ...rest }) => {
    return (
        <React.Fragment>
        <button className="Survey-button" type="button" onClick={() => fields.push({})}>Add Question</button>
        {touched && error && <span>{error}</span>}
        <ul className="Survey-questions">
            {fields && fields.map((question, index) =>
                <li className="Survey-question" key={index}>
                    <div className="Survey-question-title">
                        <h4>Question #{index + 1}</h4>
                        <Button
                            type="button"
                            onClick={() => fields.remove(index)}>
                            Remove Question
                        </Button>
                    </div>
                    <div className="Survey-question-field">
                        <Field
                            name={`${question}.name`}
                            type="text"
                            component={customField}
                            label={`Question${index + 1}`}/>
                    </div>
                    <FieldArray name={`${question}.answers`} component={Answers}/>
                </li>
            )}
        </ul>
        </React.Fragment>
    )
}

const Answers = ({ fields, meta: {touched, error}, ...rest }) => {
    return (
        <React.Fragment>
            <Button type="button" className="Survey-answer-button" onClick={() => fields.push()}>Add Answer</Button>
            <ul style={{ listStyleType: 'none' }}>
            {fields.map((answer, index) =>
                <li key={index} className="Survey-answer-field">
                    <Field
                        name={answer}
                        type="text"
                        component={customField}
                        label={`Answer #${index + 1}`}/>
                    <Button
                        type="button"
                        onClick={() => fields.remove(index)}>
                        Remove Answer
                    </Button>
                </li>
            )}
            </ul>
            {error && <li className="error">{error}</li>}
        </React.Fragment>
    )
}

export default Questions
