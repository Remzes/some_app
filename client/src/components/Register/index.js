import React from 'react'
import { connect } from 'react-redux'
import { reduxForm, Form, Field } from 'redux-form'
import { registerUser } from '../../action'
import customField from '../../decorators/customField'
import Buttons from '../FormButtons'

class Register extends React.Component {

  render() {
    const { errorMessage, successMessage, fetching } = this.props.process
    const { pristine, submitting, handleSubmit } = this.props
    return (
      <div className="login">
        <h2>{errorMessage}</h2>
        <h2>{successMessage}</h2>
        <Form onSubmit={handleSubmit(values => this.props.registerUser(values))}>
          <Field name="username" id="username" type="text" component={customField} />
          <Field name="password" id="password" type="password" component={customField} />
          <Field name="email" id="email" type="email" component={customField} />
          <Field name="name" id="name" type="text" component={customField} />
          <Buttons pristine={pristine} submitting={submitting} />
        </Form>
      </div>
    )
  }
}

export default connect(state => ({
  process: state.process
}), { registerUser })(
  reduxForm({
    form: 'registration'
  })(Register)
);
