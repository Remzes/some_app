import React from 'react'
import customField from '../../decorators/customField'
import Buttons from '../FormButtons'
import { reduxForm, Form, Field } from 'redux-form'
import { connect } from 'react-redux'
import { loginUser } from '../../action'
import { withRouter, Redirect } from 'react-router-dom'

class Login extends React.Component {

  render() {
    const { handleSubmit, pristine, submitting } = this.props
    const { errorMessage, successMessage } = this.props.process
    return (
      <div className="login">
        <h2>{errorMessage}</h2>
        <h2>{successMessage}</h2>
        <Form onSubmit={handleSubmit(values => this.props.loginUser(values, this.props.history))}>
          <Field type="text" name="username" id="username" component={customField} />
          <Field type="password" name="password" id="password" component={customField} />
          <Buttons pristine={pristine} submitting={submitting} />
        </Form>
      </div>
    )
  }
}

export default withRouter(connect(state => ({ process: state.process, currentUser: state.currentUser }), { loginUser })(
  reduxForm({
    form: 'loginForm'
  })(Login)
))
