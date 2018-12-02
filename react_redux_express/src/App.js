import React, { Component } from 'react';
import logo from './logo.svg';
import './css/App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
} from 'react-router-dom'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { logoutUser, getMe } from './action'
import setAuthToken from './helpers/setAuthToken'
import jwt_decode from 'jwt-decode'
import 'antd/dist/antd.css';

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Header from './components/Header'
import Profile from './components/Profile'

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
          <Route exact path="/" component={Home} />
          <LoggedOutRoute path="/login" component={Login} isAuth={isAuthenticated} />
          <LoggedOutRoute path="/register" component={Register} isAuth={isAuthenticated} />
          <LoggedInRoute path="/profile" component={Profile} isAuth={isAuthenticated} />
        </Spin>
      </Router>
    );
  }
}

export default connect(state => ({ currentUser: state.currentUser }), { logoutUser, getMe })(App);
