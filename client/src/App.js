import React, { Component } from 'react';
import './css/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, Spin } from 'antd'
import { logoutUser, getMe } from './action'
import 'antd/dist/antd.css';

import { LoggedOutRoute } from "./decorators/LoggedOutRoute";
import { LoggedInRoute } from "./decorators/LoggedInRoute";
import { NurseRoute } from "./decorators/NurseRoute";
import { PatientRoute } from "./decorators/PatientRoute";

import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import Header from './components/Header'
import PatientList from './components/Patients/PatientList'
import AddPatient from './components/Patients/AddPatient'
import Profile from './components/Profile'

const Content = Layout.Content

class App extends Component {

  componentDidMount() {
    this.props.getMe()
  }

  render() {
    const {isAuthenticated, fetching, fetched, user } = this.props.currentUser
    if (fetching) return <Spin spinning={fetching} />
    return (
      <Router>
        <Spin spinning={fetching}>
          <Layout className="wrapper">
          <Header />
            <Content className="content" style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', justifyContent: 'center' }}>
              <Route exact path="/" component={Home} />
              <LoggedOutRoute path="/login" component={Login} isAuth={isAuthenticated} />
              <LoggedOutRoute path="/register" component={Register} isAuth={isAuthenticated} />
              {/*<LoggedInRoute path="/profile" component={Profile} isAuth={isAuthenticated} />*/}

              <Switch>
                  <NurseRoute path="/patients/list" component={PatientList} isAuth={isAuthenticated} isNurse={user && user.role === "nurse"} />
                  <NurseRoute path="/patients/add" component={AddPatient} isAuth={isAuthenticated} isNurse={user && user.role === "nurse"} />
                  {/*<NurseRoute path="/tips" component={AddTip} isAuth={isAuthenticated} isNurse={user.role === "nurse"} />*/}
              </Switch>
            </Content>
          </Layout>
        </Spin>
      </Router>
    );
  }
}

export default connect(state => ({ currentUser: state.currentUser }), { logoutUser, getMe })(App);
