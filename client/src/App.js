import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { Spin, Row, Col } from 'antd'
import { logoutUser, getMe } from './action'
import 'antd/dist/antd.css';

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Header from './components/Header'
import Profile from './components/Profile'
import CreateSurvey from './components/Surveys/CreateSurvey'
import Surveys from './components/Surveys/Surveys'
import SurveyPreview from './components/Surveys/SurveyPreview'

const LoggedInRoute = ({ component: Component, isAuth: isAuth, ...rest }) => {
  return <Route {...rest} render={props => (
    isAuth
      ? <Component {...props} />
      : <Redirect to={{pathname: '/login'}}/>
  )}/>
};

const LoggedOutRoute = ({ component: Component, isAuth: isAuth, ...rest }) => (
  <Route {...rest} render={props => (
    isAuth
      ? <Redirect to={{ pathname: '/' }} />
      : <Component  {...props} />
  )} />
);

class App extends Component {

  componentDidMount() {
    this.props.getMe()
  }

  render() {
    const {isAuthenticated, fetching, fetched } = this.props.currentUser
    if (fetching) return <Spin spinning={fetching} />
    return (
      <Router>
        <Spin spinning={fetching}>
          <Header />
          <Row>
            <Col span={12} offset={6}>
              <Route exact path="/" component={Home} />
              <LoggedOutRoute path="/login" component={Login} isAuth={isAuthenticated} />
              <LoggedOutRoute path="/register" component={Register} isAuth={isAuthenticated} />
              <LoggedInRoute path="/profile" component={Profile} isAuth={isAuthenticated} />
              <Switch>
                <LoggedInRoute exact path="/surveys" component={Surveys} isAuth={isAuthenticated}/>
                <LoggedInRoute path="/surveys/:surveyId" component={SurveyPreview} isAuth={isAuthenticated} />
              </Switch>
              <LoggedInRoute exact path="/createSurvey" component={CreateSurvey} isAuth={isAuthenticated} />
            </Col>
          </Row>
        </Spin>
      </Router>
    );
  }
}

export default connect(state => ({ currentUser: state.currentUser }), { logoutUser, getMe })(App);
