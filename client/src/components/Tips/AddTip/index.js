import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Form, Field } from 'redux-form'
import {addTip} from '../../../action'
import customField from '../../../decorators/customField'
import Buttons from '../../FormButtons'
import {withRouter} from "react-router-dom";

class AddTip extends React.Component {

    render() {
        const { pristine, submitting, handleSubmit } = this.props
        return (
            <div className="register" style={{ width: '500px' }}>
                <Form onSubmit={handleSubmit(values => this.props.addTip(values, this.props.history))}>
                    <label>Username<Field name="username" id="username" type="text" component={customField} /></label>
                    <label style={{ display: 'block', marginTop: '15px' }}>Title<Field name="password" id="password" type="password" component={customField} /></label>
                    <label style={{ display: 'block', marginTop: '15px' }}>Description<Field name="description" id="description" component="textarea" /></label>
                    <label style={{ display: 'block', marginTop: '15px' }}>Video (Link)<Field name="name" id="name" type="text" component={customField} /></label>
                    <Buttons pristine={pristine} submitting={submitting} />
                </Form>
            </div>
        )
    }
}

export default withRouter(connect(null, { addTip })(
    reduxForm({
        form: 'registerForm'
    })(AddTip)
))
