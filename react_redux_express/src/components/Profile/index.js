import React from 'react'
import { connect } from 'react-redux'

class Profile extends React.Component {
  render() {
    const { currentUser } = this.props
    console.log(currentUser)
    return (
      <div className="profile">
        { <h2>Welcome back, {currentUser.user.username}</h2> }
      </div>
    )
  }
}

export default connect(state => ({ currentUser: state.currentUser }))(Profile)