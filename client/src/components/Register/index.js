import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Form, Field } from 'redux-form'
import {registerUser} from '../../action'
import customField from '../../decorators/customField'
import Buttons from '../FormButtons'
import {withRouter} from "react-router-dom";

class Register extends React.Component {

  render() {
    const { pristine, submitting, handleSubmit } = this.props
    return (
      <div className="register" style={{ width: '500px' }}>
        <Form onSubmit={handleSubmit(values => this.props.registerUser(values, this.props.history))}>
          <label>Username<Field name="username" id="username" type="text" component={customField} /></label>
          <label style={{ display: 'block', marginTop: '15px' }}>Password<Field name="password" id="password" type="password" component={customField} /></label>
          <label style={{ display: 'block', marginTop: '15px' }}>Email<Field name="email" id="email" type="email" component={customField} /></label>
          <label style={{ display: 'block', marginTop: '15px' }}>Full name<Field name="name" id="name" type="text" component={customField} /></label>
          <Buttons pristine={pristine} submitting={submitting} />
        </Form>
      </div>
    )
  }
}

export default withRouter(connect(null, { registerUser })(
    reduxForm({
        form: 'registerForm'
    })(Register)
))
