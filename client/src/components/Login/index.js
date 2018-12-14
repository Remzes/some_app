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
    return (
      <div className="login" style={{ width: '500px' }}>
        <Form onSubmit={handleSubmit(values => this.props.loginUser(values, this.props.history))}>
            <label>Username<Field type="text" name="username" id="username" component={customField} /></label>
            <label>Password<Field type="password" name="password" id="password" component={customField} /></label>
          <div style={{ marginTop: '10px' }}>
              <label>Choose, who you are</label>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  <label><Field validate={['required']} name="type" component={customField} type="radio" value="patient"/> Patient</label>
                  <label><Field name="type" component={customField} type="radio" value="nurse"/> Nurse</label>
              </div>
          </div>
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
