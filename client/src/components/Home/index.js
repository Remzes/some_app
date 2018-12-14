import React from 'react'
import { connect } from 'react-redux'
import NurseHome from './NurseHome'
import PatientHome from './PatientHome'
import './index.css'

class Home extends React.Component {

  RenderHome = () => {
      const { user } = this.props.me
      return (
          <React.Fragment>
              <h3>Welcome back, {user.name}</h3>
              {
                  user.role === "patient"
                      ? <PatientHome />
                      : <NurseHome />
              }
          </React.Fragment>
      )
  }

  render() {
    const me = this.props.me
    console.log(me)
    return (
        <div className="home-page">
            {
                !me.isAuthenticated
                ? <h3>Welcome! Please, login to proceed</h3>
                : this.RenderHome()
            }
        </div>
    )
  }
}

export default connect(state => ({ me: state.currentUser }))(Home)
